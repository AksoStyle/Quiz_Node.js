const oracledb = require("oracledb");
const databaseConn = require("./db/database.js");
const queries = require("./queries.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false},
  })
);

async function get_data() {
  let connection = await databaseConn.connection_start();

  const admin_data = await queries.getAdminData(connection);
  const jatekos_data = await queries.getJatekosData(connection);
  const verseny_data = await queries.getVersenyData(connection);

  const forum_data = await queries.getForumData(connection);
  const hozzaszolas_data = await queries.getHozzaszolasData(connection);
  const temakor_data = await queries.getTemakorData(connection);
  const jatekosszoba_data = await queries.getJatekszobaData(connection);
  const kerdes_data = await queries.getKerdesData(connection);
  const valasz_data = await queries.getValaszData(connection);

  const temakor_nevek = await queries.getTemakorNevek(connection);
  return {
    admin_data,
    jatekos_data,
    verseny_data,

    forum_data,
    hozzaszolas_data,
    temakor_data,
    jatekosszoba_data,
    kerdes_data,
    valasz_data,
    //temakornevek
    temakor_nevek,
  };
}

// --------------- LOGIN ----------------------------------------------------------------
app.post("/login", async (req, res) => {
  const { felhasznalonev, jelszo } = req.body;
  console.log("index.js /login req.body: ", req.body);
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.getLoggedIn(connection, felhasznalonev, jelszo);
    if (result.rows.length > 0) {
      // Save the user's ID, name, and game ID in the session
      console.log("session result: " , result.rows)
      req.session.jatekos_id = result.rows[0][0];
      req.session.nev = result.rows[0][1];
      req.session.felhasznalonev = result.rows[0][2];
      req.session.email = result.rows[0][3];
      req.session.pontszam = result.rows[0][6];
      

      const token = Math.random().toString(36).slice(2);
      req.session.token = token;
      res.json({ success: true, token: token, jatekos_id: req.session.jatekos_id, nev: req.session.nev,  felhasznalonev: req.session.felhasznalonev, email: req.session.email , pontszam: req.session.pontszam});
    } else {
      res.json({ success: false });
    }
    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ----------- AUTHENTIACTION --------------------------------
const requireAuth = (req, res, next) => {
  const userId = req.session.userId;
  const token = req.session.token;

  // If the user is authenticated and the token matches, continue with the next middleware
  if (userId && token && token === req.headers.authorization) {
    // If the user is authenticated, store the user's ID and game ID in the request object
    req.userId = userId;
    req.gameId = req.session.gameId;
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};


app.get("/protected", requireAuth, (req, res) => {
  res.send("This is a protected route!");
});

// ---- INSERT START ----

// ---- JATEKOS INSERT START ----

app.post("/register", async (req, res) => {
  const { nev, felhasznalonev, email, jelszo, szuletesiDatum, pontszam } =
    req.body;
  let connection;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertJatekosData(
      connection,
      nev,
      felhasznalonev,
      email,
      jelszo,
      szuletesiDatum,
      pontszam
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt a regisztráció során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- JATEKOS INSERT END ----

// ---- VERSENY INSERT START ----

app.post("/verseny", async (req, res) => {
  const { jatekosId, nev, leiras, nyitasiDatum, engedelyezve, allapot } =
    req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewVerseny(
      connection,
      jatekosId,
      nev,
      leiras,
      nyitasiDatum,
      engedelyezve,
      allapot
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- VERSENY INSERT END ----

// ---- FORUM INSERT START ----

app.post("/forum", async (req, res) => {
  const { nev } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewForum(connection, nev);
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- FORUM INSERT END ----

// ---- HOZZASZOLAS INSERT START ----

app.post("/hozzaszolas", async (req, res) => {
  const { jatekos_id, forum_id, szoveg, datum } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewHozzaszolas(
      connection,
      jatekos_id,
      forum_id,
      szoveg,
      datum
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- HOZZASZOLAS INSERT END ----

// ---- TEMAKOR INSERT START ----

app.post("/temakor", async (req, res) => {
  const { forum_id, nev } = req.body;
  console.log("index.js -> ", req.body);
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewTemakor(connection, forum_id, nev);
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- TEMAKOR INSERT END ----

// ---- JATEKSZOBA INSERT START ----

app.post("/jatekszoba", async (req, res) => {
  const { jatekos_id, temakor_id, nehezsegi_szint, idopont } = req.body;
  console.log("index.js -> jatekszoba insert", req.body);
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewJatekszoba(
      connection,
      jatekos_id,
      temakor_id,
      nehezsegi_szint,
      idopont
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- JATEKSZOBA INSERT END ----

// ---- KERDES INSERT START ----

app.post("/kerdes", async (req, res) => {
  const { temakor_id, szoveg, nehezsegi_szint } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewKerdes(
      connection,
      temakor_id,
      szoveg,
      nehezsegi_szint
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- KERDES INSERT END ----

// ---- VALASZ INSERT START ----

app.post("/valasz", async (req, res) => {
  const { kerdes_id, szoveg, helyesseg } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertNewValasz(
      connection,
      kerdes_id,
      szoveg,
      helyesseg
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt az adatok beszúrása során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- VALASZ INSERT END ----

// ---- DELETE DATAS START ----
// VERSENY
app.delete("/verseny/:id", async (req, res) => {
  const versenyId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteVersenyData(connection, versenyId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//FORUM

app.delete("/forum/:id", async (req, res) => {
  const forumId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteForumData(connection, forumId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// HOZZASZOLAS
app.delete("/hozzaszolas/:id", async (req, res) => {
  const hozzaszolasId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteHozzaszolasData(
      connection,
      hozzaszolasId
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// TEMAKOR
app.delete("/temakor/:id", async (req, res) => {
  const temakorId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteTemakorData(connection, temakorId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// JATEKSZOBA

app.delete("/jatekszoba/:id", async (req, res) => {
  const jatekosszobaId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteJatekszobaData(
      connection,
      jatekosszobaId
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// KERDES

app.delete("/kerdes/:id", async (req, res) => {
  const kerdesId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteKerdesData(connection, kerdesId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// VALASZ

app.delete("/valasz/:id", async (req, res) => {
  const valaszId = req.params.id;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteValaszData(connection, valaszId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- DELETE END ----

// ---- UPDATE START ----

//ADMIN
app.put("/admin/:admin_id", async (req, res) => {
  const adminId = req.params.admin_id;
  console.log("index.js adminId: ", adminId);
  const { felhasznalonev, email, jelszo } = req.body;
  console.log("index.js req.body: ", req.body);
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateAdmin(
      connection,
      adminId,
      felhasznalonev,
      email,
      jelszo
    );
    res.json(result);
    console.log(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//JATEKOS
app.put("/jatekos/:jatekos_id", async (req, res) => {
  const jatekos_id = parseInt(req.params.jatekos_id);

  const { nev, felhasznalonev, email, jelszo, szuletesi_datum } = req.body;

  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateJatekos(
      connection,
      jatekos_id,
      nev,
      felhasznalonev,
      email,
      jelszo,
      szuletesi_datum
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

app.put("/jatekos/:jatekos_id/pontszam", async (req, res) => {
  const jatekos_id = parseInt(req.params.jatekos_id);

  const { pontszam } = req.body;

  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateJatekosPontszam(
      connection,
      jatekos_id,
      pontszam
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//VERSENY
app.put("/verseny/:id", async (req, res) => {
  const versenyId = req.params.id;
  const { jatekos_id, nev, leiras, nyitasDatuma, engedelyezve, allapot } =
    req.body;
  console.log("index.js, req.body: ", req.body);
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateVerseny(
      connection,
      versenyId,
      jatekos_id,
      nev,
      leiras,
      nyitasDatuma,
      engedelyezve,
      allapot
    );

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//FORUM
app.put("/forum/:id", async (req, res) => {
  const forumId = req.params.id;
  const { nev } = req.body;
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.updateForum(connection, forumId, nev);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//HOZZASZOLAS
app.put("/hozzaszolas/:id", async (req, res) => {
  const hozzaszolas_id = req.params.id;
  const { jatekos_id, forum_id, szoveg, datum } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateHozzaszolas(
      connection,
      hozzaszolas_id,
      jatekos_id,
      forum_id,
      szoveg,
      datum
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//TEMAKOR
app.put("/temakor/:id", async (req, res) => {
  const temakor_id = req.params.id;
  const { forum_id, nev } = req.body;
  console.log("index.js req.body =>", req.body);
  console.log("temakor id:", temakor_id);
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateTemakor(
      connection,
      temakor_id,
      forum_id,
      nev
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//JATEKSZOBA
app.put("/jatekszoba/:id", async (req, res) => {
  const jatekosszoba_id = req.params.id;
  const { jatekos_id, temakor_id, nehezsegi_szint, idopont } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateJatekszoba(
      connection,
      jatekosszoba_id,
      jatekos_id,
      temakor_id,
      nehezsegi_szint,
      idopont
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

//KERDES
app.put("/kerdes/:id", async (req, res) => {
  const kerdesId = req.params.id;
  const { szoveg, nehezsegi_szint } = req.body;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateKerdes(
      connection,
      kerdesId,
      szoveg,
      nehezsegi_szint
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// VALASZ
app.put("/valasz/:id", async (req, res) => {
  const valasz_id = req.params.id;
  const { kerdes_id, szoveg, helyesseg } = req.body;

  try {
    connection = await databaseConn.connection_start();
    const result = await queries.updateValasz(
      connection,
      valasz_id,
      kerdes_id,
      szoveg,
      helyesseg
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Hiba történt az update során. Hiba: ", err });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- UPDATE END ----

app.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = await get_data();
  res.json(data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen.`);
});

module.exports = {
  get_data,
};
