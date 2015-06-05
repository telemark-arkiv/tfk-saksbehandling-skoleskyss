'use strict';

var dsf = require('dsf');

function getDsfData(item, callback) {
  if (!item) {
    return callback(new Error('Missing required input: item object'));
  }
  if (!item.personnummer || item.personnummer === '') {
    return callback(new Error('Missing required input: item.personnummer'));
  }
  if (!item.name || item.name === '') {
    return callback(new Error('Missing required input: item.name'));
  }

  var nameList = item.name.split(' ');
  var fodselsNummer = item.personnummer;
  var lastName = nameList.pop();
  var firstName = nameList.join(' ');
  var options = {
    saksref: 'Referanse',
    foedselsnr: fodselsNummer,
    etternavn:lastName,
    fornavn: firstName
  };

  dsf(options, function(error, data) {
    if (error) {
      return callback(error, null);
    } else {
      if (data.MESSAGE) {
        item.dsfData = data;
      } else {
        item.dsfData = data.RESULT.HOV;
      }
      return callback(null, item);
    }
  })
}

module.exports = getDsfData;