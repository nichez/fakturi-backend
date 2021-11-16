var query = require('./db.js');
const {
  multipleColumnSet,
  multipleColumnSetPrikaz,
} = require('../utils/common.utils');

class Promet {
  tableName = 'promet_header';

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    let filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != '')
    );

    const { columnSet, values } = multipleColumnSet(filteredParams);
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

  getLastPrometBroj = async (result) => {
    const sql = `SELECT MAX(shifra) FROM ${this.tableName}`;

    const res = await query(sql);

    console.log('getLastPrometBroj ', res[0]);

    // return back the first row (user)
    result(res[0]);
  };

  delete = async (data) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE shifra = ?`;

    const result = await query(sql, [data.shifra]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  findBetweenDates = async (data) => {
    console.log('datumFrom = ', data.datumFrom);
    console.log('datumTo = ', data.datumTo);
    let sql = `SELECT * FROM ${this.tableName} WHERE datum BETWEEN ${data.datumFrom} AND DATE_ADD(${data.datumTo}, INTERVAL 1 DAY)`;

    const result = await query(sql);
    console.log('result ', result);

    return result;
  };

  findByGodina = async (data) => {
    let sql = `SELECT * FROM ${this.tableName} WHERE vid=${data.vid} AND godina=${data.godina}`;

    const result = await query(sql);
    console.log('result ', result);

    return result;
  };

  findForPrikaz = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    console.log('real params ', params);

    let filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != '')
    );
    console.log('f params ', filteredParams);

    if (!Object.keys(filteredParams).length) {
      console.log('done');
      return await query(sql);
    }

    if (filteredParams.mesec) {
      console.log('MONTH ', filteredParams.mesec);
    }

    const { columnSet, values } = multipleColumnSetPrikaz(filteredParams);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };
}

module.exports = new Promet();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 'user strict';
// var sql = require('./db.js');

// //Delovni Partneri object constructor
// var Promet = function (promet) {
//   this.shifra = promet.shifra;
//   this.brojNaStavka = promet.brojNaStavka;
//   this.partner = promet.partner;
//   this.datum = promet.datum;
//   this.iznos = promet.iznos;
//   this.vid = promet.vid;
// };

// Promet.createPromet = function (newPromet, result) {
//   sql.query('INSERT INTO promet_header set ?', newPromet, function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(err, null);
//     } else {
//       result(null, res.insertId);
//     }
//   });
// };

// Promet.getPrometByShifra = function (shifra, result) {
//   sql.query(
//     'Select * from promet_header where shifra = ? ',
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

// Promet.getAllPromet = function (result) {
//   sql.query('Select * from promet_header', function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// Promet.getAllPrometByVid = function (vid, result) {
//   sql.query('Select * from promet_header where vid = ? ', vid, function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// Promet.updateByShifra = function (shifra, promet, result) {
//   sql.query(
//     'UPDATE promet_header SET shifra = ?,brojNaStavka = ?,partner = ?,datum = ?,iznos = ?,vid = ? WHERE shifra = ?',
//     [promet.shifra, promet.brojNaStavka, promet.partner, promet.datum, promet.iznos, promet.vid, shifra],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// Promet.removePromet = function (shifra, result) {
//   sql.query('DELETE FROM promet_header WHERE shifra = ?', [shifra], function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// module.exports = Promet;
