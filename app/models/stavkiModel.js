var query = require('./db.js');
var sql = require('./db2.js');
const { multipleColumnSet } = require('../utils/common.utils');

class Stavki {
  tableName = 'stavki';

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

  createStavki = async function (body, result) {
    const [stavki, promet] = body;

    console.log('promet pri kreiranje ', promet);
    console.log('stavki pri kreiranje ', stavki);

    await sql.query(
      'INSERT INTO `promet_header` set ? ',
      promet,
      function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );

    return await sql.query(
      'INSERT INTO `stavki` (rbs, artikal, kolicina, cena, iznos, vid, ddv, presmetanDdv, vkupnaCenaBezDdv, brojNaPromet, partner, datum) VALUES ? ',
      [stavki],
      function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );
  };

  updateStavki = async function (body, result) {
    const [stavki, promet] = body;

    await sql.query(
      'UPDATE `promet_header` set ? WHERE shifra = ? ',
      [
        promet,
        promet.shifra
      ],
      function (err, res) {
        if (err) {
          console.log('error promet is: ', err);
          result(err, null);
        } else {
          console.log('INSERT promet SUCCESS: ', res);
          result(null, res.insertId);
        }
      }
    );

    const stariStavki = await stavki.filter((item) => item[0] !== '');
    const noviStavki = await stavki
      .filter((item) => item[0] === '')
      .map((item) => {
        item.shift();
        return item;
      });

    console.log('stari Stavki ', stariStavki);
    console.log('novi stavki ', noviStavki);

    if (noviStavki.length > 0) {
      await sql.query(
        'INSERT INTO `stavki` (rbs, artikal, kolicina, cena, iznos, vid, ddv, presmetanDdv, vkupnaCenaBezDdv, brojNaPromet, partner, datum) VALUES ? ',
        [noviStavki],
        function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, res.insertId);
          }
        }
      );
    }

    return await sql.query(
      'INSERT INTO `stavki` (shifra, rbs, artikal, kolicina, cena, iznos, vid, ddv, presmetanDdv, vkupnaCenaBezDdv, brojNaPromet, partner, datum) VALUES ? ON DUPLICATE KEY UPDATE shifra=VALUES(shifra), rbs=VALUES(rbs), artikal=VALUES(artikal), kolicina=VALUES(kolicina), cena=VALUES(cena), iznos=VALUES(iznos), vid=VALUES(vid), ddv=VALUES(ddv),  presmetanDdv=VALUES(presmetanDdv),  vkupnaCenaBezDdv=VALUES(vkupnaCenaBezDdv), brojNaPromet=VALUES(brojNaPromet), partner=VALUES(partner), datum=VALUES(datum)',
      [stariStavki],
      function (err, res) {
        if (stariStavki.length === 0) {
          return result(null, []);;
        }
        if (err) {
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );
  };

  create = async (data) => {
    const [stavki, promet] = data;

    const result = await query(sql, [stavki]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  delete = async (shifra) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE shifra = ?`;

    const result = await query(sql, [shifra.shifra]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  getStavkaByBroj = async (broj, result) => {
    const sql1 = 'SELECT * FROM stavki WHERE brojNaPromet = ? ';
    const sql2 = 'SELECT * FROM artikli WHERE shifra = ?';

    const res = await query(sql1, [broj]);

    const dataRes = res.map(async (resItem) => {
      const res2 = await query(sql2, [resItem.artikal]);

      resItem.artikal = res2[0];
      return resItem;
    });

    console.log('dataRes ', dataRes);

    const waitAll = await Promise.all(dataRes);
    result(res);
  };

  getLastBroj = async (result) => {
    const sql = `SELECT MAX(brojNaPromet) FROM ${this.tableName}`;

    const res = await query(sql);

    console.log('getLastBroj ', res[0]);

    // return back the first row (user)
    result(res[0]);
  };
}

module.exports = new Stavki();
