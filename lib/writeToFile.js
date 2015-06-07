'use strict';

var fs = require('fs');
var thru = require('thru');

var writeToFile = thru(function(itemString, callback) {
  var self = this;
  var item = JSON.parse(itemString);
  var fileName = item.saveFileToPath + '/' + item._id + '.json';
  fs.writeFile(fileName, itemString, function(error) {
    if (error) {
      return callback(error, itemString);
    } else {
      self.end();
      return callback(null, itemString);
    }
  });
});

module.exports = writeToFile;