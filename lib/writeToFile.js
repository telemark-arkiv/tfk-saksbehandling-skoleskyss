'use strict'

var fs = require('fs')
var thru = require('thru')
var VerboseLogger = require('./verboseLog')

var writeToFile = thru(function (itemString, callback) {
  var self = this
  var item = JSON.parse(itemString)
  var verboseLog = new VerboseLogger(item.verboseLog)
  verboseLog.log('writeToFile')
  var fileName = item.saveFileToPath + '/' + item._id + '.json'
  fs.writeFile(fileName, itemString, function (error) {
    verboseLog.log('writeToFile: finished')
    if (error) {
      verboseLog.log('writeToFile: finished with error - ' + error)
      return callback(error, itemString)
    } else {
      verboseLog.log('writeToFile: finished with success')
      self.end()
      return callback(null, itemString)
    }
  })
})

module.exports = writeToFile
