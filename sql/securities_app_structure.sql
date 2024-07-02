-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: securities_app
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sec_acc_master`
--

DROP TABLE IF EXISTS `sec_acc_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sec_acc_master` (
  `PORTFOLIO_NUMBER` varchar(50) NOT NULL,
  `ACCOUNT_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PORTFOLIO_NUMBER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `security_master`
--

DROP TABLE IF EXISTS `security_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_master` (
  `SECURITY_NUMBER` varchar(50) NOT NULL,
  `SHORT_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SECURITY_NUMBER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `security_transactions`
--

DROP TABLE IF EXISTS `security_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_transactions` (
  `TRADE_DATE` date DEFAULT NULL,
  `PORTFOLIO_NUMBER` varchar(50) DEFAULT NULL,
  `SHARE_SYMBOL` varchar(50) DEFAULT NULL,
  `SECURITY_CURRENCY` varchar(10) DEFAULT NULL,
  `SECURITY_ACCOUNT` varchar(50) DEFAULT NULL,
  `SAM_NAME` varchar(100) DEFAULT NULL,
  `SECURITY_NUMBER` varchar(50) DEFAULT NULL,
  `SECURITY_NAME` varchar(100) DEFAULT NULL,
  `TRANS_TYPE` varchar(10) DEFAULT NULL,
  `RECID` int NOT NULL AUTO_INCREMENT,
  `NO_NOMINAL` decimal(20,2) DEFAULT NULL,
  `PRICE` decimal(20,2) DEFAULT NULL,
  `NET_AMT_TRADE` decimal(20,2) DEFAULT NULL,
  `BROKER_COMMS` decimal(20,2) DEFAULT NULL,
  `PROF_LOSS_SEC_CCY` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`RECID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-02 12:58:25
