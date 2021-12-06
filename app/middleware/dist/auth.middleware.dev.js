"use strict";

var HttpException = require('../utils/HttpException.utils');

var UserModel = require('../models/userModel');

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv');

dotenv.config();

var auth = function auth() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function _callee(req, res, next) {
    var authHeader, bearer, token, secretKey, decoded, user, ownerAuthorized;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            authHeader = req.headers.authorization;
            bearer = 'Bearer ';

            if (!(!authHeader || !authHeader.startsWith(bearer))) {
              _context.next = 5;
              break;
            }

            throw new HttpException(401, 'Access denied. No credentials sent!');

          case 5:
            token = authHeader.replace(bearer, '');
            secretKey = process.env.SECRET_JWT || ''; // Verify Token

            decoded = jwt.verify(token, secretKey);
            _context.next = 10;
            return regeneratorRuntime.awrap(UserModel.findOne({
              id: decoded.user_id
            }));

          case 10:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            throw new HttpException(401, 'Authentication failed!');

          case 13:
            // check if the current user is the owner user
            ownerAuthorized = req.params.id == user.id;

            if (!(!ownerAuthorized && roles.length && !roles.includes(user.role))) {
              _context.next = 16;
              break;
            }

            throw new HttpException(401, 'Unauthorized');

          case 16:
            // if the user has permissions
            req.currentUser = user;
            next();
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](0);
            _context.t0.status = 401;
            next(_context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 20]]);
  };
};

module.exports = auth;