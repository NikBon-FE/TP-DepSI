-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           11.5.2-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour donnee_deploiment_si
CREATE DATABASE IF NOT EXISTS `donnee_deploiment_si` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */;
USE `donnee_deploiment_si`;

-- Listage de la structure de la table donnee_deploiment_si. automate
CREATE TABLE IF NOT EXISTS `automate` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_automate` varchar(50) DEFAULT NULL,
  `IP_automate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Listage des données de la table donnee_deploiment_si.automate : ~4 rows (environ)
INSERT INTO `automate` (`ID`, `Nom_automate`, `IP_automate`) VALUES
	(1, 'Zone 4', '172.16.1.24'),
	(2, 'Zone 3', '172.16.1.23'),
	(3, 'Zone 2', '172.16.1.22'),
	(4, 'Zone 1', '172.16.1.21');

-- Listage de la structure de la table donnee_deploiment_si. frequence
CREATE TABLE IF NOT EXISTS `frequence` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_frequence` varchar(50) DEFAULT NULL,
  `Temps_frequence` time DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Listage des données de la table donnee_deploiment_si.frequence : ~1 rows (environ)
INSERT INTO `frequence` (`ID`, `Nom_frequence`, `Temps_frequence`) VALUES
	(1, '1 seconde', '00:00:01');

-- Listage de la structure de la table donnee_deploiment_si. login
CREATE TABLE IF NOT EXISTS `login` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Utilisateur` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Droit_int` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Listage des données de la table donnee_deploiment_si.login : ~1 rows (environ)
INSERT INTO `login` (`ID`, `Utilisateur`, `Password`, `Droit_int`) VALUES
	(1, 'admin', 'admin', 1);

-- Listage de la structure de la table donnee_deploiment_si. suivi
CREATE TABLE IF NOT EXISTS `suivi` (
  `Variable_ID` int(11) NOT NULL,
  `Date_enregiste` datetime NOT NULL,
  `Statut_booleen` int(11) NOT NULL DEFAULT 0,
  `Valeur_variable` int(11) NOT NULL DEFAULT 0,
  `Frequence` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Variable_ID`),
  CONSTRAINT `FK_suivi_variable_active` FOREIGN KEY (`Variable_ID`) REFERENCES `variable_active` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Listage des données de la table donnee_deploiment_si.suivi : ~0 rows (environ)

-- Listage de la structure de la table donnee_deploiment_si. variable_active
CREATE TABLE IF NOT EXISTS `variable_active` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Variable_ID` varchar(50) DEFAULT NULL,
  `Date_creation` datetime DEFAULT NULL,
  `Automate_ID` int(11) DEFAULT NULL,
  `Nom_var_auto` varchar(50) DEFAULT NULL,
  `Frequence_ID` int(11) DEFAULT NULL,
  `Statut` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_variable_active_automate` (`Automate_ID`),
  KEY `FK_variable_active_frequence` (`Frequence_ID`),
  CONSTRAINT `FK_variable_active_automate` FOREIGN KEY (`Automate_ID`) REFERENCES `automate` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_variable_active_frequence` FOREIGN KEY (`Frequence_ID`) REFERENCES `frequence` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Listage des données de la table donnee_deploiment_si.variable_active : ~0 rows (environ)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
