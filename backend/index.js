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


const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const port = 5001;

// Utiliser le middleware CORS
app.use(cors());

// Utiliser le middleware pour traiter les requêtes JSON
app.use(express.json());

// Configuration de la connexion à MariaDB


const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'donnee_deploiment_si',   // <-- INSERER LE NOM DE LA DATABASE ICI
    connectionLimit: 5
});

/*
// Tester la connexion à la base de données
pool.getConnection()
    .then(conn => {
        console.log("Connecté à MariaDB !");
        conn.release();
    })
    .catch(err => {
        console.error("Erreur de connexion à MariaDB", err);
    });
    */

app.listen(port, async () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// The IP address and port of your Modbus device
const modbusDeviceIP = "172.16.1.24";
const modbusPort = 502;

client.connectTCP(modbusDeviceIP, { port: modbusPort })
  .then(() => {
    client.setID(1);  // Set the Modbus device ID

    // Create an array to store the test results (optional)
    const test = [];

    // Set an interval to read from the Modbus device
    setInterval(async function() {
      try {
        const response = await client.readCoils(503, 1);  // Read 1 coil from address 503
        console.log(response.data);  // Log the response data
      } catch (error) {
        console.error("Error reading from Modbus device:", error);
      }
    }, 1000);  // Adjust the interval as needed
  })
  .catch(error => {
    console.error("Error connecting to Modbus device:", error);
});
