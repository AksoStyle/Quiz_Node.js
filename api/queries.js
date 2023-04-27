// Minden Admin lekérdezése
const getAdminData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM ADMIN", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// Minden játékos lekérdezése, létrehozása, frissítése

// --- LEKÉRDEZÉS ----
const getJatekosData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM JATEKOS", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// ---- LÉTREHOZÁS ----
const insertJatekosData = (
  connection,
  nev,
  felhasznalonev,
  email,
  jelszo,
  szuletesiDatum
) => {
  return new Promise((resolve, reject) => {
    const jatekosId = Math.floor(Math.random() * 50) + 1;
    const sql =
      "INSERT INTO JATEKOS(JATEKOS_ID, NEV, FELHASZNALONEV, EMAIL, JELSZO, SZULETESI_DATUM) VALUES (:jatekosId, :nev, :felhasznalonev, :email, :jelszo, :szuletesiDatum)";
    const binds = {
      jatekosId: jatekosId,
      nev: nev,
      felhasznalonev: felhasznalonev,
      email: email,
      jelszo: jelszo,
      szuletesiDatum: szuletesiDatum,
    };
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán.");
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán.");
          reject(err);
        }
        resolve(result);
      });
    });
  });
};

// Minden verseny lekérdezése, frissítése, törlése

// --- LEKÉRDEZÉS
const getVersenyData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM VERSENY", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// --- LÉTREHOZÁS

const insertNewVerseny = (
  connection,
  jatekosId,
  nev,
  leiras,
  nyitasDatuma,
  engedelyezve,
  allapot
) => {
  return new Promise((resolve, reject) => {
    const versenyID = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO VERSENY (VERSENY_ID, JATEKOS_ID, NEV, LEIRAS, NYITASDATUMA, ENGEDELYEZVE, ALLAPOT) VALUES (:versenyID, :jatekos_id, :nev, :leiras, :NYITASDATUMA, :engedelyezve, :allapot)";
  
    const binds = {
      versenyID: versenyID,
      jatekos_id: jatekosId,
      nev: nev,
      leiras: leiras,
      nyitasdatuma: nyitasDatuma,
      engedelyezve: engedelyezve,
      allapot: allapot,
    };
    console.log(binds);
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán.");
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán.");
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

// --- TÖRLÉS
const deleteVersenyData = (connection, versenyId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM VERSENY WHERE VERSENY_ID = :verseny_id";
    const binds = { verseny_id: versenyId };
    connection.execute(
      sql,
      binds,
      {
        autoCommit: true,
      },
      (err, result) => {
        if (err) {
          console.log("Hiba történt a törlés folyamán.");
          reject(err);
        } else {
          connection.commit((err) => {
            if (err) {
              console.log("Hiba történt a commit folyamán.");
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      }
    );
  });
};

// Minden Fórum lekérdezése
const getForumData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM FORUM", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// Minden hozzászólás lekérdezése
const getHozzaszolasData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM HOZZASZOLAS", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// Minden témakör lekérdezése
const getTemakorData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM TEMAKOR", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// Minden játék szoba lekérdezése
const getJatekszobaData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM JATEKSZOBA", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// Minden Kérdés lekérdezése
const getKerdesData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM KERDES", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

// Minden válasz lekérdezése
const getValaszData = (connection) => {
  return new Promise((resolve, reject) => {
    connection.execute("SELECT * FROM VALASZ", (err, result) => {
      if (err) {
        console.log("Hiba történt a lekérdezés folyamán.");
        reject(err);
      }
      const rows = result.rows;
      const jsonData = JSON.stringify(rows);
      resolve(jsonData);
    });
  });
};

module.exports = {
  getAdminData,
  //Jatekos
  getJatekosData,
  insertJatekosData,
  //verseny
  getVersenyData,
  insertNewVerseny,
  deleteVersenyData,
  //Forum stb
  getForumData,
  getHozzaszolasData,
  getTemakorData,
  getJatekszobaData,
  getKerdesData,
  getValaszData,
};
