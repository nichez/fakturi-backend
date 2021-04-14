'user strict';
var sql = require('./db.js');

//Delovni Partneri object constructor
var DelovniPartneri = function (partner) {
  this.shifra = partner.shifra;
  this.ime = partner.ime;
  this.telefonski_broj = partner.telefonski_broj;
  this.adresa = partner.adresa;
  this.banka_deponent = partner.banka_deponent;
  this.edb = partner.edb;
};

DelovniPartneri.createPartner = function (newPartner, result) {
  sql.query('INSERT INTO delovni_partneri set ?', newPartner, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

DelovniPartneri.getPartnerByShifra = function (shifra, result) {
  sql.query(
    'Select * from delovni_partneri where shifra = ? ',
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

DelovniPartneri.getAllPartners = function (result) {
  sql.query('Select * from delovni_partneri', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('Delovni Partneri : ', res);

      result(null, res);
    }
  });
};

DelovniPartneri.updateByShifra = function (shifra, partner, result) {
  sql.query(
    'UPDATE delovni_partneri SET ime = ?,telefonski_broj = ?,adresa = ?,banka_deponent = ?,edb = ? WHERE shifra = ?',
    [partner.ime, partner.telefonski_broj, partner.adresa, partner.banka_deponent, partner.edb, shifra],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log(partner)
        result(null, res);
      }
    }
  );
};

DelovniPartneri.removePartner = function (shifra, result) {
  sql.query('DELETE FROM delovniPartneri WHERE shifra = ?', [shifra], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = DelovniPartneri;
