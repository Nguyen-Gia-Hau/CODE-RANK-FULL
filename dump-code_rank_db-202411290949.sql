/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: code_rank_db
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `contest_problems`
--

DROP TABLE IF EXISTS `contest_problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contest_problems` (
  `contest_problem_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contest_id` int(10) unsigned NOT NULL,
  `problem_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`contest_problem_id`),
  UNIQUE KEY `context_problem_id_UNIQUE` (`contest_problem_id`),
  KEY `fk_contest_problems_id_idx` (`problem_id`),
  KEY `fk_contest_problems_contest_id_idx` (`contest_id`),
  CONSTRAINT `fk_contest_problems_contest_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contest_problems_problem_id` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`problem_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_problems`
--

LOCK TABLES `contest_problems` WRITE;
/*!40000 ALTER TABLE `contest_problems` DISABLE KEYS */;
INSERT INTO `contest_problems` VALUES
(23,114,221),
(24,115,221),
(25,115,222),
(26,116,224),
(27,116,225),
(28,116,226);
/*!40000 ALTER TABLE `contest_problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_users`
--

DROP TABLE IF EXISTS `contest_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contest_users` (
  `contest_user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `contest_id` int(10) unsigned NOT NULL,
  `total_point` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`contest_user_id`),
  UNIQUE KEY `contest_user_id_UNIQUE` (`contest_user_id`),
  KEY `fk_contest_users_contest_id_idx` (`contest_id`),
  KEY `fk_contest_users_user_id_idx` (`user_id`),
  CONSTRAINT `fk_contest_users_contest_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contest_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_users`
--

LOCK TABLES `contest_users` WRITE;
/*!40000 ALTER TABLE `contest_users` DISABLE KEYS */;
INSERT INTO `contest_users` VALUES
(28,22,106,0),
(29,22,109,100),
(30,30,109,99.5),
(31,31,109,99),
(32,28,114,100),
(33,22,114,0),
(34,30,114,99.5),
(35,30,116,197.5),
(36,22,116,199),
(37,31,116,197.5);
/*!40000 ALTER TABLE `contest_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contests` (
  `contest_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start_time` timestamp NOT NULL,
  `total_time` int(11) NOT NULL DEFAULT 240,
  `participant_count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`contest_id`),
  UNIQUE KEY `context_id_UNIQUE` (`contest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
INSERT INTO `contests` VALUES
(106,'Summer Coding Contest','2024-10-24 03:00:00',300,4),
(109,'New Contest','2024-10-30 22:00:00',300,53),
(110,'Test','2024-10-23 03:00:00',300,1),
(111,'Test 2','2024-10-25 00:00:00',300,0),
(112,'Cuộc thi thiếu nhi lần 1','2024-10-25 09:32:00',300,0),
(113,'Cuộc thi thiếu nhi lần 0','2024-10-24 11:00:00',300,0),
(114,'Cuộc thi thiếu nhi lần 1','2024-11-14 01:00:00',120,3),
(115,'lập trình','2024-11-14 03:16:00',120,0),
(116,'Cuộc thi mùa đông 1','2024-11-21 01:00:00',300,3);
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_enrollments`
--

DROP TABLE IF EXISTS `course_enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_enrollments` (
  `enrollment_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `enrollment_date` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`enrollment_id`),
  UNIQUE KEY `student_id` (`student_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `course_enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_enrollments`
--

LOCK TABLES `course_enrollments` WRITE;
/*!40000 ALTER TABLE `course_enrollments` DISABLE KEYS */;
INSERT INTO `course_enrollments` VALUES
(1,1,1,'2024-11-13 03:27:59'),
(2,2,2,'2024-11-13 03:27:59');
/*!40000 ALTER TABLE `course_enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `instructor_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `instructor_id` (`instructor_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`instructor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES
(1,'Web Development Basics','Khóa học giới thiệu các khái niệm cơ bản về phát triển web.','2024-11-13 03:22:23','2024-11-20 19:51:57',1,'public/images/Top-10-Web-Development-Courses-For-Beginners--1.webp'),
(2,'Advanced Data Structures','Khóa học về các cấu trúc dữ liệu nâng cao.','2024-11-13 03:22:23','2024-11-20 19:53:11',2,'public/images/download.jpeg'),
(3,'Introduction to NestJS','This course covers the basics of building applications using NestJS framework.','2024-11-13 12:03:51','2024-11-20 19:54:20',6,'public/images/download (1).jpeg'),
(4,'Mạng máy tính 1','Khóa học cơ bản giới thiệu về mạng máy tính','2024-11-13 12:34:12','2024-11-20 19:55:04',6,'public/images/download (2).jpeg'),
(5,'Mạng máy tính 2','Khóa học nâng cao về mạng máy tính','2024-11-13 12:36:12','2024-11-20 19:55:51',6,'public/images/images.jpeg'),
(6,'Cấu trúc dữ liệu và giải thuật','Khóa học Thuật toán cung cấp đầy đủ các kiến thức về Cấu trúc dữ liệu và Giải thuật phục vụ việc học tập tại đại học, tham gia các kỳ thi lập trình, học sinh giỏi các cấp, phỏng vấn xin việc... \r\n\r\nKhóa học này yêu cầu bạn thành thạo ngôn ngữ lập trình C++ và có kỹ thuật lập trình vững chắc. ','2024-11-16 10:03:42','2024-11-16 10:10:49',6,'public/images/1731751422767.png');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_submissions`
--

DROP TABLE IF EXISTS `exercise_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise_submissions` (
  `submission_id` int(11) NOT NULL AUTO_INCREMENT,
  `exercise_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT current_timestamp(),
  `file_url` varchar(2083) DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  PRIMARY KEY (`submission_id`),
  KEY `exercise_id` (`exercise_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `exercise_submissions_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`),
  CONSTRAINT `exercise_submissions_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_submissions`
--

LOCK TABLES `exercise_submissions` WRITE;
/*!40000 ALTER TABLE `exercise_submissions` DISABLE KEYS */;
INSERT INTO `exercise_submissions` VALUES
(1,1,1,'2024-11-15 08:30:00','https://example.com/submissions/alice-html-ex1.zip',95.00,'Bài làm tốt, cần cải thiện bố cục.'),
(2,2,2,'2024-11-22 11:45:00','https://example.com/submissions/bob-css-layout.zip',88.00,'Cần chú ý đến responsive design.');
/*!40000 ALTER TABLE `exercise_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `exercise_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`exercise_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES
(1,1,'HTML Exercise 1','Tạo một trang HTML đơn giản.','2024-11-20 23:59:59','2024-11-13 03:22:59'),
(2,2,'CSS Layout Challenge','Thiết kế một bố cục bằng CSS.','2024-11-25 23:59:59','2024-11-13 03:22:59'),
(3,3,'Tree Traversal Exercise','Viết các thuật toán duyệt cây.','2024-11-30 23:59:59','2024-11-13 03:22:59');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructors` (
  `instructor_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`instructor_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES
(1,'John Doe',0),
(2,'Jane Smith',1),
(6,'Nguyễn Gia Hậu',22);
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `language_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `file_extension` varchar(5) NOT NULL,
  PRIMARY KEY (`language_id`),
  UNIQUE KEY `IDX_108420613c85f301619cf49234` (`language_id`),
  UNIQUE KEY `file_extension_UNIQUE` (`file_extension`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES
(1,'C++','.cpp'),
(2,'Typescript','.ts'),
(3,'Python','.py'),
(4,'Java','.java'),
(8,'Javascript','.js');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_comments`
--

DROP TABLE IF EXISTS `lesson_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson_comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `comment_text` text NOT NULL,
  `commented_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`comment_id`),
  KEY `lesson_id` (`lesson_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `lesson_comments_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`),
  CONSTRAINT `lesson_comments_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_comments`
--

LOCK TABLES `lesson_comments` WRITE;
/*!40000 ALTER TABLE `lesson_comments` DISABLE KEYS */;
INSERT INTO `lesson_comments` VALUES
(1,1,1,'Phần này rất rõ ràng và dễ hiểu. Cảm ơn thầy giáo!','2024-11-13 03:30:46'),
(2,1,2,'Em cần thêm ví dụ minh họa về thẻ HTML.','2024-11-13 03:30:46'),
(3,2,1,'Giải thích CSS rất chi tiết, nhưng em gặp khó khăn với responsive design.','2024-11-13 03:30:46');
/*!40000 ALTER TABLE `lesson_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_pdfs`
--

DROP TABLE IF EXISTS `lesson_pdfs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson_pdfs` (
  `pdf_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) DEFAULT NULL,
  `pdf_url` varchar(2083) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pdf_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_pdfs_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_pdfs`
--

LOCK TABLES `lesson_pdfs` WRITE;
/*!40000 ALTER TABLE `lesson_pdfs` DISABLE KEYS */;
INSERT INTO `lesson_pdfs` VALUES
(12,3,'public/coures/pdfs/1732133169889-BÃ i táº­p buá»i 2.pdf','1','2024-11-20 20:06:09'),
(14,2,'public/coures/pdfs/1732149001712-HÄ3_Nguyá»n Gia Háº­u_XÃ¢y dá»±ng website há» trá»£ há»c láº­p trÃ¬nh cho SV TDMU.pdf','a','2024-11-21 00:30:01');
/*!40000 ALTER TABLE `lesson_pdfs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_videos`
--

DROP TABLE IF EXISTS `lesson_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lesson_videos` (
  `video_id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) DEFAULT NULL,
  `video_url` varchar(2083) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`video_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `lesson_videos_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_videos`
--

LOCK TABLES `lesson_videos` WRITE;
/*!40000 ALTER TABLE `lesson_videos` DISABLE KEYS */;
INSERT INTO `lesson_videos` VALUES
(4,1,'public/coures/videos/1731520660970-2024-11-06 20-29-11.mkv',320,'Bài 1','2024-11-13 17:57:42'),
(6,6,'public/coures/videos/1731753451172',12,'Bài 1','2024-11-16 10:37:31'),
(7,2,'public/coures/videos/1732132939589-2024-10-27 06-53-29.mkv',1,'a','2024-11-20 20:02:19'),
(8,2,'public/coures/videos/1732132956502-2024-10-27 06-53-29.mkv',1,'a','2024-11-20 20:02:36'),
(9,2,'public/coures/videos/1732133062990-1409899-uhd_3840_2160_25fps.mp4',1,'a','2024-11-20 20:04:23'),
(10,3,'public/coures/videos/1732133130178-1580455-hd_1920_1080_30fps.mp4',1,'a','2024-11-20 20:05:30');
/*!40000 ALTER TABLE `lesson_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lessons` (
  `lesson_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`lesson_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES
(1,1,'HTML Basics','Giới thiệu về HTML và các thẻ cơ bản.',1,'2024-11-13 03:22:33','2024-11-13 03:22:33'),
(2,1,'CSS Fundamentals','Các khái niệm cơ bản về CSS và cách áp dụng.',2,'2024-11-13 03:22:33','2024-11-13 03:22:33'),
(3,2,'Trees and Graphs','Khám phá về cây và đồ thị.',1,'2024-11-13 03:22:33','2024-11-13 03:22:33'),
(4,2,'Dynamic Programming','Giới thiệu về lập trình động.',2,'2024-11-13 03:22:33','2024-11-13 03:22:33'),
(5,1,'Javascript Fundamentals','Các khái niệm cơ bản và cách áp dụng javascript ',3,'2024-11-13 17:05:56','2024-11-13 17:05:56'),
(6,6,'Vector & Iterator, Set, Map','- Vector & Iterator - Range-based for loop - Set, Multiset, Unordered_set - Map, Multimap, Unordered_map - Hướng dẫn một số bài tập set, map - Giao bài tập Vector & Iterator (20 bài tập) - Giao bài tập Set & Map (30 bài tập)',1,'2024-11-16 10:15:11','2024-11-16 10:15:11'),
(7,6,'Hướng dẫn bài tập Vector, Set, Map','- Hướng dẫn bài tập Vector, Set, Map',2,'2024-11-16 11:19:37','2024-11-16 11:19:37'),
(8,NULL,'PHP','Học cách viết các api trả về đơn giản bằng PHP',5,'2024-11-20 20:23:21','2024-11-20 20:23:21');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_tracker`
--

DROP TABLE IF EXISTS `login_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_tracker` (
  `login_tracker_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `user_ip_address` varchar(45) NOT NULL,
  `user_agent` varchar(512) NOT NULL,
  PRIMARY KEY (`login_tracker_id`),
  KEY `FK_7036033d2fa72b37b0b50aac51b` (`user_id`),
  CONSTRAINT `FK_7036033d2fa72b37b0b50aac51b` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_tracker`
--

LOCK TABLES `login_tracker` WRITE;
/*!40000 ALTER TABLE `login_tracker` DISABLE KEYS */;
INSERT INTO `login_tracker` VALUES
(77,22,'::ffff:192.168.1.59','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'),
(81,22,'::ffff:192.168.1.190','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'),
(82,22,'::ffff:192.168.1.69','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'),
(158,22,'::1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
/*!40000 ALTER TABLE `login_tracker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_types`
--

DROP TABLE IF EXISTS `problem_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problem_types` (
  `type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` longtext DEFAULT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_id_UNIQUE` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_types`
--

LOCK TABLES `problem_types` WRITE;
/*!40000 ALTER TABLE `problem_types` DISABLE KEYS */;
INSERT INTO `problem_types` VALUES
(1,'Toán','Xử lí các logic liên quan đến toán'),
(2,'Mảng Chuỗi','Loại bài liên quan đến xử lý mảng và chuỗi.');
/*!40000 ALTER TABLE `problem_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problems` (
  `problem_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `difficulty` enum('Easy','Medium','Hard') NOT NULL,
  `input_format` longtext DEFAULT NULL,
  `output_format` longtext DEFAULT NULL,
  `example_input` longtext DEFAULT NULL,
  `example_output` longtext DEFAULT NULL,
  `notes` longtext DEFAULT NULL,
  `time_limit` int(10) NOT NULL DEFAULT 1,
  `memory_limit` int(10) NOT NULL DEFAULT 256,
  `total_submissions` int(10) NOT NULL DEFAULT 0,
  `total_correct` int(10) NOT NULL DEFAULT 0,
  `point` int(10) NOT NULL DEFAULT 1,
  `public_time` timestamp NOT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `rank_point` float DEFAULT NULL,
  UNIQUE KEY `problem_id_UNIQUE` (`problem_id`),
  KEY `fk_problems_problem_type` (`type_id`),
  CONSTRAINT `fk_problems_problem_type` FOREIGN KEY (`type_id`) REFERENCES `problem_types` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problems`
--

LOCK TABLES `problems` WRITE;
/*!40000 ALTER TABLE `problems` DISABLE KEYS */;
INSERT INTO `problems` VALUES
(221,'Bài toán cộng hai số','là lá la','Easy','a a aa','a a a a','10 5','2 5','',2,128,8,3,100,'2024-11-14 03:16:00',1,99),
(222,'aaa','sklajdfn','Medium','sdf','sdf','sdf','sdf','sdf',2,128,0,0,5,'2024-11-14 03:16:00',1,100),
(224,'Bài toán đồng xu','a','Medium','','','','','',2,128,5,4,5,'2024-11-21 01:00:00',2,98.5),
(225,'Bài toán cái bánh','a','Hard','','','','','',2,128,4,4,5,'2024-11-21 01:00:00',2,98.5),
(226,'Lập trình không khó','abc','Easy','','','','','',2,128,6,0,5,'2024-11-21 01:00:00',1,100);
/*!40000 ALTER TABLE `problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES
(1,'Alice Nguyen','alice.nguyen@example.com'),
(2,'Bob Tran','bob.tran@example.com');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submissions` (
  `submission_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `problem_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `language_id` int(10) unsigned NOT NULL,
  `source_code` longtext DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `submission_time` timestamp NULL DEFAULT current_timestamp() COMMENT '\\n',
  `execution_time` float DEFAULT 0,
  `memory_usage` float DEFAULT 0,
  PRIMARY KEY (`submission_id`),
  UNIQUE KEY `submission_id_UNIQUE` (`submission_id`),
  KEY `fk_submissions_language_id_idx` (`language_id`),
  KEY `fk_submissions_problem_id_idx` (`problem_id`),
  KEY `fk_submissions_user_id_idx` (`user_id`),
  CONSTRAINT `fk_submissions_language_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_submissions_problem_id` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`problem_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_submissions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES
(172,221,22,1,'#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}\n',1,'2024-11-14 00:52:33',883.701,50.9929),
(173,221,28,1,'#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}\n',1,'2024-11-14 02:55:22',817.997,46.4001),
(174,221,22,1,'#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}\n',1,'2024-11-14 02:58:19',786.253,47.3272),
(175,221,30,1,'#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}\n',1,'2024-11-14 02:59:17',803.222,47.9157),
(176,221,30,1,'#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint N, M;\nvector<vector<int>> adj_matrix;\nvector<pair<int, int>> edge_list;\nvector<vector<int>> adj_list;\n\nvoid enter_adjacency_matrix() {\n  cin >> N >> M;\n\n  adj_matrix = vector<vector<int>>(N + 1, vector<int>(N + 1, 0));\n\n  for (int i = 1; i <= M; i++) {\n    int u, v;\n    cin >> u >> v;\n\n    adj_matrix[u][v]++;\n    adj_matrix[v][u]++; // neu do thi co huong thi khong co dong nay\n  }\n}\n\nvoid enter_edge_list() {\n  cin >> N >> M;\n  for (int i = 1; i <= M; i++) {\n    int u, v;\n    cin >> u >> v;\n\n    edge_list.push_back({u, v});\n  }\n}\n\nvoid enter_adjacency_list() {\n  cin >> N >> M;\n  adj_list.resize(N + 1);\n  for (int i = 1; i <= M; i++) {\n    int u, v;\n    cin >> u >> v;\n\n    adj_list[u].push_back(v);\n    adj_list[v].push_back(u);\n  }\n}\n\nvoid show_adjacency_matrix() {\n  for (int i = 1; i <= N; i++) {\n    for (int j = 1; j <= N; j++) {\n      cout << adj_matrix[i][j] << \" \";\n    }\n    cout << endl;\n  }\n}\n\nvoid show_edge_list() {\n  for (int i = 0; i < M; i++)\n    cout << edge_list[i].first << \" \" << edge_list[i].second << endl;\n}\n\nvoid show_adjacency_list() {\n  for (int i = 0; i < N; i++) {\n    for (int x : adj_list[i]) {\n      cout << x << \" \";\n    }\n    cout << endl;\n  }\n}\nint main() {\n  /*enter_adjacency_matrix();*/\n  /*show_adjacency_matrix();*/\n\n  /*enter_edge_list();*/\n  /*show_edge_list();*/\n\n  /*enter_adjacency_list();*/\n  /*show_adjacency_list();*/\n  return 0;\n}\n',0,'2024-11-20 21:39:32',877.353,47.5317),
(177,224,22,1,'\n#include <iostream>\n#include <limits>\n#include <vector>\n\nint main() {\n  std::vector<int> numbers;\n  int num;\n\n  // Nhập số nguyên từ bàn phím\n  while (std::cin >> num) {\n    numbers.push_back(num);\n  }\n\n  // Tìm số lớn nhất\n  int maxNumber = std::numeric_limits<int>::min();\n  for (int number : numbers) {\n    if (number > maxNumber) {\n      maxNumber = number;\n    }\n  }\n\n  // Xuất số lớn nhất\n  std::cout << maxNumber << std::endl;\n}\n',0,'2024-11-21 01:49:18',716.304,52.2414),
(180,224,22,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',1,'2024-11-21 01:56:42',498.292,53.6124),
(181,225,22,3,'\nn = int(input())\nprint(n)\n\n',1,'2024-11-21 01:56:59',19.7439,54.5253),
(182,226,22,4,'\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        System.out.println(n);\n    }\n}\n\n',0,'2024-11-21 01:57:28',0,0),
(183,226,22,2,'\nconst n = parseInt(prompt(\"Enter a number:\")!);\nconsole.log(n);\n\n',0,'2024-11-21 01:57:51',0,0),
(184,221,30,1,'#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}\n',1,'2024-11-21 02:58:45',572.988,49.4622),
(185,221,30,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',0,'2024-11-21 02:59:04',555.415,49.9167),
(186,226,30,3,'\nn = int(input())\nprint(n)\n\n',0,'2024-11-21 02:59:54',0,0),
(187,226,30,3,'\nn = int(input())\nprint(n)\n\n',0,'2024-11-21 03:00:16',0,0),
(188,226,30,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',0,'2024-11-21 03:00:23',528.157,49.9241),
(189,224,30,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',1,'2024-11-21 03:00:36',575.171,49.9273),
(190,225,30,3,'\nn = int(input())\nprint(n)\n\n',1,'2024-11-21 03:00:57',25.723,50.5593),
(191,224,31,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',1,'2024-11-21 03:01:37',547.435,50.7695),
(192,225,31,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',1,'2024-11-21 03:01:46',565.343,50.5825),
(193,226,31,1,'\n#include <iostream>\nusing namespace std;\n\nint main() {\n  int n;\n  cin >> n;\n  cout << n << endl;\n  return 0;\n}\n',0,'2024-11-21 03:01:53',531.109,51.0622),
(194,221,30,1,'#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}\n',1,'2024-11-24 03:30:38',603.873,49.4125);
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcases`
--

DROP TABLE IF EXISTS `testcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testcases` (
  `testcase_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `problem_id` int(10) unsigned NOT NULL,
  `input` longtext DEFAULT NULL,
  `expected_output` longtext DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`testcase_id`),
  KEY `fk_testcases_problem_id_idx` (`problem_id`),
  CONSTRAINT `fk_testcases_problem_id` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`problem_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcases`
--

LOCK TABLES `testcases` WRITE;
/*!40000 ALTER TABLE `testcases` DISABLE KEYS */;
INSERT INTO `testcases` VALUES
(90,221,'10 5','15','2024-11-14','2024-11-14'),
(91,221,'20 0','20','2024-11-14','2024-11-14'),
(92,221,'1 1','2','2024-11-14','2024-11-14'),
(93,224,'1','1','2024-11-21','2024-11-21'),
(94,225,'1','1','2024-11-21','2024-11-21'),
(95,226,'','1','2024-11-21','2024-11-21');
/*!40000 ALTER TABLE `testcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profiles` (
  `last_name` varchar(20) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `problems_solved` int(10) NOT NULL DEFAULT 0,
  `rank_points` int(10) NOT NULL DEFAULT 0,
  `total_points` int(10) NOT NULL DEFAULT 0,
  `about` longtext DEFAULT NULL,
  `total_submission` int(10) NOT NULL DEFAULT 0,
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES
('Hậu','Nguyễn Gia',25,0,305,'',50,22),
(NULL,NULL,0,0,0,NULL,0,23),
(NULL,NULL,0,0,0,NULL,0,24),
(NULL,NULL,0,0,0,NULL,0,25),
(NULL,NULL,0,0,0,NULL,0,26),
(NULL,NULL,0,0,0,NULL,0,27),
(NULL,NULL,3,0,120,NULL,6,28),
(NULL,NULL,0,0,0,NULL,0,29),
(NULL,NULL,16,0,230,'',23,30),
(NULL,NULL,3,0,15,NULL,5,31);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tokens`
--

DROP TABLE IF EXISTS `user_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tokens` (
  `user_token_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `access_token` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_token_id`),
  KEY `FK_9e144a67be49e5bba91195ef5de` (`user_id`),
  CONSTRAINT `FK_9e144a67be49e5bba91195ef5de` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tokens`
--

LOCK TABLES `user_tokens` WRITE;
/*!40000 ALTER TABLE `user_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(45) NOT NULL,
  `role` enum('student','admin') NOT NULL DEFAULT 'student',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(22,'nguyengiahau2004@gmail.com','$2b$10$jEUpxsnAcC6pMCVzRh0nBO9KC078CYemKmyaByUKedcYty8x6rjVK','nguyengiahau','admin'),
(23,'nguyengiahau0508@gmail.com','$2b$10$do5LDXqsyhUrwO2Yeu8a1ejI.QJJfXr3gE8FWRrxGu30hlhbCINg2','nguyengiahau0508','student'),
(24,'tranthikimhuong0508@gmail.com','$2b$10$vwYTy650W1TxFn5FyZdnAOtsAyRiCN1jvU0LCD62jF14iFuP3VKR6','tranthikimhuong','student'),
(25,'nguyengiahau2222@gmail.com','$2b$10$wB6KbxkPnaW5CoT6Csu.S.gvTN/u9hTFOrDIqico.3eDMKMY/rHQ.','nguyengiahau2222','student'),
(26,'nguyengiahau22224@gmail.com','$2b$10$HM9rue4//OxsSGNnsgyYTum4ei1MTBGaWC6C7wGfGlyCgTxtNe4ya','nguyengiahau22224','student'),
(27,'nguyengiahau2004444444444@gmail.com','$2b$10$Us8nJtfr3CXCrfn2sVySC.dDi7MP6kVAhT3TYe2xCu.1ishFLZoZO','nguyengiahau200444444','student'),
(28,'nguyengiahau05082004@gmail.com','$2b$10$Vwqg4G1nGAb6rFONSFunkOdS7t8NNWV6cBRQjasLmmig/1q1cRpWC','nguyengiahau0082004','student'),
(29,'tranthikimhuong2004@gmail.com','$2b$10$8zBjOFLCRmxJZpAlEWmLe.ctvWsi6BlCnyY59nhkv7Viq3nNpzTQq','tranthikimhuong2004','student'),
(30,'abc@gmail.com','$2b$10$yqouYWT7ObxC/iA8BKT1l.AIRUDpXrzg7WbUK09aScmVikc/AaaxC','abc','student'),
(31,'xyz@gmail.com','$2b$10$9W4PG/RSqn9VDEJboORyu.XsQGNGVLbBkt/MuaaRYcgKXSN9heD5.','xyz','student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'code_rank_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-11-29  9:49:11
