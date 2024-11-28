/**Back-end ; utilisé pour traiter les différentes commandes database

Usage:
======
    Javascript index.js

    (inserer ici chaque fonction de push/pull)
    
    
**/

__authors__ = ("Nicolas Bontemps, Alexis Klucj")
__contact__ = ("nicolas.bontemps@etu.unilasalle.fr, alexis.kluck@etu.unilasalle.fr")
__copyright__ = "Unilasalle Amiens"
__date__ = "2024-??-??"
__version__= "1.0.0"

/**

const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 3000;

// Utiliser le middleware CORS
app.use(cors());

// Utiliser le middleware pour traiter les requêtes JSON
app.use(express.json());

// Configuration de la connexion à MariaDB
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '',   // <-- INSERER LE NOM DE LA DATABASE ICI
    connectionLimit: 5
});

// Tester la connexion à la base de données
pool.getConnection()
    .then(conn => {
        console.log("Connecté à MariaDB !");
        conn.release();
    })
    .catch(err => {
        console.error("Erreur de connexion à MariaDB", err);
    });

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
**/

// create an empty modbus client
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const test = []
// open connection to a tcp line
client.connectTCP("172.16.1.24", { port: 502 });
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(async function() {
    const test = await client.readCoils(503, 1);
    console.log(test.data);
}, 1000);