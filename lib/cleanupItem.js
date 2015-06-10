'use strict';

var thru = require('thru');
var VerboseLogger = require('./verboseLog');

var cleanupItem = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("cleanupItem");

  delete item.dsfConnectionConfig;

  verboseLog.log("cleanupItem: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = cleanupItem;
