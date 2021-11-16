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

    res.send(promet);
  };

  getPromet = async (req, res, next) => {
    const promet = await Promet.findOne({ shifra: req.params.prometId });

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

  deletePromet = async (req, res, next) => {
    const result = await Promet.delete({ shifra: req.params.prometId });
    if (!result) {
      throw new HttpException(404, 'Prometot ne e pronajden');
    }
    res.send('Prometot e uspeshno izbrishan');
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

module.exports = new PrometController();