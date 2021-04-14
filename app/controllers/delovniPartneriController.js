'use strict';

var DelovniPartneri = require('../models/delovniPartneriModel.js');

exports.get_all_partners = function (req, res) {
  DelovniPartneri.getAllPartners(function (err, partner) {
    console.log('DelovniPartneriController');
    if (err) res.send(err);
    console.log('res', partner);
    res.send(partner);
  });
};

exports.create_partner = function (req, res) {
  var new_partner = new DelovniPartneri(req.body);

  //handles null error
  if (!new_partner.ime || !new_partner.shifra) {
    res.status(400).send({ error: true, message: 'Please provide ime/shifra' });
  } else {
    DelovniPartneri.createPartner(new_partner, function (err, partner) {
      if (err) res.send(err);
      res.json(partner);
    });
  }
};

exports.get_partner = function (req, res) {
  DelovniPartneri.getPartnerByShifra(
    req.params.partnerId,
    function (err, partner) {
      if (err) res.send(err);
      res.json(partner);
    }
  );
};

exports.update_partner = function (req, res) {
  DelovniPartneri.updateByShifra(
    req.params.partnerId,
    new DelovniPartneri(req.body),
    function (err, partner) {
      if (err) res.send(err);
      res.json(partner);
    }
  );
};

exports.remove_partner = function (req, res) {
  console.log('re param dele partner id,', req.params.partnerId);
  DelovniPartneri.removePartner(req.params.partnerId, function (err, partner) {
    if (err) res.send(err);
    res.json({ message: 'Partner successfully deleted' });
  });
};
