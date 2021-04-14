'use strict';

var Promet = require('../models/prometModel.js');

exports.get_all_promet = function (req, res) {
  Promet.getAllPromet(function (err, promet) {
    console.log('PrometController');
    if (err) res.send(err);
    console.log('res', promet);
    res.send(promet);
  });
};

exports.create_promet = function (req, res) {
  var new_promet = new Promet(req.body);

  //handles null error
  if (!new_promet.shifra) {
    res.status(400).send({ error: true, message: 'Please provide shifra' });
  } else {
    Promet.createPromet(new_promet, function (err, promet) {
      if (err) res.send(err);
      res.json(promet);
    });
  }
};

exports.get_promet = function (req, res) {
  Promet.getPrometByShifra(
    req.params.prometId,
    function (err, promet) {
      if (err) res.send(err);
      res.json(promet);
    }
  );
};

exports.update_promet = function (req, res) {
  Promet.updateByShifra(
    req.params.prometId,
    new Promet(req.body),
    function (err, promet) {
      if (err) res.send(err);
      res.json(promet);
    }
  );
};

exports.remove_promet = function (req, res) {
  console.log('re param dele promet id,', req.params.prometId);
  Promet.removePromet(req.params.prometId, function (err, promet) {
    if (err) res.send(err);
    res.json({ message: 'promet successfully deleted' });
  });
};
