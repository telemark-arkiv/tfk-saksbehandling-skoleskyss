'use strict'

var querystring = require('querystring')
var thru = require('thru')
var geocodeAddress = require('./geocodeAddress')
var VerboseLogger = require('./verboseLog')

var geocodeAlternativeAdresse = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)
  var verboseLog = new VerboseLogger(item.verboseLog)
  verboseLog.log('geocodeAlternativAdresse')

  if (item.alternativAdresseAdresse !== '') {
    verboseLog.log('geocodeAlternativAdresse: starts')
    var escapedAddress = querystring.escape(item.alternativAdresseAdresse)
    geocodeAddress(escapedAddress, function (error, geocodedAlternative) {
      verboseLog.log('geocodeAlternativAdresse: finished lookup')
      if (error) {
        item.errors.push({
          method: 'geocodeAlternativAdresse',
          error: error
        })
        verboseLog.log('geocodeAlternativAdresse: finishes with error - ' + error)
        return callback(null, itemString)
      } else {
        item.geocodedAlternativeAddress = geocodedAlternative
        verboseLog.log('geocodeAlternativAdresse: finished. Everything looks fine')
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    verboseLog.log('geocodeAlternativAdresse: nothing to do')
    return callback(null, itemString)
  }
})

module.exports = geocodeAlternativeAdresse
