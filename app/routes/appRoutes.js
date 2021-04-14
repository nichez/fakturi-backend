'use strict';
module.exports = function (app) {
  var articles = require('../controllers/appController');
  var delovniPartneri = require('../controllers/delovniPartneriController');
  var promet = require('../controllers/prometController');
  var stavki = require('../controllers/stavkiController');

  // Article Routes
  app
    .route('/articles')
    .get(articles.get_all_articles)
    .post(articles.create_article);

  app
    .route('/articles/:articleId')
    .get(articles.get_article)
    .put(articles.update_article)
    .delete(articles.remove_article);

  // Partners Routes
  app
    .route('/delovniPartneri')
    .get(delovniPartneri.get_all_partners)
    .post(delovniPartneri.create_partner);

  app
    .route('/delovniPartneri/:partnerId')
    .get(delovniPartneri.get_partner)
    .put(delovniPartneri.update_partner)
    .delete(delovniPartneri.remove_partner);

  // Promet Routes
  app.route('/promet').get(promet.get_all_promet).post(promet.create_promet);

  app
    .route('/promet/:prometId')
    .get(promet.get_promet)
    .put(promet.update_promet)
    .delete(promet.remove_promet);

  // Stavki Routes
  app.route('/stavki').get(stavki.get_all_stavki).post(stavki.create_stavki);

  app
    .route('/stavki/:stavkaId')
    .get(stavki.get_stavka_by_shifra)
    .put(stavki.update_stavka)
    .delete(stavki.remove_stavka);

  app.route('/stavki/byBroj/:stavkaId').get(stavki.get_stavka_by_broj);
};
