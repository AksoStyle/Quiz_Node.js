const { poolMax } = require("oracledb");

module.exports = {
    user: 'system',
    password: 'adatbalapu2023',
    connectString: "DESKTOP-SRV50N0:1522/XE",
    poolMax: 20,
    poolMin: 20,
    poolIncrement: 0
};

