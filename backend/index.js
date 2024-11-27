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