'use strict';

var thru = require('thru');
var transportByFARA = require('tfk-saksbehandling-skoleskyss-fara');
var VerboseLogger = require('./verboseLog');

var checkFARATransport = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("checkTBRTransport");

  if (item.skoleId !== '0666') {
    verboseLog.log("checkFARATransport: School is in Telemark");
    if (item.registeredAddress.zip !== '') {
      verboseLog.log("checkFARATransport: Checks from registeredaddress");
      item.transportByFARARegistered = transportByFARA({postnummer: item.registeredAddress.zip, skoleid:item.skoleId});
    }
    if (item.alternativAdressePostnummer !== '') {
      verboseLog.log("checkFARATransport: Checks from alternativeaddress");
      item.transportByFARAAlternative = transportByFARA({postnummer: item.alternativAdressePostnummer, skoleid:item.skoleId});
    }
  }

  verboseLog.log("checkFARATransport: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = checkFARATransport;
