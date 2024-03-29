-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: testExpress
-- ------------------------------------------------------
-- Server version	5.7.34

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
-- Dumping data for table `artikli`
--

LOCK TABLES `artikli` WRITE;
/*!40000 ALTER TABLE `artikli` DISABLE KEYS */;
INSERT INTO `artikli` VALUES (2,'test2','wrq',1,'DA','2021-09-29',1200),(5,'gdgdrr','grsg',1,'NE','2021-09-25',249),(7,'kihukt','Hardware',1,'NE','2021-09-25',345),(10,'wqeqew','eqw',1,'DA','2021-09-25',123123),(11,'lou','rtj',0,'NE','2021-09-25',5230),(15,'ae','fea',0,'NE','2021-09-25',2141),(16,'yesgsfaf','dsfedfdsfdsf',2,'DA','2021-09-28',400),(17,'Ime aisdasid asdsaddsasaddsadasdsaads dsa ad sdas dsa ds asd adas s addas s ad asddad','rer',1,'DA','2021-10-02',2000);
/*!40000 ALTER TABLE `artikli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `delovni_partneri`
--

LOCK TABLES `delovni_partneri` WRITE;
/*!40000 ALTER TABLE `delovni_partneri` DISABLE KEYS */;
INSERT INTO `delovni_partneri` VALUES (7,'Partner 1','342534543265','qweqrwq','rqwrwqr','62436236'),(15,'Partner 3','325323253','Adresa p2','NLB','52335253'),(16,'Partner Skopje','53252532532','Skopje - adresa broj 33 ','HALK','423546568');
/*!40000 ALTER TABLE `delovni_partneri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `promet_header`
--

LOCK TABLES `promet_header` WRITE;
/*!40000 ALTER TABLE `promet_header` DISABLE KEYS */;
INSERT INTO `promet_header` VALUES (20198,'2019-06-10',5362,'FK',16,2,2019,5345,17),(20201,'2020-10-02',2141,'FK',15,1,2020,NULL,NULL),(20212,'2021-10-02',4253,'FK',7,3,2021,NULL,NULL),(20213,'2021-10-02',3100,'FK',7,2,2021,NULL,NULL),(20214,'2021-08-19',6100,'FK',15,2,2021,NULL,NULL),(20215,'2021-10-10',2100,'PR',16,1,2021,NULL,NULL),(20216,'2021-10-10',5452,'FK',15,2,2021,5192,260),(20217,'2021-10-10',315,'FK',16,2,2021,300,15),(20218,'2021-10-10',10800,'FK',15,2,2021,10800,0),(20219,'2021-10-10',1147,'FK',15,2,2021,1092,55),(201913,'2019-05-16',3020,'SM',16,2,2019,2900,120),(202013,'2020-07-29',7982,'SM',15,3,2020,7400,582),(202110,'2021-10-10',2100,'PR',7,1,2021,2000,100),(202111,'2021-10-10',472,'SM',16,1,2021,400,72),(202112,'2021-10-10',1416,'SM',16,1,2021,1200,216);
/*!40000 ALTER TABLE `promet_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `stavki`
--

LOCK TABLES `stavki` WRITE;
/*!40000 ALTER TABLE `stavki` DISABLE KEYS */;
INSERT INTO `stavki` VALUES (62,1,15,1,2141,2141,'FK',0,0,2141,20201,15,'2020-10-02'),(63,1,10,1,1200,1260,'FK',5,60,1200,20212,7,'2021-10-02'),(64,2,2,2,1300,2730,'FK',5,130,2600,20212,7,'2021-10-02'),(65,3,5,1,250,263,'FK',5,13,250,20212,7,'2021-10-02'),(66,1,17,1,2000,2100,'FK',5,100,2000,20213,7,'2021-10-02'),(67,2,11,2,500,1000,'FK',0,0,1000,20213,7,'2021-10-02'),(68,1,17,1,2000,2100,'FK',5,100,2000,20214,15,'2021-08-19'),(69,2,15,2,2000,4000,'FK',0,0,4000,20214,15,'2021-08-19'),(70,1,17,1,2000,2100,'PR',5,100,2000,20215,16,'2021-10-10'),(71,1,2,1,1200,1260,'FK',5,60,1200,20216,15,'2021-10-10'),(72,2,5,2,1996,4192,'FK',5,200,3992,20216,15,'2021-10-10'),(73,1,2,1,100,105,'FK',5,5,100,20217,16,'2021-10-10'),(74,2,10,1,200,210,'FK',5,10,200,20217,16,'2021-10-10'),(75,1,11,1,5000,5000,'FK',0,0,5000,20198,16,'2019-06-10'),(76,2,7,1,345,362,'FK',5,17,345,20198,16,'2019-06-10'),(77,1,17,1,2000,2100,'FK',5,100,2000,20198,16,'2019-06-12'),(78,2,5,3,290,914,'FK',5,44,870,20198,16,'2019-06-12'),(79,1,11,2,5100,10200,'FK',0,0,10200,20218,15,'2021-10-10'),(80,2,15,3,200,600,'FK',0,0,600,20218,15,'2021-10-10'),(81,1,7,1,345,362,'FK',5,17,345,20219,15,'2021-10-10'),(82,2,5,3,249,784,'FK',5,37,747,20219,15,'2021-10-10'),(83,1,17,1,2000,2100,'PR',5,100,2000,202110,7,'2021-10-10'),(84,1,16,1,400,472,'SM',18,72,400,202111,16,'2021-10-10'),(85,1,16,3,400,1416,'SM',18,216,1200,202112,16,'2021-10-10'),(86,1,16,6,400,2832,'SM',18,432,2400,202013,15,'2020-07-29'),(87,2,11,50,40,2000,'SM',0,0,2000,202013,15,'2020-07-29'),(88,3,7,1,3000,3150,'SM',5,150,3000,202013,15,'2020-07-29'),(89,1,11,1,500,500,'SM',0,0,500,201913,16,'2019-05-16'),(90,2,2,2,1200,2520,'SM',5,120,2400,201913,16,'2019-05-16');
/*!40000 ALTER TABLE `stavki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tarifen_broj`
--

LOCK TABLES `tarifen_broj` WRITE;
/*!40000 ALTER TABLE `tarifen_broj` DISABLE KEYS */;
INSERT INTO `tarifen_broj` VALUES (0,0),(1,5),(2,18);
/*!40000 ALTER TABLE `tarifen_broj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','$2a$08$423/i2J4SRnLSwDqilhTD.BCvwGVkzbqQ/coLDUHcl4B.CiCimgCO','Admin'),(2,'NormalUser','12345','User'),(3,'ThirdUser','$2a$08$gRwjFKpsRJ0CArnn2K7VHuH8VwUcupqiS33q5y7lM4zZnGKKx23fy','User'),(4,'4user','$2a$08$XaTrmoLlY4XFAxDoLKQ.mO5jPahGAOf9qhRHG.jN7WZnnADC.nAKm','Admin'),(8,'qq','$2a$08$Y5Qp6xF97mxUSEFmTyR4YuLKKf.eFQeJdTGoJ5SxkNdH0NCvzDwXy','Admin'),(9,'test','$2a$08$70O/HBIb2P9eUoy9DpuxVu0QHzt8hTWTtWDWfx8khrZgT4G7g4e0.','Admin'),(10,'admin1','$2a$08$OJ7gBBSXlsjcZDLwF7dVf.IL7K/8kU/7GoFUi7Zy5pEO2mjoHHPcG','Admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'testExpress'
--

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

-- Dump completed on 2021-11-21 20:04:37
