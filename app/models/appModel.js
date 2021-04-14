'user strict';
var sql = require('./db.js');

//Article object constructor
var Article = function (article) {
  this.shifra = article.shifra;
  this.ime = article.ime;
  this.edinecna_merka = article.edinecna_merka;
  this.tarifen_broj_ddv = article.tarifen_broj_ddv;
  this.mkd_proizvod = article.mkd_proizvod;
  this.cena = article.cena;
  this.datum = new Date();
};
Article.createArticle = function (newArticle, result) {
  sql.query('INSERT INTO artikli set ?', newArticle, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Article.getArticleByShifra = function (shifra, result) {
  sql.query(
    'Select * from artikli where shifra = ? ',
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
Article.getAllArticles = function (result) {
  sql.query('Select * from artikli', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('artikli : ', res);

      result(null, res);
    }
  });
};
Article.updateByShifra = function (shifra, article, result) {
  sql.query(
    'UPDATE artikli SET ime = ?,edinecna_merka = ?,tarifen_broj_ddv = ?,mkd_proizvod = ?,cena = ? WHERE shifra = ?',
    [article.ime, article.edinecna_merka, article.tarifen_broj_ddv, article.mkd_proizvod, article.cena, shifra],
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log(article)
        result(null, res);
      }
    }
  );
};
Article.removeArticle = function (shifra, result) {
  sql.query('DELETE FROM artikli WHERE shifra = ?', [shifra], function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Article;
