'use strict';

var thru = require('thru');
var transportByNSB = require('tfk-saksbehandling-skoleskyss-nsb');
var VerboseLogger = require('./verboseLog');
var getPostalCode = require('./getPostalCode');

var checkNSBTransport = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("checkNSBTransport");

  if (item.skoleId !== '0666') {
    verboseLog.log("checkNSBTransport: School is in Telemark");
    if (item.geocodedRegisteredAddress) {
      verboseLog.log("checkNSBTransport: Checks from registeredaddress");
      var postnummerRegistered = getPostalCode(item.geocodedRegisteredAddress.address_components);
      item.transportByNSBRegistered = transportByNSB({postnummer: postnummerRegistered, skoleid:item.skoleId});
    }
    if (item.geocodedAlternativeAddress) {
      verboseLog.log("checkNSBTransport: Checks from alternativeaddress");
      var postnummerAlternative = getPostalCode(item.geocodedAlternativeAddress.address_components);
      item.transportByNSBAlternative = transportByNSB({postnummer: postnummerAlternative, skoleid:item.skoleId});
    }
  }

  verboseLog.log("checkNSBTransport: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = checkNSBTransport;
