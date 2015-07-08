'use strict';

var thru = require('thru');
var VerboseLogger = require('./verboseLog');

var setMeasurementAddresses = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("setMeasurementAddresses");

  //Sets school address
  if (item.eksternSkoleAdresse !== '') {
    item.schoolAddresseForMeasurement = item.eksternSkoleAdresse;
  } else {
    item.schoolAddresseForMeasurement = item.skoleAdresse;
  }

  //Sets registered address for measurement
  if (item.registeredAddress) {
    item.registeredAddressForMeasurement = item.registeredAddress.street + ' ' + item.registeredAddress.zip + ' ' + item.registeredAddress.city;
  } else {
    verboseLog.log("setMeasurementAddresses: Missing registered address");
  }

  //Checks for alternative address and inserts it
  if (item.alternativAdresse !== '') {
    item.alternativeAddressForMeasurement = item.alternativAdresseAdresse + ' ' + item.alternativAdressePostnummer + ' ' + item.alternativAdressePoststed;
  }

  verboseLog.log("setMeasurementAddresses: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = setMeasurementAddresses;