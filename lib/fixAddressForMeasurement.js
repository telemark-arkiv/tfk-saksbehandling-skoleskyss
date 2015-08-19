'use strict'

var getGnrBnrAddress = require('./getGnrBnrAddress')
var kommune
var gnr
var bnr
var query

function fixAddressForMeasurement (item, callback) {
  if (!item) {
    return callback(new Error('Missing required input: item object'), null)
  }

  // Sets school address
  if (item.eksternSkoleAdresse !== '') {
    item.schoolAddresseForMeasurement = item.eksternSkoleAdresse
  } else {
    item.schoolAddresseForMeasurement = item.skoleAdresse
  }

  if (item.folkeregistrertAdresseBosted === 'Gateadresse' && item.alternativAdresse === '') {
    item.registeredAddressForMeasurement = item.folkeregistrertAdresseAdresse
    return callback(null, item)
  }

  if (item.folkeregistrertAdresseBosted === 'Gateadresse' && item.alternativAdresse !== '') {
    item.registeredAddressForMeasurement = item.folkeregistrertAdresseAdresse
    if (item.alternativAdresseBosted === 'Gateadresse') {
      item.alternativeAddressForMeasurement = item.alternativAdresseAdresse
      return callback(null, item)
    } else {
      kommune = item.alternativAdresseKommunenr
      gnr = item.alternativAdresseGnr
      bnr = item.alternativAdresseBnr
      query = kommune + '-' + gnr + '/' + bnr
      getGnrBnrAddress(query, function (err, data) {
        if (err) {
          return callback(err, null)
        } else {
          var lat = data.geocoded.lat
          var lng = data.geocoded.lng
          item.alternativeGnrBnrData = data
          item.alternativeAddressForMeasurement = lat + ',' + lng
          return callback(null, item)
        }
      })
    }
  }

  if (item.folkeregistrertAdresseBosted === 'GnrBnr' && item.alternativAdresse === '') {
    kommune = item.folkeregistrertAdresseKommunenr
    gnr = item.folkeregistrertAdresseGnr
    bnr = item.folkeregistrertAdresseBnr
    query = kommune + '-' + gnr + '/' + bnr
    getGnrBnrAddress(query, function (err, data) {
      if (err) {
        return callback(err, null)
      } else {
        var lat = data.geocoded.lat
        var lng = data.geocoded.lng
        item.registeredGnrBnrData = data
        item.registeredAddressForMeasurement = lat + ',' + lng
        return callback(null, item)
      }
    })
  }

  if (item.folkeregistrertAdresseBosted === 'GnrBnr' && item.alternativAdresse !== '') {
    kommune = item.folkeregistrertAdresseKommunenr
    gnr = item.folkeregistrertAdresseGnr
    bnr = item.folkeregistrertAdresseBnr
    query = kommune + '-' + gnr + '/' + bnr
    getGnrBnrAddress(query, function (err, data) {
      if (err) {
        return callback(err, null)
      } else {
        var lat = data.geocoded.lat
        var lng = data.geocoded.lng
        item.registeredGnrBnrData = data
        item.registeredAddressForMeasurement = lat + ',' + lng
        if (item.alternativAdresseBosted === 'Gateadresse') {
          item.alternativeAddressForMeasurement = item.alternativAdresseAdresse
          return callback(null, item)
        } else {
          kommune = item.alternativAdresseKommunenr
          gnr = item.alternativAdresseGnr
          bnr = item.alternativAdresseBnr
          query = kommune + '-' + gnr + '/' + bnr
          getGnrBnrAddress(query, function (err, data) {
            if (err) {
              return callback(err, null)
            } else {
              var lat = data.geocoded.lat
              var lng = data.geocoded.lng
              item.alternativeGnrBnrData = data
              item.alternativeAddressForMeasurement = lat + ',' + lng
              return callback(null, item)
            }
          })
        }
      }
    })
  }
}

module.exports = fixAddressForMeasurement
