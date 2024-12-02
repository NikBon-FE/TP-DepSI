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

-- Listage des données de la table donnee_deploiment_si.automate : ~4 rows (environ)
INSERT INTO `automate` (`ID`, `Nom_automate`, `IP_automate`) VALUES
	(1, 'Zone 4', '172.16.1.24'),
	(2, 'Zone 3', '172.16.1.23'),
	(3, 'Zone 2', '172.16.1.22'),
	(4, 'Zone 1', '172.16.1.21');

-- Listage des données de la table donnee_deploiment_si.frequence : ~1 rows (environ)
INSERT INTO `frequence` (`ID`, `Nom_frequence`, `Temps_frequence`) VALUES
	(1, '1 seconde', '00:00:01');

-- Listage des données de la table donnee_deploiment_si.login : ~1 rows (environ)
INSERT INTO `login` (`ID`, `Utilisateur`, `Password`, `Droit_int`) VALUES
	(1, 'admin', 'admin', 1);

-- Listage des données de la table donnee_deploiment_si.suivi : ~0 rows (environ)

-- Listage des données de la table donnee_deploiment_si.variable_active : ~0 rows (environ)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
