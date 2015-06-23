'use strict';

var thru = require('thru');
var transportByFARA = require('tfk-saksbehandling-skoleskyss-fara');
var VerboseLogger = require('./verboseLog');
var getPostalCode = require('./getPostalCode');

var checkFARATransport = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("checkTBRTransport");

  if (item.skoleId !== '0666') {
    verboseLog.log("checkFARATransport: School is in Telemark");
    if (item.geocodedRegisteredAddress) {
      verboseLog.log("checkFARATransport: Checks from registeredaddress");
      var postnummerRegistered = getPostalCode(item.geocodedRegisteredAddress.address_components);
      item.transportByFARARegistered = transportByFARA({postnummer: postnummerRegistered, skoleid:item.skoleId});
    }
    if (item.geocodedAlternativeAddress) {
      verboseLog.log("checkFARATransport: Checks from alternativeaddress");
      var postnummerAlternative = getPostalCode(item.geocodedAlternativeAddress.address_components);
      item.transportByFARAAlternative = transportByFARA({postnummer: postnummerAlternative, skoleid:item.skoleId});
    }
  }

  verboseLog.log("checkFARATransport: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = checkFARATransport;
