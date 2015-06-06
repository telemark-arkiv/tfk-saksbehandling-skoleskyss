'use strict';

var fs = require('fs');
var thru = require('thru');

var writeToFile = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var fileName = item._id + '.json';
  fs.writeFile(fileName, itemString, function(error) {
    if (error) {
      return callback(error, itemString);
    } else {
      return callback(null, itemString);
    }
  });
});

module.exports = writeToFile;