'use strict';

let fs = require('fs');
let _ = require('lodash');
let prices = require('./prices.js');

// Check there is an argument for the file
if (process.argv.length !== 3)
  throw `Must specify the input file`;

// Check the file exists
let file = process.argv[2];

if (!fs.existsSync(file))
  throw `File ${file} doesn't exist`;

// Read file (one line for each element)
let basket = fs.readFileSync(file, { encoding: 'utf8' });

// Split lines into strings
basket = basket.split('\n'); // NOTE: Depends on line feed, change to ('\r\n') if using Windows Line Endings

// Trim elements
basket = basket.map(function (x) {
  return _.trim(x);
});

// Remove empty entries
basket = _.filter(basket, function (x) {
  return !_.isNull(x) && x !== '';
});

// Count elements
basket = _.countBy(basket);

// Print invoice
let sum = 0;
console.log(`ITEM\tUNITS\tTOTAL`);

_.forOwn(basket, function (value, key) {
  let offer = prices.offers[key]; // Get the price for the item
  let effectiveItems = (offer !== undefined) ? offer(value) : value; // Get the real items to be paid (if there is discount)
  let price = prices.pricing[key] * effectiveItems / 100; // Calculate final price for items

  sum += price;
  console.log(`${key}\t${value}\t${price.toFixed(2)}`);
});

console.log(`\tTOTAL\t${sum.toFixed(2)}`);