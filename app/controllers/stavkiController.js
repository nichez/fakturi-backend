'use strict';

var Stavka = require('../models/stavkiModel.js');

exports.get_all_stavki = function (req, res) {
  Stavka.getAllStavki(function (err, stavki) {
    console.log('StavkiController');
    if (err) res.send(err);
    console.log('res', stavki);
    res.send(stavki);
  });
};

exports.create_stavki = function (req, res) {
  // var new_stavka = new Stavka(req.body);

  Stavka.createStavki(req.body, function (err, stavki) {
    if (err) res.send(err);
    res.json(stavki);
  });

  //handles null error
  // if (!new_stavka.broj || !new_stavka.shifra) {
  //   res.status(400).send({ error: true, message: 'Please provide broj/shifra' });
  // } else {
  //   Stavka.createStavki(new_stavka, function (err, stavki) {
  //     if (err) res.send(err);
  //     res.json(stavki);
  //   });
  // }
};

exports.get_stavka_by_broj = function (req, res) {
  Stavka.getStavkaByBroj(
    req.params.stavkaId,
    function (err, stavka) {
      if (err) res.send(err);
      res.json(stavka);
    }
  );
};

exports.get_stavka_by_shifra = function (req, res) {
    Stavka.getStavkaByShifra(
      req.params.stavkaId,
      function (err, stavka) {
        if (err) res.send(err);
        res.json(stavka);
      }
    );
  };

exports.update_stavka = function (req, res) {
  Stavka.updateByShifra(
    req.params.prometId,
    new Stavka(req.body),
    function (err, stavka) {
      if (err) res.send(err);
      res.json(stavka);
    }
  );
};

exports.remove_stavka = function (req, res) {
  console.log('re param dele stavka id,', req.params.prometId);
  Stavka.removeStavka(req.params.prometId, function (err, stavka) {
    if (err) res.send(err);
    res.json({ message: 'stavka successfully deleted' });
  });
};
