"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

exports.getPlaceholderStringForArray = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid input');
  } // if is array, we'll clone the arr
  // and fill the new array with placeholders


  var placeholders = _toConsumableArray(arr);

  return placeholders.fill('?').join(', ').trim();
};

exports.multipleColumnSet = function (object) {
  if (_typeof(object) !== 'object') {
    throw new Error('Invalid input');
  }

  var keys = Object.keys(object);
  var values = Object.values(object);
  columnSet = keys.map(function (key) {
    return "".concat(key, " = ?");
  }).join(' AND ');
  return {
    columnSet: columnSet,
    values: values
  };
};

exports.multipleColumnSetPrikaz = function (object) {
  if (_typeof(object) !== 'object') {
    throw new Error('Invalid input');
  }

  var keys = Object.keys(object);
  var values = Object.values(object);
  columnSet = keys.map(function (key) {
    return key === 'mesec' ? "MONTH(datum) = ?" : "".concat(key, " = ?");
  }).join(' AND ');
  return {
    columnSet: columnSet,
    values: values
  };
};