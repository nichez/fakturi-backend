'user strict';
var sql = require('./db.js');

//Delovni Partneri object constructor
var Stavki = function (stavka) {
  this.shifra = stavka.shifra;
  this.broj = stavka.broj;
  this.rbs = stavka.rbs;
  this.artikal = stavka.artikal;
  this.kolicina = stavka.kolicina;
  this.cena = stavka.cena;
  this.iznos = stavka.iznos;
  this.vid = stavka.vid;
  this.ddv = stavka.ddv;
  this.presmetanDdv = stavka.presmetanDdv;
  this.vkupnaCenaBezDdv = stavka.vkupnaCenaBezDdv;
};

Stavki.createStavki = function (novaStavka, result) {
  sql.query('INSERT INTO stavki set ?', novaStavka, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Stavki.getStavkaByBroj = function (broj, result) {
  sql.query('Select * from stavki where broj = ? ', broj, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Stavki.getStavkaByShifra = function (shifra, result) {
  sql.query(
    'Select * from stavki where shifra = ? ',
    shifra,
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Stavki.getAllStavki = function (result) {
  sql.query('Select * from stavki', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('Stavki : ', res);

      result(null, res);
    }
  });
};

Stavki.updateByShifra = function (shifra, stavka, result) {
  sql.query(
    'UPDATE stavki SET shifra = ?,broj = ?,artikal = ?,kolicina = ?,cena = ?,iznos = ?vid = ?, ddv = ?, presmetanDdv = ?, vkupnaCenaBezDdv = ? WHERE shifra = ?',
    [
      stavka.shifra,
      stavka.broj,
      stavka.artikal,
      stavka.kolicina,
      stavka.cena,
      stavka.iznos,
      stavka.vid,
      stavka.ddv,
      stavka.presmetanDdv,
      stavka.vkupnaCenaBezDdv,
      shifra,
    ],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log(stavka);
        result(null, res);
      }
    }
  );
};

Stavki.removeStavka = function (shifra, result) {
  sql.query(
    'DELETE FROM stavki WHERE shifra = ?',
    [shifra],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Stavki;
