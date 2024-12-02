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
/*
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
*/
/*FONCTION D'ECHANGE D'INFORMATION
POUR INTERAGIR AVEC L'AUTOMATE*/

//FONCTION: INPUT INFORMATION DANS LE TABLEAU "VAR ACTIVE"
app.post('/varActive/input', async (req, res) => {
  const { Variable_ID, Date_creation, Automate_ID, Nom_var_auto, Frequence_ID, Status } = req.body;

  // Validate request body
  if (!Variable_ID || !Date_creation || !Automate_ID || !Nom_var_auto || !Frequence_ID || !Status) {
      return res.status(400).json({ error: 'All fields must be filled correctly.' });
  }

  try {
      const conn = await pool.getConnection();
      // If any overlapping tasks are found, return an error
      const result = await conn.query(
        'INSERT INTO tasks (Variable_ID, Date_creation, Automate_ID, Nom_var_auto, Frequence_ID, Status) VALUES (?, ?, ?, ?, ?, ?)',
        [Variable_ID, Date_creation, Automate_ID, Nom_var_auto, Frequence_ID, Status]
      );

      conn.release();
      
      res.status(201).json({ message: 'Task created successfully!'});
  } catch (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ error: 'Failed to create task.' });
  }
});

//FONCTION: INPUT INFORMATION DANS LE TABLEAU "AUTOMATE"
app.post('/automate/input', async (req, res) => {
  const { Nom_automate, IP_automate} = req.body;

  // Validate request body
  if (!Nom_automate || !IP_automate) {
      return res.status(400).json({ error: 'All fields must be filled correctly.' });
  }

  try {
      const conn = await pool.getConnection();
      // If any overlapping tasks are found, return an error
      const result = await conn.query(
        'INSERT INTO tasks (Nom_automate, IP_automate) VALUES (?, ?)',
        [Nom_automate, IP_automate]
      );

      conn.release();
      
      res.status(201).json({ message: 'Task created successfully!'});
  } catch (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ error: 'Failed to create task.' });
  }
});

//FONCTION: INPUT INFORMATION DANS LE TABLEAU "FREQUENCE"
app.post('/frequence/input', async (req, res) => {
  const { Nom_frequence, Temps_frequence} = req.body;

  // Validate request body
  if (!Nom_frequence || !Temps_frequence) {
      return res.status(400).json({ error: 'All fields must be filled correctly.' });
  }

  try {
      const conn = await pool.getConnection();
      // If any overlapping tasks are found, return an error
      const result = await conn.query(
        'INSERT INTO tasks (Nom_frequence, Temps_frequence) VALUES (?, ?)',
        [Nom_frequence, Temps_frequence]
      );

      conn.release();
      
      res.status(201).json({ message: 'Task created successfully!'});
  } catch (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ error: 'Failed to create task.' });
  }
});


/*FONCTION DE CONNECTION A L'AUTOMATE
DOIT ÊTRE MODIFIE POUR QUE CE SOIS MODULABLE*/
/*
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
*/
