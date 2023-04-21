// Minden Admin lekérdezése
const getAdminData = (connection) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM ADMIN', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
          reject(err);
        }
        const rows = result.rows;
        const jsonData = JSON.stringify(rows);
        resolve(jsonData);
      });
    });
};

// Minden játékos lekérdezése
const getJatekosData = (connection) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM JATEKOS', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
          reject(err);
        }
        const rows = result.rows;
        const jsonData = JSON.stringify(rows);
        resolve(jsonData);
      });
    });
};

// Minden verseny lekérdezése
const getVersenyData = (connection) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM VERSENY', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
          reject(err);
        }
        const rows = result.rows;
        const jsonData = JSON.stringify(rows);
        resolve(jsonData);
      });
    });
};

// Minden Fórum lekérdezése
const getForumData = (connection) => {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT * FROM FORUM', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
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
      connection.execute('SELECT * FROM HOZZASZOLAS', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
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
      connection.execute('SELECT * FROM TEMAKOR', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
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
      connection.execute('SELECT * FROM JATEKSZOBA', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
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
      connection.execute('SELECT * FROM KERDES', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
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
      connection.execute('SELECT * FROM VALASZ', (err, result) => {
        if (err) {
          console.log('Hiba történt a lekérdezés folyamán.');
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
    getJatekosData,
    getVersenyData,
    getForumData,
    getHozzaszolasData,
    getTemakorData,
    getJatekszobaData,
    getKerdesData,
    getValaszData
};

