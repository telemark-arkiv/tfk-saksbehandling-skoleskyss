'use strict';

function fixAddresses(item, callback){
  var geocodeAddress = require('./geocodeAddress');
  var fixAddressMeasureDistance = require('./fixAddressMeasureDistance');
  var getDsfData = require('./getDsfData');

  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }

  getDsfData(item, function(feil, newItem){
    if (feil) {
      return callback(feil, null);
    } else {
      var item = newItem;

      if (item.folkeregistrertAdresseAdresse !== '') {
        geocodeAddress(item.folkeregistrertAdresseAdresse, function(error, geocodedRegistered){
          if (error) {
            return callback(error, null);
          } else {
            item.geocodedRegisteredAddress = geocodedRegistered;
            if (item.alternativAdresseAdresse !== '') {
              geocodeAddress(item.alternativAdresseAdresse, function(err, geocodedAlternative){
                if (err) {
                  return callback(err, null);
                } else {
                  item.geocodedAlternativeAddress = geocodedAlternative;
                  fixAddressMeasureDistance(item, function(er, data){
                    if(er){
                      return callback(er, null);
                    } else {
                      return callback(null, data);
                    }
                  });
                }
              });
            } else {
              item.geocodedAlternativeAddress = '';
              fixAddressMeasureDistance(item, function(er, data){
                if(er){
                  return callback(er, null);
                } else {
                  return callback(null, data);
                }
              });
            }
          }
        });
      } else {
        item.geocodedRegisteredAddress = '';
        if (item.alternativAdresseAdresse !== '') {
          geocodeAddress(item.alternativAdresseAdresse, function(err, geocodedAlternative){
            if (err) {
              return callback(err, null);
            } else {
              item.geocodedAlternativeAddress = geocodedAlternative;
              fixAddressMeasureDistance(item, function(er, data){
                if(er){
                  return callback(er, null);
                } else {
                  return callback(null, data);
                }
              });
            }
          });
        } else {
          item.geocodedAlternativeAddress = '';
          fixAddressMeasureDistance(item, function(er, data){
            if(er){
              return callback(er, null);
            } else {
              return callback(null, data);
            }
          });
        }
      }
    }
  });

}

module.exports = fixAddresses;