'user strict';

const Boom = require('@hapi/boom');
const BASKET_KEY_CONSTANT = "BASKET";

const internals = {};

const empty_basket = {
  products: [],
  total: 0
};

/**
 * Instead of get from a DB, i set a constant array list with 
 * the prodcuts given in the readme
  
  Code         | Name                |  Price
  -------------------------------------------------
  VOUCHER      | Cabify Voucher      |   5.00€
  TSHIRT       | Cabify T-Shirt      |  20.00€
  MUG          | Cabify Coffee Mug   |   7.50€
 * 
 */


const PRODUCTS = {
  "VOUCHER": { name: "Cabify Voucher", price: 5.00 },
  "TSHIRT": { name: "Cabify T-Shirt", price: 20.00 },
  "MUG": { name: "Cabify Coffee Mug", price: 7.50 },
}

internals.create = async function (request, h) {
  const basket = request.yar.get(BASKET_KEY_CONSTANT);
  // Only we created if not exists 
  if (!basket) {
    request.yar.set(BASKET_KEY_CONSTANT, empty_basket);
    return empty_basket;
  }
  return basket;
}


internals.addProduct = async function (request, h) {
  const basket = request.yar.get(BASKET_KEY_CONSTANT);
  if (!basket){
    return Boom.notFound();
  }
  const { code, quantity } = request.payload;

  basket.products[code] = basket.products[code] || 0;
  basket.products[code] += quantity;
  request.yar.set(BASKET_KEY_CONSTANT, basket);
  return basket;
}

internals.getTotalAmount = async function (request, h) {
  const basket = request.yar.get(BASKET_KEY_CONSTANT);
  if (!basket){
    return Boom.notFound();
  }
  return basket;
}

internals.remove = async function (request, h) {
  request.yar.set(BASKET_KEY_CONSTANT, null);
  return 'basket deleted'
}

module.exports = internals;
