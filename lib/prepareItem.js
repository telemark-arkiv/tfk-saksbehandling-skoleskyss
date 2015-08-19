'use strict'

var thru = require('thru')
var VerboseLogger = require('./verboseLog')

var prepareItem = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)
  var verboseLog = new VerboseLogger(item.verboseLog)
  verboseLog.log('prepareItem: prepares item')

  item.errors = []

  return callback(null, JSON.stringify(item))
})

module.exports = prepareItem
