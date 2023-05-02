const oracledb = require('oracledb');
const dbconfig = require('./db-config.js');
const dbconfig_peti = require('./db-config-peti.js');

let connection;

async function connection_start(){
    try{
        
        connection = await oracledb.getConnection(dbconfig);
        console.log('Sikeres kapcsolódás az adatbázishoz');

        return connection;

    }catch (err) { 
        console.error('Hiba történt:', err);
      }
      
}

async function connection_close() {
    try {
        await connection.close();
        console.log('Kapcsolat lezárva');
    } catch (err) {
        console.error('Hiba történt a kapcsolat lezárása során:', err);
    }
}

module.exports = {
    connection_start,
    connection_close
    
}
