'use strict';

var Article = require('../models/appModel.js');

exports.get_all_articles = function (req, res) {
  Article.getAllArticles(function (err, article) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', article);
    res.send(article);
  });
};

exports.create_article = function (req, res) {
  var new_article = new Article(req.body);

  //handles null error
  if (!new_article.ime || !new_article.shifra) {
    res
      .status(400)
      .send({ error: true, message: 'Please provide ime/shifra' });
  } else {
    Article.createArticle(new_article, function (err, article) {
      if (err) res.send(err);
      res.json(article);
    });
  }
};

exports.get_article = function (req, res) {
  Article.getArticleByShifra(req.params.articleId, function (err, article) {
    if (err) res.send(err);
    res.json(article);
  });
};

exports.update_article = function (req, res) {
  Article.updateByShifra(req.params.articleId, new Article(req.body), function (err, article) {
    if (err) res.send(err);
    res.json(article);
  });
};

exports.remove_article = function (req, res) {
  console.log('re param dele article id,', req.params.articleId)
  Article.removeArticle(req.params.articleId, function (err, article) {
    if (err) res.send(err);
    res.json({ message: 'Article successfully deleted' });
  });
};
