'use strict'

var thru = require('thru')
var getGnrBnrAddress = require('./getGnrBnrAddress')
var VerboseLogger = require('./verboseLog')

var lookupGnrBnrFolkeregistrert = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)
  var verboseLog = new VerboseLogger(item.verboseLog)
  verboseLog.log('lookupGnrBnrFolkeregistrertAdresse')

  if (item.folkeregistrertAdresseBosted === 'GnrBnr') {
    verboseLog.log('lookupGnrBnrFolkeregistrertAdresse: starts')
    var kommune = item.folkeregistrertAdresseKommunenr
    var gnr = item.folkeregistrertAdresseGnr
    var bnr = item.folkeregistrertAdresseBnr
    var query = kommune + '-' + gnr + '/' + bnr
    getGnrBnrAddress(query, function (error, data) {
      verboseLog.log('lookupGnrBnrFolkeregistrertAdresse: finished lookup')
      if (error) {
        item.errors.push({
          method: 'lookupGnrBnrFolkeregistrert',
          error: error
        })
        verboseLog.log('lookupGnrBnrFolkeregistrertAdresse: finishes with error - ' + error)
        return callback(null, JSON.stringify(item))
      } else {
        verboseLog.log('lookupGnrBnrFolkeregistrertAdresse: finishes just fine')
        var lat = data.geocoded.lat
        var lng = data.geocoded.lng
        item.registeredGnrBnrData = data
        item.registeredAddressForMeasurement = lat + ',' + lng
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    verboseLog.log('lookupGnrBnrFolkeregistrertAdresse: nothing to do')
    return callback(null, itemString)
  }
})

module.exports = lookupGnrBnrFolkeregistrert
