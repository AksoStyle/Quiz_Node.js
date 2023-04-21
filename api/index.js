const oracledb = require('oracledb');
const databaseConn = require('./db/database.js');
const queries = require('./queries.js');
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: 'http://localhost:4200'
}));

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

app.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const data = await get_data();
    res.json(data);
  });

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port} címen.`);
})


module.exports = {
    get_data
}