'use strict'

var thru = require('thru')
var getGnrBnrAddress = require('./getGnrBnrAddress')
var VerboseLogger = require('./verboseLog')

var lookupGnrBnrAlternative = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)
  var verboseLog = new VerboseLogger(item.verboseLog)
  verboseLog.log('lookupGnrBnrAlternative')

  if (item.alternativAdresseBosted === 'GnrBnr') {
    verboseLog.log('lookupGnrBnrAlternative: starts')
    var kommune = item.alternativAdresseKommunenr
    var gnr = item.alternativAdresseGnr
    var bnr = item.alternativAdresseBnr
    var query = kommune + '-' + gnr + '/' + bnr
    getGnrBnrAddress(query, function (error, data) {
      verboseLog.log('lookupGnrBnrAlternative: finished lookup')
      if (error) {
        item.errors.push({
          method: 'lookupGnrBnrAlternative',
          error: error
        })
        verboseLog.log('lookupGnrBnrAlternative: finished with error - ' + error)
        return callback(null, JSON.stringify(item))
      } else {
        var lat = data.geocoded.lat
        var lng = data.geocoded.lng
        item.alternativeGnrBnrData = data
        item.alternativeAddressForMeasurement = lat + ',' + lng
        verboseLog.log('lookupGnrBnrAlternative: finished without errors')
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    verboseLog.log('lookupGnrBnrAlternative: nothing to do')
    return callback(null, itemString)
  }
})

module.exports = lookupGnrBnrAlternative
