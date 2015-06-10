'use strict';

var thru = require('thru');
var trim = require('trim');
var dsf = require('tfk-dsf');
var VerboseLogger = require('./verboseLog');

var lookupDSF = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("lookupDSF: starts");

  if (!item) {
    return callback(new Error('Missing required input: item object'));
  }
  if (!item.personnummer || item.personnummer === '') {
    return callback(new Error('Missing required input: item.personnummer'));
  }
  if (!item.navn || item.navn === '') {
    return callback(new Error('Missing required input: item.navn'));
  }
  var nameList = trim(item.navn).split(' ');
  var fodselsNummer = item.personnummer;
  var lastName = nameList.pop();
  var firstName = nameList.join(' ');
  var query = {
    saksref: 'tfk-saksbehandling-skoleskyss-dev',
    foedselsnr: fodselsNummer,
    etternavn:lastName,
    fornavn: firstName
  };
  var options = {
    config: item.dsfConnectionConfig,
    query: query
  }

  dsf(options, function(error, data) {
    verboseLog.log("lookupDSF: lookup finished");
    if (error) {
      item.dsfData = error;
      verboseLog.log("lookupDSF: Error - " + error);
    } else {
      if (!data.RESULT) {
        verboseLog.log("lookupDSF: RESULT missing from data");
        item.dsfData = data;
        verboseLog.log(data);
      } else {
        item.dsfData = data.RESULT.HOV;
        verboseLog.log("lookupDSF: Everything looks fine");
        var address = {
          street: item.dsfData.ADR,
          zip: item.dsfData.POSTN,
          city: item.dsfData.POSTS
        };

        item.registeredAddress = address;
      }
      return callback(null, JSON.stringify(item));
    }
    verboseLog.log("lookupDSF: Finishes with error");
    return callback(null, JSON.stringify(item));
  });
});

module.exports = lookupDSF;