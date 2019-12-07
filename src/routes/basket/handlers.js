'user strict';

const Boom = require('@hapi/boom');

const internals = {};

internals.create = async function (request, h) {
  return "created";
}

internals.addProduct = async function (request, h) {
  return "product added";
}

internals.getTotalAmount = async function (request, h) {
  return "amount";
}

internals.remove = async function (request, h) {
  return "removed";
}

module.exports = internals;
