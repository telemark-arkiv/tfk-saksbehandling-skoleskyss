'use strict';

var thru = require('thru');
var dsf = require('tfk-dsf');

var lookupDSF = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);

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
    if (error) {
      item.dsfData = error;
    } else {
      if (!data.RESULT) {
        item.dsfData = data;
      } else {
        item.dsfData = data.RESULT.HOV;

        var address = {
          street: item.dsfData.ADR,
          zip: item.dsfData.POSTN,
          city: item.dsfData.POSTS
        };

        item.registeredAddress = address;
      }
      return callback(null, JSON.stringify(item));
    }
  });
});

module.exports = lookupDSF;