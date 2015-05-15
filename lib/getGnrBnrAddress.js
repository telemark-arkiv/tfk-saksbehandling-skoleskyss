'use strict';

var getDataFromSeEiendom = require('seeiendom');
var Converter = require('wgs84-util');

function getGnrBnrAddress(querystring, callback) {
  if (!querystring) {
    return callback(new Error('Missing required param: querystring'), null);
  }

  getDataFromSeEiendom({query:querystring}, function(error, data){
    if (error) {
      return callback(error, null);
    } else {
      var thisData = data[0];
      var easting = parseFloat(thisData.LONGITUDE);
      var northing = parseFloat(thisData.LATITUDE);
      var zoneNumber = 32;
      var zoneLetter = 'N';
      var geo = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [easting, northing]
        },
        "properties": {"zoneLetter": zoneLetter, "zoneNumber": zoneNumber}
      };
      var converted = Converter.UTMtoLL(geo);
      var lat = converted.coordinates[0];
      var lng = converted.coordinates[1];

      thisData.geocoded = {
        lat: lat,
        lng: lng
      };

      return callback(null, thisData);

    }
  })

}

module.exports = getGnrBnrAddress;