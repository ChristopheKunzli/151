# 151 snows
### To setup the project on your local machine:
- npm - install
- create file db/dbconfig.js (enter the name of aour db and the credentials to use to access that db)
- run following script to create the sample database

``` sql
-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.9.2-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6541
-- --------------------------------------------------------

-- Listage de la structure de la base pour snows
CREATE DATABASE IF NOT EXISTS `snows` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */;
USE `snows`;

-- Listage de la structure de table snows. snows
CREATE TABLE IF NOT EXISTS `snows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(4) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `model` varchar(30) NOT NULL,
  `snowLength` int(4) unsigned NOT NULL,
  `qtyAvailable` smallint(6) NOT NULL DEFAULT 0,
  `description` varchar(200) NOT NULL DEFAULT '0',
  `dailyPrice` float unsigned NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `active` tinyint(4) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `snow_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

-- Listage des données de la table snows.snows : ~9 rows (environ)
INSERT INTO `snows` (`id`, `code`, `brand`, `model`, `snowLength`, `qtyAvailable`, `description`, `dailyPrice`, `photo`, `active`) VALUES
	(1, 'B101', 'Burton', 'Custom', 160, 22, 'La board la plus fiable de tous les temps, la solution snowboard pour tous les terrains. (Homme)', 29, 'view/content/images/B101_small.jpg', 1),
	(2, 'B126', 'Burton', 'Free Thinker', 165, 2, 'Élargissez votre vision grâce son interprétation du ride tout terrain dynamique sur la poudreuse. (Homme)', 45, 'view/content/images/B126_small.jpg', 1),
	(3, 'B327', 'Burton', 'Day Trader', 155, 6, 'Flottabilité sans effort et un contrôle qui renforce la confiance en soi. (Femme)', 25, 'view/content/images/B327_small.jpg', 0),
	(4, 'K266', 'K2', 'Wildheart', 152, 2, 'Keeping in versatile style (Femme)', 29, 'view/content/images/K266_small.jpg', 1),
	(5, 'N100', 'Nidecker', 'Tracer', 164, 11, 'Une expérience de carve hors du commun. Idéal pour carver comme jamais (Homme et femme)', 39, 'view/content/images/N100_small.jpg', 1),
	(6, 'N754', 'Nidecker', 'Ultralight', 166, 26, 'A la pointe de la technologie. Idéal pour le freeride sur les faces engagées (Homme et femme)', 59, 'view/content/images/N754_small.jpg', 1),
	(7, 'P067', 'Prior', 'Brandwine 153', 154, 9, 'High performance, directional Freeride board, draws a smooth, stable and fast line through all snow conditions. (Femme)', 49, 'view/content/images/P067_small.jpg', 1),
	(8, 'P165', 'Prior', 'BC Split 161', 169, 1, 'Sa forme directionnelle Freeride offre une ride plutôt douce et stable dans une variété de conditions', 35, 'view/content/images/P165_small.jpg', 1),
	(9, 'K409', 'K2', 'Lime Lite', 149, 15, 'Best For Freestyle Evolution with a Focus on Fun (Femme)', 55, 'view/content/images/K409_small.jpg', 1);

-- Listage de la structure de table snows. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userEmailAddress` varchar(256) COLLATE utf8mb3_unicode_ci NOT NULL,
  `userHashPsw` varchar(256) COLLATE utf8mb3_unicode_ci NOT NULL,
  `pseudo` varchar(256) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userEmailAddress` (`userEmailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Listage des données de la table snows.users : ~3 rows (environ)
INSERT INTO `users` (`id`, `userEmailAddress`, `userHashPsw`, `pseudo`) VALUES
	(1, 'nicolas.glassey@cpnv.ch', '$2y$10$KJF7tmxrqBBNkWVxA4H7Xe0LmEyZ99hPoiurWzjpccd.S3B3aLNvG', 'ben'),
	(2, 'pascal.benzonana@cpnv.ch', '$2y$10$uZAWEbk93OtTfhDbe776ouGC6mOVAM.qezuIAzLgLICsCH2BmxAci', 'pba'),
	(3, 'jean.paul@cpnv.ch', 'M4RRYZ3t+xFLfTlLvoh2neAruT6NnvNY+EgSV4NWrG8=', 'jpl');
```
