const DelovenPartner = require('../models/delovniPartneriModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class DelovenPartnerController {
  getAllPartneri = async (req, res, next) => {
    let partneri = await DelovenPartner.find();

    partneri = partneri.map((item) => {
      return item;
    });

    res.send(partneri);
  };

  getPartner = async (req, res, next) => {
    const partner = await DelovenPartner.findOne({
      shifra: req.params.partnerId,
    });
    // if (!partner) {
    //   throw new HttpException(404, 'Delovniot partner ne e pronajden');
    // }

    res.send(partner);
  };

  createPartner = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);
    const result = await DelovenPartner.create(req.body);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send('Delovniot partner e kreiran!');
  };

  deletePartner = async (req, res, next) => {
    const result = await DelovenPartner.delete({
      shifra: req.params.partnerId,
    });

    if (!result) {
      throw new HttpException(404, 'Delovniot partner ne e pronajden');
    }
    res.send('Delovniot partner e uspeshno izbrishan');
  };

  updatePartner = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // do the update query and get the result
    // it can be partial edit
    const result = await DelovenPartner.update(req.body, req.params.partnerId);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? 'Delovniot partner ne e pronajden'
      : affectedRows && changedRows
      ? 'Delovniot partner e uspeshno promenet'
      : 'Neuspeshna promena';

    res.send({ message, info });
  };

  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, 'Validation faild', errors);
    }
  };

  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  };
}

module.exports = new DelovenPartnerController();

////////////////////////////////////////////////////////////////////////////////////
// Old

// 'use strict';

// var DelovniPartneri = require('../models/delovniPartneriModel.js');

// exports.get_all_partners = function (req, res) {
//   DelovniPartneri.getAllPartners(function (err, partner) {
//     if (err) res.send(err);
//     res.send(partner);
//   });
// };

// exports.create_partner = function (req, res) {
//   var new_partner = new DelovniPartneri(req.body);

//   //handles null error
//   if (!new_partner.ime || !new_partner.shifra) {
//     res.status(400).send({ error: true, message: 'Please provide ime/shifra' });
//   } else {
//     DelovniPartneri.createPartner(new_partner, function (err, partner) {
//       if (err) res.send(err);
//       res.json(partner);
//     });
//   }
// };

// exports.get_partner = function (req, res) {
//   DelovniPartneri.getPartnerByShifra(
//     req.params.partnerId,
//     function (err, partner) {
//       if (err) res.send(err);
//       res.json(partner);
//     }
//   );
// };

// exports.update_partner = function (req, res) {
//   DelovniPartneri.updateByShifra(
//     req.params.partnerId,
//     new DelovniPartneri(req.body),
//     function (err, partner) {
//       if (err) res.send(err);
//       res.json(partner);
//     }
//   );
// };

// exports.remove_partner = function (req, res) {
//   console.log('re param dele partner id,', req.params.partnerId);
//   DelovniPartneri.removePartner(req.params.partnerId, function (err, partner) {
//     if (err) res.send(err);
//     res.json({ message: 'Partner successfully deleted' });
//   });
// };
