-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 31, 2020 at 08:19 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `usr_reg`
--

CREATE TABLE `usr_reg` (
  `usr_id` int(11) NOT NULL,
  `usr_name` varchar(100) DEFAULT NULL,
  `usr_pass` varchar(255) DEFAULT NULL,
  `usr_email` varchar(255) DEFAULT NULL,
  `usr_token` varchar(200) NOT NULL,
  `usr_rem` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usr_reg`
--

INSERT INTO `usr_reg` (`usr_id`, `usr_name`, `usr_pass`, `usr_email`, `usr_token`, `usr_rem`) VALUES
(1, 'nayan ab', 'e10adc3949ba59abbe56e057f20f883e', 'n@ab.tr', '', 0),
(2, 'hemendra verma', 'e10adc3949ba59abbe56e057f20f883e', 'hemendra@gmail.kj', 'd2ViVmlsbGVlOjI6YWFlZDVkMzdhMzAwNGE1MGFkNTkwOTYzNjcwNjkxZjg=', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usr_reg`
--
ALTER TABLE `usr_reg`
  ADD PRIMARY KEY (`usr_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usr_reg`
--
ALTER TABLE `usr_reg`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
