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

// L'adresse IP et le port de votre périphérique Modbus
const modbusDeviceIP = "172.16.1.24";
const modbusPort = 502;

async function connect() {
  try {
    await client.connectTCP(modbusDeviceIP, { port: modbusPort });
    client.setID(1);  // Définir l'ID du périphérique Modbus
    console.log("Connexion réussie au périphérique Modbus");
  } catch (error) {
    console.error("Erreur lors de la connexion au périphérique Modbus :", error);
    setTimeout(connect, 5000);  // Tentative de reconnexion après 5 secondes
  }
}

async function readModbus() {
  try {
    const response = await client.readCoils(503, 1);  // Lire 1 coil à l'adresse 503
    console.log("Réponse reçue :", response.data[0]);  // Afficher les données
    if (response.data[0] == true){
      console.log("Réponse reçue : Awesomesauceman");
    }
    else{
      console.log("Réponse reçue : NotAwesomesauce");
    }
  } catch (error) {
    console.error("Erreur lors de la lecture du périphérique Modbus :", error);
    client.close();  // Fermer la connexion en cas d'erreur
    setTimeout(connect, 5000);  // Reconnexion après 5 secondes en cas d'erreur
  }
}

// Connexion initiale
connect();

// Configurer un intervalle pour lire du périphérique Modbus
setInterval(readModbus, 1000);  // Ajustez l'intervalle selon vos besoins
