'use strict';

var thru = require('thru');
var setMeasurementAddresses = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

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

  return callback(null, JSON.stringify(item));

});

module.exports = setMeasurementAddresses;