'use strict';

var thru = require('thru');
var transportByNSB = require('tfk-saksbehandling-skoleskyss-nsb');
var VerboseLogger = require('./verboseLog');

var checkNSBTransport = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("checkNSBTransport");

  if (item.skoleId !== '0666') {
    verboseLog.log("checkNSBTransport: School is in Telemark");
    if (item.registeredAddress.zip !== '') {
      verboseLog.log("checkNSBTransport: Checks from registeredaddress");
      item.transportByNSBRegistered = transportByNSB({postnummer: item.registeredAddress.zip, skoleid:item.skoleId});
    }
    if (item.alternativAdressePostnummer !== '') {
      verboseLog.log("checkNSBTransport: Checks from alternativeaddress");
      item.transportByNSBAlternative = transportByNSB({postnummer: item.alternativAdressePostnummer, skoleid:item.skoleId});
    }
  }

  verboseLog.log("checkNSBTransport: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = checkNSBTransport;
