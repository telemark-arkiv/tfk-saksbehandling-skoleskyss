'use strict';

var thru = require('thru');
var verboseLog = require('./verboseLog');

var prepareItem = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

  verboseLog(item.verboseLog, "prepareItem: prepares item");

  item.errors = [];

  return callback(null, JSON.stringify(item));
});

module.exports = prepareItem;