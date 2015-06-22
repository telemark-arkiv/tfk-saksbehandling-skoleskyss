'use strict';

var thru = require('thru');
var transportByTBR = require('tfk-saksbehandling-skoleskyss-tbr');
var VerboseLogger = require('./verboseLog');
var getPostalCode = require('./getPostalCode');

var checkTBRTransport = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("checkTBRTransport");

  if (item.skoleId !== '0666') {
    verboseLog.log("checkTBRTransport: School is in Telemark");
    if (item.geocodedRegisteredAddress) {
      verboseLog.log("checkTBRTransport: Checks from registeredaddress");
      var postnummerRegistered = getPostalCode(item.geocodedRegisteredAddress.address_components);
      item.transportByTBRRegistered = transportByTBR({postnummer: postnummerRegistered, skoleid:item.skoleId});
    }
    if (item.geocodedAlternativeAddress) {
      verboseLog.log("checkTBRTransport: Checks from alternativeaddress");
      var postnummerAlternative = getPostalCode(item.geocodedAlternativeAddress.address_components);
      item.transportByTBRAlternative = transportByTBR({postnummer: postnummerAlternative, skoleid:item.skoleId});
    }
  }

  verboseLog.log("checkTBRTransport: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = checkTBRTransport;
