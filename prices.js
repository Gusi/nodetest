'use strict';

// Definition of current prices and offers
module.exports.pricing = {
  Apple: 25,
  Orange: 30,
  Garlic: 15,
  Papaya: 50
}

module.exports.offers = {
  Papaya: function (x) {
    return x - Math.floor(x / 3);
  }
}