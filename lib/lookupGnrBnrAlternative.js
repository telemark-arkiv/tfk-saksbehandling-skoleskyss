'use strict';

var thru = require('thru');
var getGnrBnrAddress = require('./getGnrBnrAddress');

var lookupGnrBnrAlternative = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

  if (item.alternativAdresseBosted === 'GnrBnr') {
    var kommune = item.alternativAdresseKommunenr;
    var gnr = item.alternativAdresseGnr;
    var bnr = item.alternativAdresseBnr;
    query =  kommune + '-' + gnr + '/' + bnr;
    getGnrBnrAddress(query, function(error, data){
      if(error) {
        item.errors.push({
          method: 'lookupGnrBnrAlternative',
          error: error
        });
        return callback(null, JSON.stringify(item));
      } else {
        var lat = data.geocoded.lat;
        var lng = data.geocoded.lng;
        item.alternativeGnrBnrData = data;
        item.alternativeAddressForMeasurement = lat + ',' + lng;
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    return callback(null, itemString);
  }
});

module.exports = lookupGnrBnrAlternative;