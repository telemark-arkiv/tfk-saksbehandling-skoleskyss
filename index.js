'use strict';

function doSaksbehandling(item, callback) {
  var fixAddresses = require('./lib/fixAddresses');
  var setBehandlingsType = require('./lib/setBehandlingsType');
  var unpackAddress = require('./lib/unpackAddress');

  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }

  fixAddresses(item, function(error, data){
    if (error) {
      return callback(error, null);
    } else {
      if (data.geocodedRegisteredAddress) {
        data.registeredAddress = unpackAddress(data.geocodedRegisteredAddress);
      }
      setBehandlingsType(data, function(err, result) {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, result);
        }
      });
    }
  });

}

module.exports = doSaksbehandling;