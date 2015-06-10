'use strict';

var thru = require('thru');
var dsf = require('tfk-dsf');
var verboseLog = require('./verboseLog');

var lookupDSF = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  verboseLog(item.verboseLog, "lookupDSF: starts");

  if (!item) {
    return callback(new Error('Missing required input: item object'));
  }
  if (!item.personnummer || item.personnummer === '') {
    return callback(new Error('Missing required input: item.personnummer'));
  }
  if (!item.navn || item.navn === '') {
    return callback(new Error('Missing required input: item.navn'));
  }
  var nameList = item.navn.split(' ');
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
    verboseLog(item.verboseLog, "lookupDSF: lookup finished");
    if (error) {
      item.dsfData = error;
      verboseLog(item.verboseLog, "lookupDSF: Error - " + error);
    } else {
      if (!data.RESULT) {
        verboseLog(item.verboseLog, "lookupDSF: RESULT missing from data");
        item.dsfData = data;
        verboseLog(item.verboseLog, data);
      } else {
        item.dsfData = data.RESULT.HOV;
        verboseLog(item.verboseLog, "lookupDSF: Everything looks fine");
        var address = {
          street: item.dsfData.ADR,
          zip: item.dsfData.POSTN,
          city: item.dsfData.POSTS
        };

        item.registeredAddress = address;
      }
      return callback(null, JSON.stringify(item));
    }
    verboseLog(item.verboseLog, "lookupDSF: Finishes with error");
    return callback(null, JSON.stringify(item));
  });
});

module.exports = lookupDSF;