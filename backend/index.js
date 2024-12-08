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
    host: 'db',
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

// Utilisez express.json() pour analyser les données JSON
app.use(express.json()); // Remplace body-parser par express.json()

app.post('/varActive/input', async (req, res) => {
    // Déstructurez les champs du corps de la requête
    const { Nom_var_auto, Mot_automate, Automate_ID, Frequence_ID, Statut, Date_creation } = req.body;

    // Validation des champs requis
    if (!Nom_var_auto || !Mot_automate || !Automate_ID || !Frequence_ID || Statut === undefined || !Date_creation) {
        return res.status(400).json({ error: 'Tous les champs doivent être remplis correctement.' });
    }

    try {
        const conn = await pool.getConnection();

        // Insérer dans la table "variable_active"
        const result = await conn.query(
            'INSERT INTO variable_active (Nom_var_auto, Mot_automate, Automate_ID, Frequence_ID, Statut, Date_creation) VALUES (?, ?, ?, ?, ?, ?)',
            [Nom_var_auto, Mot_automate, Automate_ID, Frequence_ID, Statut, Date_creation]
        );

        conn.release();

        res.status(201).json({ message: 'Variable active ajoutée avec succès!' });
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
        res.status(500).json({ error: 'Échec de l\'ajout des données.' });
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
        'INSERT INTO automate (Nom_automate, IP_automate) VALUES (?, ?)',
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
        'INSERT INTO frequence (Nom_frequence, Temps_frequence) VALUES (?, ?)',
        [Nom_frequence, Temps_frequence]
      );

      conn.release();
      
      res.status(201).json({ message: 'Task created successfully!'});
  } catch (error) {
      console.error('Error inserting task:', error);
      res.status(500).json({ error: 'Failed to create task.' });
  }
});


//FONCTION: INPUT INFORMATION DANS LE TABLEAU "VARIATION ACTIVE"
app.post('/varActive/input', async (req, res) => {
  const { Nom_var_auto, Mot_automate, Automate_ID, Frequence_ID, Statut, Date_creation } = req.body;
  // Validation des champs requis
  if (!Nom_var_auto || !Mot_automate || !Automate_ID || !Frequence_ID || !Statut || !Date_creation) {
      return res.status(400).json({ error: 'Tous les champs doivent être remplis correctement.' });
  }

  try {
      const conn = await pool.getConnection();

      // Insérer dans la table "variable_active"
      const result = await conn.query(
          'INSERT INTO variable_active (Nom_var_auto, Mot_automate, Automate_ID, Frequence_ID, Statut, Date_creation) VALUES (?, ?, ?, ?, ?, ?)',
          [Nom_var_auto, Mot_automate, Automate_ID, Frequence_ID, Statut, Date_creation]
      );

      conn.release();

      res.status(201).json({ message: 'Variable active ajoutée avec succès!' });
  } catch (error) {
      console.error('Erreur lors de l\'insertion des données:', error);
      res.status(500).json({ error: 'Échec de l\'ajout des données.' });
  }
});


//LOGIN CHECK
app.get('/login/check', async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();
      console.log("Database connection established");
      const check = await conn.query(
        "SELECT login.ID, login.Utilisateur, login.Password, login.Droit_int FROM login"
      );
      res.json(check);
  } catch (error) {
      console.error('Database error:', error.message); // Log the actual error
      res.status(500).json({ error: error.message });
  } finally {
      if (conn) conn.release();
  }
});

//FREQU CHECK
app.get('/frequence/check', async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();
      console.log("Database connection established");
      const check = await conn.query(
        "SELECT frequence.ID, frequence.Nom_frequence, frequence.Temps_frequence FROM frequence"
      );
      res.json(check);
  } catch (error) {
      console.error('Database error:', error.message); // Log the actual error
      res.status(500).json({ error: error.message });
  } finally {
      if (conn) conn.release();
  }
});

//AUTOM CHECK
app.get('/automate/check', async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();
      console.log("Database connection established");
      const check = await conn.query(
        "SELECT automate.ID, automate.Nom_automate, automate.IP_automate FROM automate"
      );
      res.json(check);
  } catch (error) {
      console.error('Database error:', error.message); // Log the actual error
      res.status(500).json({ error: error.message });
  } finally {
      if (conn) conn.release();
  }
});

//VARACT CHECK
app.get('/varActive/check', async (req, res) => {
  let conn;
  try {
      conn = await pool.getConnection();
      console.log("Database connection established");

      // Requête SQL avec jointures pour récupérer les informations
      const query = `
        SELECT
          va.ID,
          va.Nom_var_auto,
          va.Mot_automate,
          va.Statut,
          f.Nom_frequence,
          a.Nom_automate
        FROM variable_active va
        JOIN frequence f ON va.Frequence_ID = f.ID
        JOIN automate a ON va.Automate_ID = a.ID
      `;
      
      const result = await conn.query(query);
      res.json(result);
  } catch (error) {
      console.error('Database error:', error.message); // Log the actual error
      res.status(500).json({ error: error.message });
  } finally {
      if (conn) conn.release();
  }
});

/*FONCTION D'ECHANGE D'INFORMATION
POUR INTERAGIR AVEC L'AUTOMATE 12345*/

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
    //console.log("Réponse reçue :", response.data[0]);  // Afficher les données
    if (response.data[0] == true){
      console.log("Réponse reçue :oui en vrai je...");
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

