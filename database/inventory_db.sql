-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Jan 2026 pada 16.49
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Laptop ASUS ROG', 15000000.00, 3, '2026-01-19 14:48:18', '2026-01-19 14:48:18'),
(2, 'Mouse Logitech G502', 250000.00, 18, '2026-01-19 14:48:18', '2026-01-19 17:43:27'),
(3, 'Keyboard Mechanical Keychron', 800000.00, 10, '2026-01-19 14:48:18', '2026-01-19 14:48:18'),
(4, 'Monitor LG 27 inch', 3500000.00, 8, '2026-01-19 14:48:18', '2026-01-19 14:48:18'),
(5, 'Headset HyperX Cloud', 450000.00, 15, '2026-01-19 14:48:18', '2026-01-19 14:48:18'),
(9, 'Mouse Rexus', 90000.00, 15, '2026-01-20 15:39:03', '2026-01-20 15:39:03'),
(10, 'Monitor Samsung', 300000.00, 0, '2026-01-20 15:41:36', '2026-01-20 15:42:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`) VALUES
(1, 'Admin', '2026-01-19 14:48:18'),
(2, 'Seller', '2026-01-19 14:48:18'),
(3, 'Pelanggan', '2026-01-19 14:48:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(15,2) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Budi Santoso', 'budi@example.com', '$2a$12$V3lq2mngKVv.jFZ7JCuHp.H5TcusUr9KTKWMkmvT2xl.AFHy2Reli', 3, '2026-01-19 14:48:18', '2026-01-20 11:42:01'),
(2, 'Ani Wijaya', 'ani@example.com', '$2a$12$V3lq2mngKVv.jFZ7JCuHp.H5TcusUr9KTKWMkmvT2xl.AFHy2Reli', 3, '2026-01-19 14:48:18', '2026-01-20 15:43:34'),
(3, 'Dewi Admin', 'dewi@example.com', '$2a$12$V3lq2mngKVv.jFZ7JCuHp.H5TcusUr9KTKWMkmvT2xl.AFHy2Reli', 1, '2026-01-19 14:48:18', '2026-01-19 17:36:02'),
(4, 'Rudi Seller', 'rudi@example.com', '$2a$12$V3lq2mngKVv.jFZ7JCuHp.H5TcusUr9KTKWMkmvT2xl.AFHy2Reli', 2, '2026-01-19 14:48:18', '2026-01-19 17:36:02'),
(5, 'Siti Customer', 'siti@example.com', '$2a$12$V3lq2mngKVv.jFZ7JCuHp.H5TcusUr9KTKWMkmvT2xl.AFHy2Reli', 3, '2026-01-19 14:48:18', '2026-01-19 17:36:02'),
(6, 'Admin', 'admin@example.com', '$2a$12$zUfm7Bf0np3/zwXYgryZu.RYg5qoEv64oMwl3qpUSf99gXJamA.qq', 1, '2026-01-19 17:16:05', '2026-01-19 17:24:28'),
(7, 'Seller', 'seller@example.com', '$2a$12$vb0Rhdf7WwCq/zS1rfQzHuoHQErle4RMCnJqsObjPHZFKBVBZuGHC', 2, '2026-01-19 17:17:06', '2026-01-19 17:25:03'),
(8, 'Customer', 'customer@example.com', '$2a$12$E6XGT7JVdm6.0ESFU1i42.EdDFacOJD4BvjcWOR2e1LLASYfxyKK6', 2, '2026-01-19 17:17:51', '2026-01-19 17:25:23');

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `v_low_stock_products`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `v_low_stock_products` (
`id` int(11)
,`name` varchar(200)
,`price` decimal(15,2)
,`stock` int(11)
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `v_users_with_roles`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `v_users_with_roles` (
`id` int(11)
,`name` varchar(100)
,`email` varchar(100)
,`role_id` int(11)
,`role_name` varchar(50)
,`created_at` timestamp
,`updated_at` timestamp
);

-- --------------------------------------------------------

--
-- Struktur untuk view `v_low_stock_products`
--
DROP TABLE IF EXISTS `v_low_stock_products`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_low_stock_products`  AS SELECT `products`.`id` AS `id`, `products`.`name` AS `name`, `products`.`price` AS `price`, `products`.`stock` AS `stock`, `products`.`created_at` AS `created_at` FROM `products` WHERE `products`.`stock` < 10 ;

-- --------------------------------------------------------

--
-- Struktur untuk view `v_users_with_roles`
--
DROP TABLE IF EXISTS `v_users_with_roles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_users_with_roles`  AS SELECT `u`.`id` AS `id`, `u`.`name` AS `name`, `u`.`email` AS `email`, `u`.`role_id` AS `role_id`, `r`.`name` AS `role_name`, `u`.`created_at` AS `created_at`, `u`.`updated_at` AS `updated_at` FROM (`users` `u` join `roles` `r` on(`u`.`role_id` = `r`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_name` (`name`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_transactions_product` (`product_id`),
  ADD KEY `idx_transactions_date` (`transaction_date`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_role` (`role_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_transactions_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
