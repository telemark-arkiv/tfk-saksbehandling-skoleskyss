'use strict';

var thru = require('thru');
var cleanupItem = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

  delete item.dsfConnectionConfig;

  return callback(null, JSON.stringify(item));

});

module.exports = cleanupItem;
