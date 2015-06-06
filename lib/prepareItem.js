'use strict';

var thru = require('thru');

var prepareItem = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

  item.errors = [];

  return callback(null, JSON.stringify(item));
});

module.exports = prepareItem;