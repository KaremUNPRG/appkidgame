-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-08-2022 a las 01:02:09
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appkidgame`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competencia`
--

CREATE TABLE `competencia` (
  `Codigo` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Link` varchar(200) DEFAULT NULL,
  `CodigoUsuario` int(10) UNSIGNED NOT NULL,
  `Vigente` bit(1) NOT NULL DEFAULT b'1',
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `FechaInicio` datetime NOT NULL,
  `FechaTermino` datetime NOT NULL,
  `Clave` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `competencia`
--

INSERT INTO `competencia` (`Codigo`, `Nombre`, `Link`, `CodigoUsuario`, `Vigente`, `Fecha`, `FechaInicio`, `FechaTermino`, `Clave`) VALUES
(2, 'Torneo de Matematica', NULL, 2, b'0', '2022-08-12 00:09:57', '2022-08-13 13:59:00', '2022-08-15 13:59:00', NULL),
(3, 'Torneo de Matematica', NULL, 2, b'1', '2022-08-12 00:22:06', '2022-08-13 13:59:00', '2022-08-15 13:59:00', NULL),
(4, 'Mundial de los Juegos', NULL, 2, b'1', '2022-08-12 01:20:51', '2022-08-24 13:20:00', '2022-08-24 14:20:00', '123'),
(5, 'Juega y aprende', NULL, 2, b'1', '2022-08-12 01:23:14', '2022-08-25 01:22:00', '2022-08-25 02:23:00', NULL),
(6, 'Estudiar jugando', NULL, 2, b'0', '2022-08-12 01:24:12', '2022-08-26 14:24:00', '2022-08-26 15:24:00', NULL),
(7, 'Estudiar jugando', NULL, 2, b'0', '2022-08-12 01:24:28', '2022-08-26 14:24:00', '2022-08-26 15:24:00', NULL),
(8, 'Elige el camino', NULL, 2, b'1', '2022-08-12 01:26:36', '2022-08-26 01:26:00', '2022-08-26 02:26:00', NULL),
(9, 'Concurso', NULL, 2, b'1', '2022-08-12 23:07:39', '2022-08-13 13:59:00', '2022-08-15 13:59:00', '1234567890'),
(10, 'Concurso Aprende y gana', NULL, 2, b'0', '2022-08-12 23:47:42', '2022-08-12 23:47:00', '2022-08-12 23:47:00', '2311'),
(11, 'Mundial de los Juegos', NULL, 2, b'0', '2022-08-12 23:53:12', '2022-08-18 23:53:00', '2022-08-26 23:53:00', NULL),
(12, 'Concurso de Ingles', NULL, 3, b'0', '2022-08-13 22:38:31', '2022-08-13 22:38:00', '2022-08-14 22:38:00', '1234'),
(13, 'Concurso de Matemática', NULL, 3, b'0', '2022-08-13 22:39:51', '2022-08-14 22:39:00', '2022-08-14 22:39:00', NULL),
(14, 'Torneo de Matematica', NULL, 3, b'1', '2022-08-13 23:21:14', '2022-08-13 13:59:00', '2022-08-15 13:59:00', NULL),
(15, 'JUEGA AL LIMITE UNPRG', NULL, 3, b'1', '2022-08-13 23:52:40', '2022-08-27 02:52:00', '2022-08-28 23:52:00', '567'),
(16, 'Aprende y gana', NULL, 2, b'0', '2022-08-15 11:56:17', '2022-08-15 11:55:00', '2022-08-16 11:55:00', NULL),
(17, 'Torneo de Matematica', NULL, 2, b'0', '2022-08-17 22:42:56', '2022-08-13 13:59:00', '2022-08-15 13:59:00', NULL),
(18, 'Juego', NULL, 2, b'1', '2022-08-17 23:23:08', '2022-08-26 08:23:00', '2022-08-19 04:23:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credencial`
--

CREATE TABLE `credencial` (
  `Codigo` int(10) UNSIGNED NOT NULL,
  `CodigoUsuario` int(10) UNSIGNED NOT NULL,
  `AccessToken` varchar(255) NOT NULL,
  `RefreshToken` varchar(150) DEFAULT NULL,
  `IdToken` varchar(255) DEFAULT NULL,
  `ExpiresIn` int(10) UNSIGNED DEFAULT NULL,
  `TokenType` varchar(10) DEFAULT NULL,
  `Created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `credencial`
--

INSERT INTO `credencial` (`Codigo`, `CodigoUsuario`, `AccessToken`, `RefreshToken`, `IdToken`, `ExpiresIn`, `TokenType`, `Created`) VALUES
(3, 3, 'ya29.A0AVA9y1sTEzejtbFVnAshDzB0vySkL5OxqwpJ0L0xYVqLHw0JYJ7VNaK9WEu8YTuEQZAozrSbdudlZQXzqwH5FAtMdqKb9PPlMgIe9vJBrr5dhto_-8Ub0M1LaSMQR43FdffYpoFxOdOZ5eavS9kbPH1Eu94JaCgYKATASATASFQE65dr8B2RmeLJin8OocZ6LTN86MQ0163', NULL, NULL, 3599, NULL, '2022-08-09 00:43:38'),
(4, 3, 'ya29.A0AVA9y1v6d1llVbTtUA21AOOVTwpk_QbwDE8WCuCsy-GFU--PcqzUx1GOMMnNIpQjnY4VgD4VACoRNNJTyanU68UBnAxtdMqToD4JoUmimE059KxyekxYvhW0iRh1T2EUm697rxtD-uPAgCptS0YtUzEGUBAiaCgYKATASATASFQE65dr8jz21oQDm7LiSsk_wFMcauQ0163', NULL, NULL, 3599, NULL, '2022-08-09 00:44:27'),
(5, 2, 'ya29.A0AVA9y1vhXwlI698TPjLrmimDDk4BHLm58cZjI55u8QCuGKmgfDtg2ftMtAkoDFvDMQSvy-VAZxP1kHY3H6U63RJBRJn1_hzki_F8BR0DbPQq-b0gLSxPDot6VhINHm3vltL6Jg_YJ_aj2sBORIF2yFtpd9reUAaCgYKATASATASFQE65dr8PvJhb5WusX-fXoEb_Mz9lw0165', NULL, NULL, 3599, NULL, '2022-08-11 00:05:54'),
(6, 2, 'ya29.A0AVA9y1uoGR8RgVVnjuvF3LFqJgvpHUtvbMis2j_4McIrUXLdMxLe90_l0KpK3Fr3Ajsc0-WztYZp0eRikscdS9U1GVbV1LmBg6WqG_9XrvRVjjeLEymvFYG7imZ2T07jkA75XsQTmCIrF80whMgiqH3lAIVllgaCgYKATASATASFQE65dr8lIm3JuS015TpeB4HezeSQg0165', NULL, NULL, 3599, NULL, '2022-08-11 23:05:13'),
(7, 2, 'ya29.A0AVA9y1tSvPDzC1Fdet_UMFFLL5IzCBsO1LJaB-I9DUlb3e0MRm9OjLBM7jrZ0waOZa5VWsmNfVtqPWUkUhrNiGvBEKfODq-xGeglwqO6IUPYL6QVkrdi24WD1p_QxCQxiYiSDq5o2RxILvO2K6IW2H86V41nUwaCgYKATASATASFQE65dr8mRVIeVqgPTm6S1jvUSZwww0165', NULL, NULL, 3599, NULL, '2022-08-11 23:15:16'),
(8, 2, 'ya29.A0AVA9y1v5mqaaZdJy60ldZFWtwhznD9LlvqXKzyBg6o5nNo0OuLDlVvssee55_Zft-xKmKA4K-T9Zg3_lxXXGSFTqZAW1L7xCa-0qz3V8VXZmyjRKpV68O8TpvBQcPImV8rknuDcaUrz9xUA1SfoGo7Gnvh4t2AaCgYKATASATASFQE65dr8k5ie-PJD2RsIfEhvQS0wGQ0165', NULL, NULL, 3599, NULL, '2022-08-11 23:21:26'),
(9, 2, 'ya29.A0AVA9y1skQXNvswGM48ELEZV_osSsnWlkAlWkvAg45U35ugkQDhFF2MfH4qm2cWEywxmrCQ-8VTjezaZuS9xqRzxi7u7hL0H2ceWU1MVDS3WGQmo1LH1PVlk_6dG1WlR9jb0oDyoDTRgOvz2mV26IPYVjcNgmGwaCgYKATASATASFQE65dr87aBTQMnGe3YnZdZoldiOHQ0165', NULL, NULL, 3599, NULL, '2022-08-11 23:22:13'),
(10, 2, 'ya29.A0AVA9y1vUTFTyumdbmqo7JBXsRuPlaoJIDqFZFA-4HJ8tQQJbR6BjQz0c2JNfLELaWbhoa-vgNEimr58G-QTB-3x6JqNZrDbWB3Ey5ZY01OwCE59ge6XUT2CWoA9IJ8OJTns_eD8WidsDgkHF4L69770Z66UPMwaCgYKATASATASFQE65dr8x-wgPY-GoxFzwMFfCh6rlw0165', NULL, NULL, 3598, NULL, '2022-08-12 23:02:22'),
(11, 2, 'ya29.A0AVA9y1vpqVpnZ28ivcVDfDzyhRtNmx9PZNhwwo-mNx8zS85Cgl7ArV2pDC_jXyqTh5O6egF4vj5_Me___maEXS-txZWU6VCviyS2MD3F9zN6cBSeEqsx9nWEQWONw4nt0amJaJmeCBb2rhsp9MU2H9A2kSDpaCgYKATASATASFQE65dr8hapterMBr1FuTnSEZrgGeg0163', NULL, NULL, 3599, NULL, '2022-08-13 22:28:34'),
(12, 3, 'ya29.A0AVA9y1v6wMrUNfuxJ7iD3-0VxOsv0ZLSunxv08fvxBwC9Px5gA4nFMllEUNIgDh84l9_R1VdkzmTMR0C4kITFCSxFxGI1lTyUGyZl6PtGX-MZP88siAIuc-rQGt7Mxom62kY672cymaH5ShJPFoPu3aMvCk0aCgYKATASATASFQE65dr88ULDEi6iBvgcdpDEqWevgw0163', NULL, NULL, 3599, NULL, '2022-08-13 22:36:01'),
(13, 3, 'ya29.A0AVA9y1skR0gC-BmoX1XUtLhDPw7TLEHn7k1PAE8tIjTqDpCMBw69TSjjLzAUPdNFgd_IGOrcvJ9XB4CvVANn1DbhJl4Pk1ov0dAaavvxDt-U7jdXMkcCd5kvbeJIZkKgYpME4EoQrndOreMDnlGI_szXCVXkaCgYKATASATASFQE65dr8yB9YmuFP_q8XQ-FD25pBVA0163', NULL, NULL, 3599, NULL, '2022-08-13 23:19:23'),
(14, 3, 'ya29.A0AVA9y1sb3bDdJ9s1cF5Z-4CYo4TyOCEDWa5aEaUtBeAXW_WughWog4Hyi-yt9zp5P2DYqIMPbG4YtwUQia59dBKtRtOyXv7q6UajUhH9NZPjDGQqAzks6dOD-EGgge7BKSMmKtZkgLE0oC4jjCTH2T_8nqEUaCgYKATASATASFQE65dr8iJinadp5BQJFZp4tZUI5iw0163', NULL, NULL, 3599, NULL, '2022-08-14 00:04:46'),
(15, 2, 'ya29.A0AVA9y1tb_qVcLRo19rv_TQ4-EV31b1kTwW8ccdhg-U6MSv3k3d3vcMgGNnX9Au0nmqgVqd8qvWE8M-BboP2dwHorAC84eV26RIbo64kM-AC5NJyTuHTPw5zEjpZSbkIM-4jN8QH0A-u_0LdL8hD-0zhIBlQyWQaCgYKATASATASFQE65dr8o_RpUSpNCtqu0w7ObhCqpw0165', NULL, NULL, 3598, NULL, '2022-08-15 11:53:48'),
(16, 2, 'ya29.A0AVA9y1vfWaSp8WmvNfG5NfRY8AIa3Dn9DfM59gtKIeunKJ4JNRGavCDx-N0GYvYnrZIywAn40NMrkqE6DGEaVQjSf8rNH0uXFX6mdtVGHMO3qBKNaVKKauLc4uMRz-oV-icp8DPEcDvBJGr9SThs-H338hgZ-waCgYKATASATASFQE65dr8QasXSzs3PoBlELvyaz8_cw0165', NULL, NULL, 3598, NULL, '2022-08-17 21:37:49'),
(17, 2, 'ya29.A0AVA9y1ucd-iVw42EkdQnX0zEmKU7IeQfS7ZuQdqmV_OlFLsQA6pR02oQa5h9m8hZMYBaGZ8WKky5Zu-PlV05SLH-nipYaS7dtvtVkbqQn9iX0W08UHANZfg5DbyP6-rl761pzwYrVileehrWsOHKWkvbVWsVigaCgYKATASATASFQE65dr89UlU_TYfdqzjbvI16KiPXQ0165', NULL, NULL, 3599, NULL, '2022-08-17 21:42:41'),
(18, 2, 'ya29.A0AVA9y1tEExyNsQaXRpRNOVFk_PHCLlDqgthe1llhQDXzIt0qyUWj9mKrYXsyhtviezBKRzJnqB4Od7ITetkVdGbTroqEJPwG_iMloOIj2SKFI9Lo6hjZAVrZbHNVR8CtszGPuiRtsQrleNZpKV67lsOTlU2tnQaCgYKATASATASFQE65dr8YsFe6y4Kg19P0Pd2Sjoh7g0165', NULL, NULL, 3557, NULL, '2022-08-17 23:12:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Codigo` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `Apellido` varchar(30) DEFAULT NULL,
  `Email` varchar(80) DEFAULT NULL,
  `Vigente` bit(1) NOT NULL DEFAULT b'1',
  `Sexo` bit(1) DEFAULT NULL,
  `CodigoPais` smallint(5) UNSIGNED DEFAULT NULL,
  `IdGoogle` varchar(50) DEFAULT NULL,
  `Avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Codigo`, `Nombre`, `Apellido`, `Email`, `Vigente`, `Sexo`, `CodigoPais`, `IdGoogle`, `Avatar`) VALUES
(2, 'Ricardo Antonio', 'Castillo Flores', 'scastillofl@unprg.edu.pe', b'1', NULL, NULL, '115460688301571550736', 'https://lh3.googleusercontent.com/a-/AFdZucpZTu19Os2E1nuCUEHXXJrCkOIZIJDffHHgtG49=s96-c'),
(3, 'Noely', 'Moscol', 'noeuk244@gmail.com', b'1', NULL, NULL, '114747495562042171438', 'https://lh3.googleusercontent.com/a/AItbvmmPtYNuTXhKieLd-KkSceVP8rB82ZyK4H6h-ajJ=s96-c');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `competencia`
--
ALTER TABLE `competencia`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `competencia_FK` (`CodigoUsuario`);

--
-- Indices de la tabla `credencial`
--
ALTER TABLE `credencial`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `credencial_FK` (`CodigoUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `competencia`
--
ALTER TABLE `competencia`
  MODIFY `Codigo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `credencial`
--
ALTER TABLE `credencial`
  MODIFY `Codigo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Codigo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `competencia`
--
ALTER TABLE `competencia`
  ADD CONSTRAINT `competencia_FK` FOREIGN KEY (`CodigoUsuario`) REFERENCES `usuario` (`Codigo`);

--
-- Filtros para la tabla `credencial`
--
ALTER TABLE `credencial`
  ADD CONSTRAINT `credencial_FK` FOREIGN KEY (`CodigoUsuario`) REFERENCES `usuario` (`Codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
