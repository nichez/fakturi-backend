"use strict";

var auth = require('../middleware/auth.middleware');

var awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

var _require = require('../middleware/validators/userValidator.middleware'),
    createUserSchema = _require.createUserSchema,
    updateUserSchema = _require.updateUserSchema,
    validateLogin = _require.validateLogin;

var artikalController = require('../controllers/appController');

var delovenPartnerController = require('../controllers/delovniPartneriController');

var stavkiController = require('../controllers/stavkiController');

var prometController = require('../controllers/prometController');

var userController = require('../controllers/userController');

module.exports = function (app) {
  // Article Routes
  app.route('/articles').get(auth(), awaitHandlerFactory(artikalController.getAllArtikli)).post(auth(), awaitHandlerFactory(artikalController.createArtikal));
  app.route('/articles/:articleId').get(auth(), awaitHandlerFactory(artikalController.getArtikal)).put(auth(), awaitHandlerFactory(artikalController.updateArtikal))["delete"](auth(), awaitHandlerFactory(artikalController.deleteArtikal)); // Partners Routes

  app.route('/delovniPartneri').get(auth(), awaitHandlerFactory(delovenPartnerController.getAllPartneri)).post(auth(), awaitHandlerFactory(delovenPartnerController.createPartner));
  app.route('/delovniPartneri/:partnerId').get(auth(), awaitHandlerFactory(delovenPartnerController.getPartner)).put(auth(), awaitHandlerFactory(delovenPartnerController.updatePartner))["delete"](auth(), awaitHandlerFactory(delovenPartnerController.deletePartner)); // Prikaz Routes

  app.route('/prikazPromet').get(awaitHandlerFactory(prometController.getPrometForPrikaz)); // Promet Routes

  app.route('/promet').get(awaitHandlerFactory(prometController.getAllPromet)); // .post((awaitHandlerFactory(prometController.createPromet));

  app.route('/promet/vid/:vid').get(awaitHandlerFactory(prometController.getPrometByVid));
  app.route('/promet/byGodina/:vid/:godina').get(awaitHandlerFactory(prometController.getPrometByGodina));
  app.route('/promet/:prometId').get(auth(), awaitHandlerFactory(prometController.getPromet)) // .put(promet.update_promet)
  ["delete"](auth(), awaitHandlerFactory(prometController.deletePromet));
  app.route('/promet/all/last').get(auth(), awaitHandlerFactory(prometController.getLastPrometBroj));
  app.route('/promet/byDatum/datumFrom=:datumFrom&datumTo=:datumTo').get(awaitHandlerFactory(prometController.getPrometBetweenDates)); // Stavki Routes

  app.route('/stavki').get(auth(), awaitHandlerFactory(stavkiController.getAllStavki)).put(auth(), awaitHandlerFactory(stavkiController.updateStavki)).post(auth(), awaitHandlerFactory(stavkiController.createStavki));
  app.route('/stavki/:stavkaId').get(auth(), awaitHandlerFactory(stavkiController.getStavkaByShifra)) // .put(awaitHandlerFactory(stavkiController.updateStavki))
  ["delete"](auth(), awaitHandlerFactory(stavkiController.deleteStavka));
  app.route('/stavki/byBroj/:stavkaId').get(auth(), awaitHandlerFactory(stavkiController.getStavkaByBroj));
  app.route('/stavki/allStavki/last').get(auth(), awaitHandlerFactory(stavkiController.getLastBroj));
  app.route('/stavki/vid/:vid').get(auth(), awaitHandlerFactory(stavkiController.getStavkiByVid)); // Users Routes

  app.route('/users').get(auth(), awaitHandlerFactory(userController.getAllUsers)).post(auth(), awaitHandlerFactory(userController.createUser));
  app.route('/users/:id').get(auth(), awaitHandlerFactory(userController.getUserById)).put(auth(), awaitHandlerFactory(userController.updateUser))["delete"](auth(), awaitHandlerFactory(userController.deleteUser));
  app.route('/users/username/:username').get(auth(), awaitHandlerFactory(userController.getUserByUsername)); // Login Routes

  app.route('/login').post(awaitHandlerFactory(userController.userLogin));
};