"use strict";

const basketHandlers = require("./handlers");
const Joi = require("@hapi/joi");

module.exports = [
  {
    method: 'POST',
    path: "/basket",
    handler: basketHandlers.create,
    config: {
      description: 'Create a new checkout basket',
      notes: 'Creates a new empty basket',
      tags: ['api', 'basket'],
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      }
    }
  },
  {
    method: 'PUT',
    path: "/basket",
    handler: basketHandlers.addProduct,
    config: {
      description: 'Add a product to a basket',
      notes: `Be awared of this two cases:
      - The marketing department thinks a buy 2 get 1 free promotion will work best (buy two of the same product, get one free), and would like this to only apply to VOUCHER items.
      - The CFO insists that the best way to increase sales is with discounts on bulk purchases (buying x or more of a product, the price of that product is reduced), and requests that if you buy 3 or more TSHIRT items, the price per unit should be 19.00€.
      `,
      tags: ['api', 'basket'],
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      },
      validate: {
        payload: Joi.object({
          quantity: Joi.number().integer().required().min(1),
          code: Joi.string().valid("VOUCHER", "TSHIRT","MUG").required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: "/basket",
    handler: basketHandlers.getTotalAmount,
    config: {
      description: 'Get the total amount in a basket',
      tags: ['api', 'basket'],
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: "/basket",
    handler: basketHandlers.remove,
    config: {
      description: 'Remove the basket',
      tags: ['api', 'basket'],
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      }
    }
  }
];
