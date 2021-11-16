const Artikal = require('../models/appModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class ArtikalController {
  getAllArtikli = async (req, res, next) => {
    let artikli = await Artikal.find();

    artikli = artikli.map((item) => {
      if (item.tarifen_broj_ddv === 2) {
        item.tarifen_broj_ddv = 18;
      } else if (item.tarifen_broj_ddv === 1) {
        item.tarifen_broj_ddv = 5;
      }

      return item;
    });

    res.send(artikli);
  };

  getArtikal = async (req, res, next) => {
    const artikal = await Artikal.findOne({ shifra: req.params.articleId });
    // if (!artikal) {
    //   throw new HttpException(404, 'Artiklot ne e pronajden');
    // }

    res.send(artikal);
  };

  createArtikal = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const result = await Artikal.create(req.body);

    if (!result) {
      throw new HttpException(500, 'Something went wrong');
    }

    res.status(201).send('Artiklot e kreiran!');
  };

  deleteArtikal = async (req, res, next) => {
    const result = await Artikal.delete({ shifra: req.params.articleId });

    if (!result) {
      throw new HttpException(404, 'Artiklot ne e pronajden');
    }
    res.send('Artiklot e uspeshno izbrishan');
  };

  updateArtikal = async (req, res, next) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    // do the update query and get the result
    // it can be partial edit
    const result = await Artikal.update(req.body, req.params.articleId);

    if (!result) {
      throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? 'Artiklot ne e pronajden'
      : affectedRows && changedRows
      ? 'Artiklot e uspeshno promenet'
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

module.exports = new ArtikalController();
