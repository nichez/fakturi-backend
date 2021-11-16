const Promet = require('../models/prometModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class PrometController {
  getAllPromet = async (req, res, next) => {
    let promet = await Promet.find();
    // if (!promet.length) {
    //   throw new HttpException(404, 'Ne e pronajden promet');
    // }

    promet = promet.map((item) => {
      return item;
    });

    res.send(promet);
  };

  getPrometForPrikaz = async (req, res, next) => {
    let promet = await Promet.findForPrikaz(req.query);

    promet = promet.map((item) => {
      return item;
    });

    res.send(promet);
  };


  getPrometByVid = async (req, res, next) => {
    console.log('getPrometByVid ', req.params);
    const promet = await Promet.find({ vid: req.params.vid });
    // if (!promet) {
    //   throw new HttpException(404, 'Ne e pronajden promet');
    // }

    res.send(promet);
  };

  getPromet = async (req, res, next) => {
    const promet = await Promet.findOne({ shifra: req.params.prometId });
    // if (!promet) {
    //   throw new HttpException(404, 'Prometot ne e pronajden');
    // }

    res.send(promet || {});
  };

  getLastPrometBroj = function (req, res) {
    Promet.getLastPrometBroj(function (err, promet) {
      if (err) res.send(err);
      res.json(promet);
    });
  };

  getPrometByGodina = async (req, res, next) => {
    const promet = await Promet.findByGodina({ vid: req.params.vid, godina: req.params.godina });

    res.send(promet);
  };

  getPrometBetweenDates = async (req, res, next) => {
    let promet = await Promet.findBetweenDates({
      datumFrom: req.params.datumFrom,
      datumTo: req.params.datumTo,
    });

    promet = promet.map((item) => {
      return item;
    });

    res.send(promet);
  };

  // createPromet = async (req, res, next) => {
  //   this.checkValidation(req);

  //   await this.hashPassword(req);

  //   const result = await Promet.create(req.body);

  //   if (!result) {
  //     throw new HttpException(500, 'Something went wrong');
  //   }

  //   res.status(201).send('Prometot e kreiran!');
  // };

  deletePromet = async (req, res, next) => {
    const result = await Promet.delete({ shifra: req.params.prometId });
    if (!result) {
      throw new HttpException(404, 'Prometot ne e pronajden');
    }
    res.send('Prometot e uspeshno izbrishan');
  };

  //   updatePromet = async (req, res, next) => {
  //     this.checkValidation(req);

  //     await this.hashPassword(req);

  //     // do the update query and get the result
  //     // it can be partial edit
  //     const result = await Promet.update(req.body, req.params.prometId);

  //     if (!result) {
  //         throw new HttpException(404, 'Something went wrong');
  //     }

  //     const { affectedRows, changedRows, info } = result;

  //     const message = !affectedRows ? 'Prometot ne e pronajden' :
  //         affectedRows && changedRows ? 'Prometot e uspeshno promenet' : 'Neuspeshna promena';

  //     res.send({ message, info });
  // };

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

module.exports = new PrometController();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 'use strict';

// var Promet = require('../models/prometModel.js');

// exports.get_all_promet = function (req, res) {
//   Promet.getAllPromet(function (err, promet) {
//     if (err) res.send(err);
//     res.send(promet);
//   });
// };

// exports.get_all_promet_by_vid = function (req, res) {
//   Promet.getAllPrometByVid(req.params.vid, function (err, promet) {
//     if (err) res.send(err);
//     res.send(promet);
//   });
// };

// exports.create_promet = function (req, res) {
//   var new_promet = new Promet(req.body);

//   //handles null error
//   if (!new_promet.shifra) {
//     res.status(400).send({ error: true, message: 'Please provide shifra' });
//   } else {
//     Promet.createPromet(new_promet, function (err, promet) {
//       if (err) res.send(err);
//       res.json(promet);
//     });
//   }
// };

// exports.get_promet = function (req, res) {
//   Promet.getPrometByShifra(req.params.prometId, function (err, promet) {
//     if (err) res.send(err);
//     res.json(promet);
//   });
// };

// exports.update_promet = function (req, res) {
//   Promet.updateByShifra(
//     req.params.prometId,
//     new Promet(req.body),
//     function (err, promet) {
//       if (err) res.send(err);
//       res.json(promet);
//     }
//   );
// };

// exports.remove_promet = function (req, res) {
//   console.log('re param dele promet id,', req.params.prometId);
//   Promet.removePromet(req.params.prometId, function (err, promet) {
//     if (err) res.send(err);
//     res.json({ message: 'promet successfully deleted' });
//   });
// };
