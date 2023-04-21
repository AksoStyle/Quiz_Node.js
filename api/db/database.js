const oracledb = require('oracledb');
const dbconfig = require('./db-config.js');
const dbconfig_peti = require('./db-config-peti.js');

let connection;

async function connection_start(){
    try{

        connection = await oracledb.getConnection(dbconfig_peti);
        console.log('Sikeres kapcsolódás az adatbázishoz');
        return connection;

    }catch (err) {
        console.error('Hiba történt:', err);
      }
      
}


module.exports = {
    connection_start
    
}
