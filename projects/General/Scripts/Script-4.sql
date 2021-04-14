USE testExpress

-- CREATE TABLE promet_header (
--     `shifra` varchar(200) NOT NULL,
--     `brojNaStavka` int,
--     `partner` varchar(200),
--     `datum` date,
--     `iznos` bigint,
--     PRIMARY KEY (`shifra`),
--     FOREIGN KEY (`partner`) REFERENCES delovni_partneri(`shifra`),
--     FOREIGN KEY (`brojNaStavka`) REFERENCES stavki(`broj`)
-- );

-- INSERT INTO `stavki` (`shifra`, `broj`, `artikal`, `kolicina`,`cena`, `iznos`) VALUES
-- ('1665', 14, '3252UOI3', 2, 220, 440);

-- INSERT INTO `promet_header` (`shifra`, `brojNaStavka`, `partner`, `datum`,`iznos`) VALUES
-- ('112412', 12, '1215043', '2021-03-28', 900);

-- CREATE TABLE stavki (
--     `shifra` varchar(100) NOT NULL,
--     `broj` int,
--     `rbs` int NOT NULL AUTO_INCREMENT,
--     `artikal` varchar(200),
--     `kolicina` bigint,
--     `cena` bigint,
--     `iznos` bigint,
--     PRIMARY KEY (`shifra`),
--     KEY (`broj`),
--     KEY (`rbs`),
--     FOREIGN KEY (`artikal`) REFERENCES artikli(`shifra`)
-- );

-- ALTER TABLE promet_header ADD vid ENUM('PR', 'FK', 'SM');

-- ALTER TABLE stavki ADD vid ENUM('PR', 'FK', 'SM');

-- ALTER TABLE delovni_partneri ADD edb varchar(200);

-- SELECT * FROM stavki;

SELECT * FROM promet_header;
-- SELECT * FROM delovni_partneri;
-- SELECT * FROM artikli;