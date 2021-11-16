'user strict';
var query = require('./db.js');
const { multipleColumnSet } = require('../utils/common.utils');

class DelovenPartner {
  tableName = 'delovni_partneri';

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
    WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  create = async (novPartner) => {
    const sql = `INSERT INTO ${this.tableName} VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await query(sql, [
      null,
      novPartner.ime,
      novPartner.telefonski_broj,
      novPartner.adresa,
      novPartner.banka_deponent,
      novPartner.edb,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, shifra) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE shifra = ?`;

    const result = await query(sql, [...values, shifra]);

    return result;
  };

  delete = async (shifra) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE shifra = ?`;

    const result = await query(sql, [shifra.shifra]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new DelovenPartner();

// 'user strict';
// var sql = require('./db.js');

// //Delovni Partneri object constructor
// var DelovniPartneri = function (partner) {
//   this.shifra = partner.shifra;
//   this.ime = partner.ime;
//   this.telefonski_broj = partner.telefonski_broj;
//   this.adresa = partner.adresa;
//   this.banka_deponent = partner.banka_deponent;
//   this.edb = partner.edb;
// };

// DelovniPartneri.createPartner = function (newPartner, result) {
//   sql.query('INSERT INTO delovni_partneri set ?', newPartner, function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(err, null);
//     } else {
//       console.log(res.insertId);
//       result(null, res.insertId);
//     }
//   });
// };

// DelovniPartneri.getPartnerByShifra = function (shifra, result) {
//   sql.query(
//     'Select * from delovni_partneri where shifra = ? ',
//     shifra,
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// DelovniPartneri.getAllPartners = function (result) {
//   sql.query('Select * from delovni_partneri', function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// DelovniPartneri.updateByShifra = function (shifra, partner, result) {
//   sql.query(
//     'UPDATE delovni_partneri SET ime = ?,telefonski_broj = ?,adresa = ?,banka_deponent = ?,edb = ? WHERE shifra = ?',
//     [partner.ime, partner.telefonski_broj, partner.adresa, partner.banka_deponent, partner.edb, shifra],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(null, err);
//       } else {
//         console.log(partner)
//         result(null, res);
//       }
//     }
//   );
// };

// DelovniPartneri.removePartner = function (shifra, result) {
//   sql.query('DELETE FROM delovniPartneri WHERE shifra = ?', [shifra], function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// module.exports = DelovniPartneri;
