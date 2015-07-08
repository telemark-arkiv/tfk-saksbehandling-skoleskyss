'use strict';

var thru = require('thru');
var transportByTBR = require('tfk-saksbehandling-skoleskyss-tbr');
var VerboseLogger = require('./verboseLog');
var getPostalCode = require('./getPostalCode');

var checkTBRTransport = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("checkTBRTransport");

  if (item.registeredAddress) {
    if (item.skoleId !== '0666') {
      verboseLog.log("checkTBRTransport: School is in Telemark");
      if (item.registeredAddress.zip !== '') {
        verboseLog.log("checkTBRTransport: Checks from registeredaddress");
        item.transportByTBRRegistered = transportByTBR({postnummer: item.registeredAddress.zip, skoleid:item.skoleId});
      }
      if (item.alternativAdressePostnummer !== '') {
        verboseLog.log("checkTBRTransport: Checks from alternativeaddress");
        item.transportByTBRAlternative = transportByTBR({postnummer: item.alternativAdressePostnummer, skoleid:item.skoleId});
      }
    }
  } else {
    verboseLog.log("checkTBRTransport: Missing registered address");
  }

  verboseLog.log("checkTBRTransport: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = checkTBRTransport;
