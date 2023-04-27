const oracledb = require("oracledb");
const databaseConn = require("./db/database.js");
const queries = require("./queries.js");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:4200",
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
  };
}

// ---- VERSENY INSERT START ----

app.post("/verseny", async (req, res) => {
  const { jatekosId, nev, leiras, nyitasiDatum, engedelyezve, allapot } = req.body;
  try {
    console.log('index.js; req.body: ',req.body);
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
    res.status(500).json({ error: "Hiba történt az adatok beszúrása során" });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- VERSENY INSERT END ----

// ---- VERSENY DELETE START ----
async function deleteVerseny(versenyId) {
  try {
    const connection = await databaseConn.connection_start();
    const result = await queries.deleteVersenyData(connection, versenyId);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Hiba történt a törlés során");
  }
}

app.delete("/verseny/:id", async (req, res) => {
  const versenyId = req.params.id;
  try {
    const result = await deleteVerseny(versenyId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Hiba történt a törlés során" });
  }
});

// ---- DELETE VERSENY END ----

// ---- JATEKOS INSERT START ----

app.post("/register", async (req, res) => {
  const { nev, felhasznalonev, email, jelszo, szuletesiDatum } = req.body;
  let connection;
  try {
    connection = await databaseConn.connection_start();
    const result = await queries.insertJatekosData(
      connection,
      nev,
      felhasznalonev,
      email,
      jelszo,
      szuletesiDatum
    );
    res.json({ success: true, result: result.rowsAffected });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a regisztráció során." });
  } finally {
    if (connection) {
      await databaseConn.connection_close(connection);
    }
  }
});

// ---- JATEKOS INSERT END ----

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
