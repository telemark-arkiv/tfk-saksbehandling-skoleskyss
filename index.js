'use strict';

function doSaksbehandling(item, callback) {
  var fixAddressMeasureDistance = require('./lib/fixAddressMeasureDistance');
  var setBehandlingsType = require('./lib/setBehandlingstype');

  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }

  fixAddressMeasureDistance(item, function(error, data){
    if (error) {
      return callback(error, null);
    } else {
      setBehandlingsType(data, function(err, result){
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