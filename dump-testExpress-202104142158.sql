-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: testExpress
-- ------------------------------------------------------
-- Server version	5.7.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artikli`
--

DROP TABLE IF EXISTS `artikli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artikli` (
  `shifra` varchar(100) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `edinecna_merka` varchar(100) DEFAULT NULL,
  `tarifen_broj_ddv` int(11) DEFAULT NULL,
  `mkd_proizvod` varchar(100) DEFAULT NULL,
  `tip` varchar(50) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `cena` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`shifra`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artikli`
--

LOCK TABLES `artikli` WRITE;
/*!40000 ALTER TABLE `artikli` DISABLE KEYS */;
INSERT INTO `artikli` VALUES ('23412521WW','ewgwrhrhtrh rsgwe ','fwef ew wef wef we',1,'NE','f wfw efwe fwe fwe','2021-03-28',12000),('3252UOI3','ASUS ROG B-111222','Hardwaree',5,'NE','Laptop Asus','2021-03-27',500),('46234SA1','iemtoeo na softo artikal','ededed',18,'NE','NOV TIP','2021-03-27',250),('63262GG2','Toner','kom',1,'DA','Printer','2021-03-27',100),('hjbhbjhb','faefaeff','sdgdsgdsg',1,'DA','dsgsdgsdg','2021-03-28',1000),('OE3253E','Delivery App','70000',18,'DA','Software','2021-03-27',618),('rewtewtewt','ewtwetwe','wetwetwet',5,'NE','twtewtwt','2021-03-28',6500);
/*!40000 ALTER TABLE `artikli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delovni_partneri`
--

DROP TABLE IF EXISTS `delovni_partneri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delovni_partneri` (
  `shifra` varchar(200) NOT NULL,
  `ime` varchar(200) NOT NULL,
  `telefonski_broj` varchar(100) DEFAULT NULL,
  `adresa` varchar(200) DEFAULT NULL,
  `banka_deponent` varchar(200) DEFAULT NULL,
  `edb` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`shifra`),
  UNIQUE KEY `shifra` (`shifra`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delovni_partneri`
--

LOCK TABLES `delovni_partneri` WRITE;
/*!40000 ALTER TABLE `delovni_partneri` DISABLE KEYS */;
INSERT INTO `delovni_partneri` VALUES ('1215043','Del Partner 1','06712284','W Grand 87','HALK Bank AD','12412577'),('12512WWE','Nov ime partner',NULL,'Ulica 44/1',NULL,'6456456'),('1254152','Partner Nov',NULL,'Marshal Tito 88',NULL,'456456546'),('532452A','Del Partner 2','0781212121','Ulica 342/22','NLB','3435443'),('NOVA21432','Test Test dolgo ime very long','078999111','Adresa 99/11','NLB','4353453464'),('SA21412','Del Partner 3','06712284','Boris K 37','NLB Tutunska Banka','4373473'),('SS21577','Del Partner 4','06712284','Street 45/13','Komercijalna Banka AD Skopje','34537757');
/*!40000 ALTER TABLE `delovni_partneri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promet_header`
--

DROP TABLE IF EXISTS `promet_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promet_header` (
  `shifra` varchar(200) NOT NULL,
  `brojNaStavka` int(11) DEFAULT NULL,
  `partner` varchar(200) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `iznos` bigint(20) DEFAULT NULL,
  `vid` enum('PR','FK','SM') DEFAULT NULL,
  PRIMARY KEY (`shifra`),
  KEY `partner` (`partner`),
  KEY `brojNaStavka` (`brojNaStavka`),
  CONSTRAINT `promet_header_ibfk_1` FOREIGN KEY (`partner`) REFERENCES `delovni_partneri` (`shifra`),
  CONSTRAINT `promet_header_ibfk_2` FOREIGN KEY (`brojNaStavka`) REFERENCES `stavki` (`broj`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promet_header`
--

LOCK TABLES `promet_header` WRITE;
/*!40000 ALTER TABLE `promet_header` DISABLE KEYS */;
INSERT INTO `promet_header` VALUES ('090909',33,'532452A','2021-04-11',1463,'FK'),('112412',12,'1215043','2021-03-28',900,'FK');
/*!40000 ALTER TABLE `promet_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stavki`
--

DROP TABLE IF EXISTS `stavki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stavki` (
  `shifra` varchar(100) NOT NULL,
  `broj` int(11) DEFAULT NULL,
  `rbs` int(11) NOT NULL AUTO_INCREMENT,
  `artikal` varchar(200) DEFAULT NULL,
  `kolicina` bigint(20) DEFAULT NULL,
  `cena` bigint(20) DEFAULT NULL,
  `iznos` bigint(20) DEFAULT NULL,
  `vid` enum('PR','FK','SM') DEFAULT NULL,
  `ddv` int(11) DEFAULT NULL,
  `presmetanDdv` bigint(20) DEFAULT NULL,
  `vkupnaCenaBezDdv` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`shifra`),
  KEY `broj` (`broj`),
  KEY `rbs` (`rbs`),
  KEY `artikal` (`artikal`),
  CONSTRAINT `stavki_ibfk_1` FOREIGN KEY (`artikal`) REFERENCES `artikli` (`shifra`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stavki`
--

LOCK TABLES `stavki` WRITE;
/*!40000 ALTER TABLE `stavki` DISABLE KEYS */;
INSERT INTO `stavki` VALUES ('122',8,5,'3252UOI3',2,NULL,1061,'FK',5,51,1010),('124',12,1,'3252UOI3',2,300,600,'FK',5,NULL,NULL),('12456',12,2,'3252UOI3',3,50,150,'FK',5,NULL,NULL),('1665',14,4,'3252UOI3',2,220,440,'FK',5,NULL,NULL),('190',33,6,'OE3253E',2,620,1463,'FK',18,223,1240);
/*!40000 ALTER TABLE `stavki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'testExpress'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-14 21:58:13
