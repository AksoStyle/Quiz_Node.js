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

// Minden Fórum lekérdezése, törlése, insertálása
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

// ---- INSERT
const insertNewForum = (
  connection,
  nev,
) => {
  return new Promise((resolve, reject) => {
    const forumID = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO FORUM (FORUM_ID, NEV) VALUES (:forum_id, :nev)";
    const binds = {
      forum_id: forumID,
      nev: nev,
    };
    connection.execute(sql, binds, (err, result) => {
      if(err){
        console.log('hiba történt a beszúrás folyamán. \n Hiba: ', err);
        reject(err);
      }
      connection.commit((err) => {
        if(err){
          console.log("Hbia történt a commit folyamán. Hiba: ", err);
          reject(err);
        } else{
          resolve(result);
        }
        
      });
    });
  });
};

// ---- TÖRLÉS

const deleteForumData = (connection, forumId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM FORUM WHERE FORUM_ID = :forum_id";
    const binds = { forum_id: forumId};
    connection.execute(sql, binds, { autoCommit: true,}, (err, result) => {
      if(err){
        console.log("Hiba történt a törlés folyamán. Hiba: ", err);
        reject(err);
      } else{
        connection.commit((err) => {
          if(err){
            console.log("Hiba történt a commit folyamán. Hiba: ", err);
            reject(err);
          } else{
            resolve(result);
          }
        });
      }
    });
  });
};



// Minden hozzászólás lekérdezése, törlése, insertálása

// ---- LEKÉRDEZÉS
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

// ---- INSERT

const insertNewHozzaszolas = (
  connection,
  jatekos_id,
  forum_id,
  szoveg,
  datum,
) => {
  return new Promise((resolve, reject) => {
    const hozzaszolasId = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO HOZZASZOLAS (HOZZASZOLAS_ID, JATEKOS_ID, FORUM_ID, SZOVEG, DATUM) VALUES (:hozzaszolas_id, :jatekos_id, :forum_id, :szoveg, :datum)";
  
    const binds = {
      hozzaszolas_id: hozzaszolasId,
      jatekos_id: jatekos_id,
      forum_id: forum_id,
      szoveg: szoveg,
      datum: datum,
      
    };
    
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán. Hiba: ", err);
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán. Hiba: ", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

// ---- TÖRLÉS
const deleteHozzaszolasData = (connection, hozzaszolasId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM HOZZASZOLAS WHERE HOZZASZOLAS_ID = :hozzaszolas_id";
    const binds = { hozzaszolas_id: hozzaszolasId };
    connection.execute(
      sql,
      binds,
      {
        autoCommit: true,
      },
      (err, result) => {
        if (err) {
          console.log("Hiba történt a törlés folyamán. Hiba: ", err);
          reject(err);
        } else {
          connection.commit((err) => {
            if (err) {
              console.log("Hiba történt a commit folyamán. Hiba: ", err);
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

// Minden témakör lekérdezése, törlése, insertálása

// ---- LEKÉRDEZÉS
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

// ---- INSERT

const insertNewTemakor = (
  connection,
  forum_id,
  nev,
) => {
  return new Promise((resolve, reject) => {
    const temakorId = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO TEMAKOR (TEMAKOR_ID, FORUM_ID, NEV) VALUES (:temakor_id, :forum_id, :nev)";
  
    const binds = {
      temakor_id: temakorId,
      forum_id: forum_id,
      nev: nev,
    };
    
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán. Hiba: ", err);
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán. Hiba: ", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

// ---- TÖRLÉS

const deleteTemakorData = (connection, temakor_id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM TEMAKOR WHERE TEMAKOR_ID = :temakor_id";
    const binds = { temakor_id: temakor_id};
    connection.execute(sql, binds, { autoCommit: true,}, (err, result) => {
      if(err){
        console.log("Hiba történt a törlés folyamán. Hiba: ", err);
        reject(err);
      } else{
        connection.commit((err) => {
          if(err){
            console.log("Hiba történt a commit folyamán. Hiba: ", err);
            reject(err);
          } else{
            resolve(result);
          }
        });
      }
    });
  });
};



// Minden játék szoba lekérdezése, törlése, insertálása
// ---- LEKÉRDEZÉS
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

// ---- INSERT

const insertNewJatekszoba = (
  connection,
  jatekos_id,
  temakor_id,
  nehezsegi_szint,
  idopont,
) => {
  return new Promise((resolve, reject) => {
    const jatekosszobaId = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO JATEKSZOBA (JATEKOSSZOBA_ID, JATEKOS_ID, TEMAKOR_ID, NEHEZSEGI_SZINT, IDOPONT) VALUES (:jatekosszoba_id, :jatekos_id, :temakor_id, :nehezsegi_szint, :idopont)";
  
    const binds = {
      jatekosszoba_id: jatekosszobaId,
      jatekos_id: jatekos_id,
      temakor_id: temakor_id,
      nehezsegi_szint: nehezsegi_szint,
      idopont: idopont,
    };
    
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán. Hiba: ", err);
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán. Hiba: ", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};
// ---- TÖRLÉS

const deleteJatekszobaData = (connection, jatekszobaId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM JATEKSZOBA WHERE JATEKOSSZOBA_ID = :jatekosszoba_id";
    const binds = { jatekosszoba_id: jatekszobaId };
    connection.execute(
      sql,
      binds,
      {
        autoCommit: true,
      },
      (err, result) => {
        if (err) {
          console.log("Hiba történt a törlés folyamán. Hiba: ", err);
          reject(err);
        } else {
          connection.commit((err) => {
            if (err) {
              console.log("Hiba történt a commit folyamán. Hiba: ", err);
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

// Minden Kérdés lekérdezése, törlése, insertálása
// ---- LEKÉRDEZÉS
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

// ---- INSERT
const insertNewKerdes = (
  connection,
  temakor_id,
  szoveg,
  nehezsegi_szint,
) => {
  return new Promise((resolve, reject) => {
    const kerdesId = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO KERDES (KERDES_ID, TEMAKOR_ID, SZOVEG, NEHEZSEGI_SZINT) VALUES (:kerdes_id, :temakor_id, :szoveg, :nehezsegi_szint)";
  
    const binds = {
      kerdes_id: kerdesId,
      temakor_id: temakor_id,
      szoveg: szoveg,
      nehezsegi_szint: nehezsegi_szint,
    };
    
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán. Hiba: ", err);
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán. Hiba: ", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

// ---- TÖRLÉS

const deleteKerdesData = (connection, kerdesId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM KERDES WHERE KERDES_ID = :kerdes_id";
    const binds = { kerdes_id: kerdesId };
    connection.execute(
      sql,
      binds,
      {
        autoCommit: true,
      },
      (err, result) => {
        if (err) {
          console.log("Hiba történt a törlés folyamán. Hiba: ", err);
          reject(err);
        } else {
          connection.commit((err) => {
            if (err) {
              console.log("Hiba történt a commit folyamán. Hiba: ", err);
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

// Minden válasz lekérdezése, törlése, insertálása
// ---- LEKÉRDEZÉS

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

// ---- INSERT

const insertNewValasz = (
  connection,
  jatekos_id,
  forum_id,
  szoveg,
  datum,
) => {
  return new Promise((resolve, reject) => {
    const valaszId = Math.floor(Math.random() * 50) + 1;
    const sql = "INSERT INTO VALASZ (VALASZ_ID, KERDES_ID, SZOVEG, HELYESSEG) VALUES (:valasz_id, :kerdes_id, :szoveg, :helyesseg)";
  
    const binds = {
      valasz_id: valaszId,
      kerdes_id: jatekos_id,
      szoveg: szoveg,
      helyesseg: helyesseg,
      
    };
    
    connection.execute(sql, binds, (err, result) => {
      if (err) {
        console.log("Hiba történt a beszúrás folyamán. Hiba: ", err);
        reject(err);
      }
      connection.commit((err) => {
        if (err) {
          console.log("Hiba történt a commit folyamán. Hiba: ", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

// ---- TÖRLÉS

const deleteValaszData = (connection, valaszId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM VALASZ WHERE VALASZ_ID = :valasz_id";
    const binds = { valasz_id: valaszId };
    connection.execute(
      sql,
      binds,
      {
        autoCommit: true,
      },
      (err, result) => {
        if (err) {
          console.log("Hiba történt a törlés folyamán. Hiba: ", err);
          reject(err);
        } else {
          connection.commit((err) => {
            if (err) {
              console.log("Hiba történt a commit folyamán. Hiba: ", err);
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
  insertNewForum,
  deleteForumData,
  //Hozzaszolas
  getHozzaszolasData,
  insertNewHozzaszolas,
  deleteHozzaszolasData,
  //temakor
  getTemakorData,
  insertNewTemakor,
  deleteTemakorData,
  //jatekszoba
  getJatekszobaData,
  insertNewJatekszoba,
  deleteJatekszobaData,
  //kerdes
  getKerdesData,
  insertNewKerdes,
  deleteKerdesData,
  //valasz
  getValaszData,
  insertNewValasz,
  deleteValaszData
};
