# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: erxv1bzckceve5lh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com (MySQL 5.7.23-log)
# Database: naxr8w21i6j7tqab
# Generation Time: 2020-03-14 04:55:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `comment_data` text COLLATE utf8_unicode_ci NOT NULL,
  `comment_time` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;

INSERT INTO `comment` (`comment_id`, `post_id`, `comment_data`, `comment_time`, `users_id`)
VALUES
	(1,1,'goodddd','27-01-2020 16:27',1),
	(2,1,';D','27-01-2020 16:27',1),
	(3,2,'so cute','28-01-2020 10:33',1),
	(4,4,'good','28-01-2020 12:03',1),
	(5,4,'gggg','28-01-2020 12:03',5);

/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table level
# ------------------------------------------------------------

DROP TABLE IF EXISTS `level`;

CREATE TABLE `level` (
  `level_id` int(10) NOT NULL AUTO_INCREMENT,
  `level_name_th` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `level_name_en` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;

INSERT INTO `level` (`level_id`, `level_name_th`, `level_name_en`)
VALUES
	(1,'มัธยมศึกษาปีที่ 1 ','M.1'),
	(2,'มัธยมศึกษาปีที่ 2','M.2'),
	(3,'มัธยมศึกษาปีที่ 3','M.3'),
	(4,'มัธยมศึกษาปีที่ 4','M.4'),
	(5,'มัธยมศึกษาปีที่ 5','M.5'),
	(6,'มัธยมศึกษาปีที่ 6','M.6'),
	(7,'จบมัธยมศึกษาปีที่ 6',''),
	(8,'จบการศึกษาปริญาตรี',''),
	(9,'จบการศึกษาปริญญาโท','');

/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `payment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `payment_date` varchar(20) COLLATE utf8_unicode_ci DEFAULT '',
  `payment_time` time DEFAULT NULL,
  `payment_course_id` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_amount` int(11) DEFAULT NULL,
  `payment_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_student_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_tutor_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_image` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `paymentStatus_id` int(1) DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;

INSERT INTO `payment` (`payment_id`, `payment_date`, `payment_time`, `payment_course_id`, `payment_amount`, `payment_name`, `payment_student_id`, `payment_tutor_id`, `payment_image`, `paymentStatus_id`)
VALUES
	(1,'Invalid date','17:35:00','3',1200,'Sarocha phothisawang','1','2','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580121752/djanrkhxhvoenvcpehn4.jpg',NULL),
	(2,'Invalid date','12:03:00','3',1200,'alisa phothisawang','1','2','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580187862/j9pibgdy8ovgwbabqxeb.jpg',NULL),
	(3,'Invalid date','12:03:00','3',1200,'alisa phothisawang','1','2','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580187889/pxppshyu1zin6sld6foa.jpg',NULL),
	(4,'Invalid date','12:35:00','7',1200,'alisa phothisawang','1','2','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580189786/nkipqt4ifr1agp27fqd0.jpg',NULL),
	(5,'Invalid date','17:35:00','3',1200,'Sarocha phothisawang','1','2','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580121752/djanrkhxhvoenvcpehn4.jpg',NULL),
	(6,'12/12/2540','00:00:01','1',1,'1','1','1','http://res.cloudinary.com/hrzcnxorq/image/upload/v1582481760/fzwm8rxzhhvomcji034r.png',NULL),
	(7,'Invalid date','02:07:00','4',500,'kan kanya','5','4','http://res.cloudinary.com/hrzcnxorq/image/upload/v1582484863/zit75ekllexoqjjz5jvh.jpg',NULL),
	(8,'Invalid date','02:07:00','4',500,'kan kanya','5','4','http://res.cloudinary.com/hrzcnxorq/image/upload/v1582484951/ywfziy7kmgtduvuml93j.jpg',NULL),
	(9,'24/2/2020','02:09:00','4',500,'kan kanya','5','4','http://res.cloudinary.com/hrzcnxorq/image/upload/v1582484995/ouh3pfffmbaaowo9hzsq.jpg',NULL),
	(10,'24/2/2020','02:09:00','4',500,'kan kanya','5','4','http://res.cloudinary.com/hrzcnxorq/image/upload/v1582485005/yx8txqti82mbifr0eyrm.jpg',NULL);

/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payment_status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment_status`;

CREATE TABLE `payment_status` (
  `paymentStatus_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `paymentStatus_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`paymentStatus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `payment_status` WRITE;
/*!40000 ALTER TABLE `payment_status` DISABLE KEYS */;

INSERT INTO `payment_status` (`paymentStatus_id`, `paymentStatus_name`)
VALUES
	(0,'ยังไม่ชำระเงิน'),
	(1,'ชำระเงินแล้ว');

/*!40000 ALTER TABLE `payment_status` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_date` date DEFAULT NULL,
  `post_time` time NOT NULL,
  `subject_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `sex_id` int(1) NOT NULL,
  `post_price` int(5) DEFAULT NULL,
  `place` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;

INSERT INTO `post` (`post_id`, `post_date`, `post_time`, `subject_id`, `level_id`, `sex_id`, `post_price`, `place`, `users_id`)
VALUES
	(1,'2020-01-28','12:03:21',2,3,2,1234,'kku',2),
	(2,'2020-02-23','03:15:56',4,2,2,500,'asddasdasd',4),
	(3,'2020-01-28','12:03:21',7,3,2,1200,'kku',2),
	(5,'2020-02-23','03:15:56',4,2,2,500,'asddasdasd',4);

/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table profile
# ------------------------------------------------------------

DROP TABLE IF EXISTS `profile`;

CREATE TABLE `profile` (
  `profile_id` int(10) NOT NULL AUTO_INCREMENT,
  `profile_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `profile_lastname` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile_email` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `profile_image` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `profile_phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level_id` int(1) DEFAULT NULL,
  `sex_id` int(1) NOT NULL,
  `role_id` int(1) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;

INSERT INTO `profile` (`profile_id`, `profile_name`, `profile_lastname`, `profile_email`, `profile_image`, `profile_phone`, `level_id`, `sex_id`, `role_id`, `users_id`)
VALUES
	(1,'test','Lastname','email.com','http://res.cloudinary.com/hrzcnxorq/image/upload/v1582380713/pqwxoc6udwsfe4dcm5me.jpg','0887266181',5,1,2,1),
	(2,'kanyanat','khiankhokkruad','kanyanat@hotmail.com','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580121071/drstefirj3owdvre04i7.jpg','0821575994',9,2,2,2),
	(3,'Amway','Araya','alwaysway25@gmail.com','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580182440/yy2xyzk2vbx66ecerqnp.jpg','0990344840',8,2,2,4),
	(4,'kan','kanya','kedddd@hotmail.com','http://res.cloudinary.com/hrzcnxorq/image/upload/v1580189075/fnve83ywxzahnxnxouib.jpg','0985432234',5,2,1,5);

/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name_th` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `role_name_en` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`role_id`, `role_name_th`, `role_name_en`)
VALUES
	(1,'นักเรียน','Student'),
	(2,'ติวเตอร์','Tutor');

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sex
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sex`;

CREATE TABLE `sex` (
  `sex_id` int(11) NOT NULL AUTO_INCREMENT,
  `sex_name_th` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `sex_name_en` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`sex_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `sex` WRITE;
/*!40000 ALTER TABLE `sex` DISABLE KEYS */;

INSERT INTO `sex` (`sex_id`, `sex_name_th`, `sex_name_en`)
VALUES
	(1,'ชาย','Male'),
	(2,'หญิง','Female');

/*!40000 ALTER TABLE `sex` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
  `subject_id` int(10) NOT NULL AUTO_INCREMENT,
  `subject_name_th` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `subject_name_en` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `subject_detail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;

INSERT INTO `subject` (`subject_id`, `subject_name_th`, `subject_name_en`, `subject_detail`)
VALUES
	(1,'ภาษาไทย','Thai','วิชาภาษาไทยพื้นฐาน'),
	(2,'สังคมศึกษา','Social','วิชาสังคมศึกษา และวัฒนธรรม'),
	(3,'ภาษาอังกฤษ','English','วิชาภาษาอังกฤษพื้นฐาน'),
	(4,'คณิตศาสตร์','Mathematics','วิชาคณิตศาสตร์พื้นฐาน'),
	(5,'ฟิสิกส์','Physical','วิชาฟิสิกส์'),
	(6,'เคมี','Chemical','วิชาเคมี'),
	(7,'ชีววิทยา','Bilogy','วิชาชีววิทยา'),
	(8,'วิทยาศาสตร์','Science','วิชาวิทยาศาสตร์เริ่มต้น');

/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `users_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_name` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `users_password` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '',
  PRIMARY KEY (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`users_id`, `users_name`, `users_password`)
VALUES
	(1,'sarocha','ch12345'),
	(2,'kedkie','kk12345'),
	(3,'1','1'),
	(4,'iiamway','iiamway'),
	(5,'kedd','12345');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
