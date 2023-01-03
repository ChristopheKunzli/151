# 151 snows
### To setup the project on your local machine:
- npm - install
- create file models/dbconfig.js (enter the name of your db and the credentials to use to access that db)
- run following script to create the sample database

``` sql
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `snows`;
CREATE DATABASE IF NOT EXISTS `snows` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */;
USE `snows`;

DROP TABLE IF EXISTS `snows`;
CREATE TABLE IF NOT EXISTS `snows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(4) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `model` varchar(30) NOT NULL,
  `snowLength` int(4) unsigned NOT NULL,
  `qtyAvailable` smallint(6) NOT NULL DEFAULT 0,
  `description` varchar(200) NOT NULL DEFAULT '0',
  `dailyPrice` float unsigned NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `active` tinyint(4) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `snow_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

/*!40000 ALTER TABLE `snows` DISABLE KEYS */;
INSERT INTO `snows` (`id`, `code`, `brand`, `model`, `snowLength`, `qtyAvailable`, `description`, `dailyPrice`, `photo`, `active`) VALUES
	(2, 'B126', 'Burton', 'Free Thinker', 165, 2, 'élargissez votre vision grâce son interprétation du ride tout terrain dynamique sur la poudreuse. (Homme)', 45, 'view/content/images/B126_small.jpg', 1),
	(3, 'B327', 'Burton', 'Day Trader', 155, 6, 'Flottabilité sans effort et un contrôle qui renforce la confiance en soi. (Femme)', 25, 'view/content/images/B327_small.jpg', 1),
	(4, 'K266', 'K2', 'Wildheart', 152, 2, 'Keeping in versatile style (Femme)', 29, 'view/content/images/K266_small.jpg', 1),
	(5, 'N100', 'Nidecker', 'Tracer', 164, 11, 'Une expérience de carve hors du commun. Idéal pour carver comme jamais (Homme et femme)', 39, 'view/content/images/N100_small.jpg', 1),
	(6, 'N754', 'Nidecker', 'Ultralight', 166, 26, 'A la pointe de la technologie. Idéal pour le freeride sur les faces engagées (Homme et femme)', 59, 'view/content/images/N754_small.jpg', 1),
	(7, 'P067', 'Prior', 'Brandwine 153', 154, 9, 'High performance, directional Freeride board, draws a smooth, stable and fast line through all snow conditions. (Femme)', 49, 'view/content/images/P067_small.jpg', 1),
	(8, 'P165', 'Prior', 'BC Split 161', 169, 1, 'Sa forme directionnelle Freeride offre une ride plutôt douce et stable dans une variété de conditions', 35, 'view/content/images/P165_small.jpg', 1),
	(9, 'K409', 'K2', 'Lime Lite', 149, 15, 'Best For Freestyle Evolution with a Focus on Fun (Femme)', 55, 'view/content/images/K409_small.jpg', 1),
	(10, '9042', '43ff43', '2424', 120, 453, '3242', 43, '', 0),
	(11, '9043', '43ff43', '2424', 45, 65, '3242', 95, '', 0),
	(12, '234', '234', '523', 23523, 5235, '235', 235, 'view/content/images/3.jpg', 1),
	(13, '4564', '456', '456', 456, 456, '456', 456, '', 1),
	(14, '765', '765', '765', 765, 765, '765', 765, 'view/content/images/banniere5.jpg', 1);
/*!40000 ALTER TABLE `snows` ENABLE KEYS */;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userEmailAddress` varchar(256) NOT NULL,
  `userHashPsw` varchar(256) NOT NULL,
  `pseudo` varchar(256) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userEmailAddress` (`userEmailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `userEmailAddress`, `userHashPsw`, `pseudo`, `isAdmin`) VALUES
	(1, 'nicolas.glassey@cpnv.ch', '$2y$10$KJF7tmxrqBBNkWVxA4H7Xe0LmEyZ99hPoiurWzjpccd.S3B3aLNvG', 'ben', 0),
	(2, 'pascal.benzonana@cpnv.ch', '$2y$10$uZAWEbk93OtTfhDbe776ouGC6mOVAM.qezuIAzLgLICsCH2BmxAci', 'pba', 0),
	(3, 'jean.paul@cpnv.ch', 'M4RRYZ3t+xFLfTlLvoh2neAruT6NnvNY+EgSV4NWrG8=', 'jpl', 0),
	(4, 'jeanne.pauline@cpnv.ch', '$2y$10$YN3I8/BGvgU5TBukOAjelOVsS.8xUq276u8jBfg4hBpL0Nqk0TAdm', 'jple', 0),
	(5, 'jeannette.paulinette@cpnv.ch', '$2y$10$fuxcwdJ0zpALg.5Zl7PG0euTVwWASrr302bxu6FYEmnKuGGoM4/XG', 'jplet', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

```
