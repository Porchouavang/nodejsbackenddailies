-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2024 at 03:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursefullstack`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `updated_at` varchar(30) DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone`, `updated_at`, `created_at`) VALUES
(2, 'porchoua', 'admin3@gmail.com', '$2a$10$MKzkArDMPlX.MqcXXxQjk.elrN2Rp67/tRXQV7R55ENX8bE9Fonx2', '0207658955', NULL, '2024-08-16'),
(3, 'porcsfhoua', 'admin3@gmail.com', '$2a$10$NAgoR1e6S2r.cis7h9eB1eMEosaFWvdOVrQij1nR5ZIzCdni5z13i', '020765dd8955', NULL, '2024-08-16'),
(4, 'porcsfhoua', 'admin3@gmail.com', '$2a$10$p90ESwkNQDBPRzcQANhzjenCcklNnNyBBNgcrTm8EJiFG5s7mKZHG', '0207s65dd8955', NULL, '2024-08-16'),
(5, 'your_username', 'your_email@example.com', '$2a$10$e9EL5y8i6GW42wFNJ79DfO9ZDMeNjJMgpnkzAzdl5eupIbEpk5MBm', 'your_phone_num', NULL, '2024-08-16'),
(6, 'y12345', '123m@gmail.com', '$2a$10$E6BPNU4mI0BibaPvmMfTbe1zZmUKiiOvDM/dPYlogQ8yv6qmAgFJC', '12345r', NULL, '2024-08-16'),
(7, 'y12s345', '123m@gsmail.com', '$2a$10$A0S8q2/iKRlTSMf8s4Zvr.DMkQRihi1xv02URoIYfPdERD/hMZtbG', '12s345r', NULL, '2024-08-19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
