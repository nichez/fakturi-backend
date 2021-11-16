const Stavki = require('../models/stavkiModel');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

class StavkiController {
  getAllStavki = async (req, res, next) => {
    let stavki = await Stavki.find();
    // if (!stavki.length) {
    //   throw new HttpException(404, 'Ne se pronajdeni stavki');
    // }

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

  //   updateArtikal = async (req, res, next) => {
  //     this.checkValidation(req);

  //     await this.hashPassword(req);

  //     // do the update query and get the result
  //     // it can be partial edit
  //     const result = await Artikal.update(req.body, req.params.articleId);

  //     if (!result) {
  //         throw new HttpException(404, 'Something went wrong');
  //     }

  //     const { affectedRows, changedRows, info } = result;

  //     const message = !affectedRows ? 'Artiklot ne e pronajden' :
  //         affectedRows && changedRows ? 'Artiklot e uspeshno promenet' : 'Neuspeshna promena';

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

module.exports = new StavkiController();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 'use strict';

// var Stavka = require('../models/stavkiModel.js');

// exports.get_all_stavki = function (req, res) {
//   Stavka.getAllStavki(function (err, stavki) {
//     if (err) res.send(err);
//     console.log('res', stavki);
//     res.send(stavki);
//   });
// };

// exports.create_stavki = function (req, res) {
//   // var new_stavka = new Stavka(req.body);

//   Stavka.createStavki(req.body, function (err, stavki) {
//     if (err) res.send(err);
//     console.log('stavkiController stavki ', stavki)
//     res.json(stavki);
//   });

//   //handles null error
//   // if (!new_stavka.broj || !new_stavka.shifra) {
//   //   res.status(400).send({ error: true, message: 'Please provide broj/shifra' });
//   // } else {
//   //   Stavka.createStavki(new_stavka, function (err, stavki) {
//   //     if (err) res.send(err);
//   //     res.json(stavki);
//   //   });
//   // }
// };

// exports.get_stavka_by_broj = function (req, res) {
//   Stavka.getStavkaByBroj(
//     req.params.stavkaId,
//     function (err, stavka) {
//       if (err) res.send(err);
//       res.json(stavka);
//     }
//   );
// };

// exports.get_stavka_by_shifra = function (req, res) {
//     Stavka.getStavkaByShifra(
//       req.params.stavkaId,
//       function (err, stavka) {
//         if (err) res.send(err);
//         res.json(stavka);
//       }
//     );
//   };

// exports.update_stavka = function (req, res) {
//   Stavka.updateByShifra(
//     req.params.prometId,
//     new Stavka(req.body),
//     function (err, stavka) {
//       if (err) res.send(err);
//       res.json(stavka);
//     }
//   );
// };

// exports.remove_stavka = function (req, res) {
//   console.log('re param dele stavka id,', req.params.prometId);
//   Stavka.removeStavka(req.params.prometId, function (err, stavka) {
//     if (err) res.send(err);
//     res.json({ message: 'stavka successfully deleted' });
//   });
// };
