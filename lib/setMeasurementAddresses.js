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

  if (item.folkeregistrertAdresseBosted === 'Gateadresse') {
    item.registeredAddressForMeasurement = item.folkeregistrertAdresseAdresse;
  }

  if (item.alternativAdresseBosted === 'Gateadresse') {
    item.alternativeAddressForMeasurement = item.alternativAdresseAdresse;
  }

  verboseLog.log("setMeasurementAddresses: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = setMeasurementAddresses;