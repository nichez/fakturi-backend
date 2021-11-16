const Stavki = require('../models/stavkiModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class StavkiController {
  getAllStavki = async (req, res, next) => {
    let stavki = await Stavki.find();

    stavki = stavki.map((item) => {
      return item;
    });

    res.send(stavki);
  };

  getStavkiByVid = async (req, res, next) => {
    let stavki = await Stavki.find({ vid: req.params.vid });

    stavki = stavki.map((item) => {
      return item;
    });

    res.send(stavki);
  };

  getStavkaByShifra = async (req, res, next) => {
    const stavka = await Stavki.findOne({ shifra: req.params.stavkaId });
    if (!stavka) {
      throw new HttpException(404, 'Stavkata ne e pronajdena');
    }

    res.send(stavka);
  };

  getStavkaByBroj = function (req, res) {
    Stavki.getStavkaByBroj(req.params.stavkaId, function (err, stavka) {
      if (err) res.send(err);
      res.json(stavka);
    });
  };

  // should be like this in future
  // getStavkaByBroj = async (req, res, next) => {
  //   const stavki = await Stavki.find({ broj: req.params.stavkaId });
  //   if (!stavki) {
  //     throw new HttpException(404, 'Ne se pronajdeni stavki');
  //   }

  //   res.send(stavki);
  // };

  createStavki = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // const result = await Stavki.createStavki(req.body);
    const result = await Stavki.createStavki(req.body, function (err, stavki) {
      console.log('stavkiController stavki err ', err);
      if (err) res.send(err);
      console.log('stavkiController stavki ', stavki);
      // res.json(stavki);
    });

    console.log('createStavki body result', result);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send('Stavkata e kreirana!');
  };

  updateStavki = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // const result = await Stavki.createStavki(req.body);
    const result = await Stavki.updateStavki(req.body, function (err, stavki) {
      if (err) res.send(err);
      console.log('updateStavki stavki ', stavki);
      // res.json(stavki);
    });

    console.log('createStavki body result', result);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send('Prometot e uspeshno promenet!');
  };

  deleteStavka = async (req, res, next) => {
    console.log('deleteStavka', req.params.stavkaId);
    const result = await Stavki.delete({ shifra: req.params.stavkaId });
    if (!result) {
      throw new HttpException(404, 'Stavkata ne e pronajdena');
    }
    res.send('Stavkata e uspeshno izbrishana');
  };

  getLastBroj = function (req, res) {
    Stavki.getLastBroj(function (err, stavka) {
      if (err) res.send(err);
      res.json(stavka);
    });
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

module.exports = new StavkiController();
