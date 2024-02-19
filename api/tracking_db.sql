-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2023 at 02:53 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tracking_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` int(11) NOT NULL,
  `tracking_number` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `sender_name` varchar(100) DEFAULT NULL,
  `receiver_name` varchar(100) DEFAULT NULL,
  `service_type` varchar(50) DEFAULT NULL,
  `image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipments`
--

INSERT INTO `shipments` (`id`, `tracking_number`, `status`, `location`, `sender_name`, `receiver_name`, `service_type`, `image`) VALUES
(1, 'ABC123', 'In Transit', 'Bangkok', 'John Doe', 'Jane Smith', 'Express', ''),
(2, 'DEF456', 'Out for Delivery', 'New York', 'Alice Johnson', 'Bob Davis', 'Standard', ''),
(3, 'GHI789', 'Delivered', 'Los Angeles', 'Mike Brown', 'Emily White', 'Express', ''),
(4, 'JKL012', 'In Transit', 'London', 'David Williams', 'Sarah Miller', 'Standard', ''),
(5, 'MNO345', 'Out for Delivery', 'Paris', 'Oliver Taylor', 'Sophia Clark', 'Express', ''),
(6, 'PQR678', 'In Transit', 'Tokyo', 'Ethan Lee', 'Isabella Hall', 'Standard', ''),
(7, 'STU901', 'Delivered', 'Berlin', 'James Martinez', 'Emma Young', 'Express', ''),
(8, 'VWX234', 'In Transit', 'Sydney', 'Liam Anderson', 'Ava Harris', 'Standard', ''),
(9, 'YZA5677', 'Out for Delivery', 'Toronto', 'Noah Martinez', 'Mia Robinson', 'Express', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
