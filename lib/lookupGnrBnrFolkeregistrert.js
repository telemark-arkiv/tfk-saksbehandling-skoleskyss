'use strict';

var thru = require('thru');
var getGnrBnrAddress = require('./getGnrBnrAddress');

var lookupGnrBnrFolkeregistrert = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

  if (item.folkeregistrertAdresseBosted === 'GnrBnr') {
    var kommune = item.folkeregistrertAdresseKommunenr;
    var gnr = item.folkeregistrertAdresseGnr;
    var bnr = item.folkeregistrertAdresseBnr;
    query =  kommune + '-' + gnr + '/' + bnr;
    getGnrBnrAddress(query, function(error, data){
      if(error) {
        item.errors.push({
          method: 'lookupGnrBnrFolkeregistrert',
          error: error
        });
        return callback(null, JSON.stringify(item));
      } else {
        var lat = data.geocoded.lat;
        var lng = data.geocoded.lng;
        item.registeredGnrBnrData = data;
        item.registeredAddressForMeasurement = lat + ',' + lng;
        return callback(null, JSON.stringify(item));
      }
    });
  } else {
    return callback(null, itemString);
  }
});

module.exports = lookupGnrBnrFolkeregistrert;