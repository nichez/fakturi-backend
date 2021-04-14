'user strict';
var sql = require('./db.js');

//Delovni Partneri object constructor
var Promet = function (promet) {
  this.shifra = promet.shifra;
  this.brojNaStavka = promet.brojNaStavka;
  this.partner = promet.partner;
  this.datum = promet.datum;
  this.iznos = promet.iznos;
  this.vid = promet.vid;
};

Promet.createPromet = function (newPromet, result) {
  sql.query('INSERT INTO promet_header set ?', newPromet, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Promet.getPrometByShifra = function (shifra, result) {
  sql.query(
    'Select * from promet_header where shifra = ? ',
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

Promet.getAllPromet = function (result) {
  sql.query('Select * from promet_header', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('Promet : ', res);

      result(null, res);
    }
  });
};

Promet.updateByShifra = function (shifra, promet, result) {
  sql.query(
    'UPDATE promet_header SET shifra = ?,brojNaStavka = ?,partner = ?,datum = ?,iznos = ?,vid = ? WHERE shifra = ?',
    [promet.shifra, promet.brojNaStavka, promet.partner, promet.datum, promet.iznos, promet.vid, shifra],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log(promet)
        result(null, res);
      }
    }
  );
};

Promet.removePromet = function (shifra, result) {
  sql.query('DELETE FROM promet_header WHERE shifra = ?', [shifra], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Promet;
