var query = require('./db.js');
const { multipleColumnSet } = require('../utils/common.utils');

class Artikal {
  tableName = 'artikli';

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

  create = async (novArtikal) => {
    const sql = `INSERT INTO ${this.tableName} VALUES (?, ?, ?, ?, ?, ?, ?)`;

    console.log('novArtikal ', novArtikal);

    const result = await query(sql, [
      null,
      novArtikal.ime,
      novArtikal.edinecna_merka,
      novArtikal.tarifen_broj_ddv,
      novArtikal.mkd_proizvod,
      novArtikal.datum,
      novArtikal.cena,
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

module.exports = new Artikal();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Article object constructor
// var Article = function (article) {
//   this.shifra = article.shifra;
//   this.ime = article.ime;
//   this.edinecna_merka = article.edinecna_merka;
//   this.tarifen_broj_ddv = article.tarifen_broj_ddv;
//   this.mkd_proizvod = article.mkd_proizvod;
//   this.cena = article.cena;
//   this.datum = new Date();
// };
// Article.createArticle = function (newArticle, result) {
//   sql.query('INSERT INTO artikli set ?', newArticle, function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(err, null);
//     } else {
//       console.log(res.insertId);
//       result(null, res.insertId);
//     }
//   });
// };
// Article.getArticleByShifra = async function (params) {
//   console.log('PARAMS ARTICLES ', params);
//   const { columnSet, values } = multipleColumnSet(params);

//   console.log('PARAMS columnSet ', columnSet);
//   console.log('PARAMS values ', values);

//   const sql = `SELECT * FROM artikli
//     WHERE ${columnSet}`;

//   const result = await query(sql, [...values]);

//   // return back the first row (user)
//   return result[0];
// };
// Article.getAllArticles = function (result) {
//   query('Select * from artikli', function (err, res) {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };
// Article.updateByShifra = function (shifra, article, result) {
//   sql.query(
//     'UPDATE artikli SET ime = ?,edinecna_merka = ?,tarifen_broj_ddv = ?,mkd_proizvod = ?,cena = ? WHERE shifra = ?',
//     [
//       article.ime,
//       article.edinecna_merka,
//       article.tarifen_broj_ddv,
//       article.mkd_proizvod,
//       article.cena,
//       shifra,
//     ],
//     function (err, res) {
//       if (err) {
//         console.log('error: ', err);
//         result(null, err);
//       } else {
//         console.log(article);
//         result(null, res);
//       }
//     }
//   );
// };
// Article.removeArticle = function (shifra, result) {
//   sql.query(
//     'DELETE FROM artikli WHERE shifra = ?',
//     [shifra],
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

// module.exports = Article;
