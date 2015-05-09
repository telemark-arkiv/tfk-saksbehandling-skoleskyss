'use strict';

var measureDistance = require('./measureDistance');

function setDistance(item, callback){
  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }
  if (!item.skoleAdresse) {
    return callback(new Error('Missing required input: item.skoleAdresse'), null);
  }

  var destination = item.skoleAdresse;
  var origin;
  var originAlternative;

  if (item.folkeregistrertAdresseBosted == "Gateadresse") {
    origin = item.folkeregistrertAdresseAdresse;
  }

  if (item.alternativAdresseBosted == "Gateadresse") {
    originAlternative = item.alternativeAdresseAdresse;
  }

  measureDistance({origin:origin, destination:destination}, function(error, data){
    if (error) {
      return callback(error, null);
    } else {
      item.measuredDistance = data;

      if (originAlternative) {

        measureDistance({origin: originAlternative, destination:destination}, function(err, distance) {
          if (err) {
            return callback(err);
          } else {
            item.measuredDistanceAlternative = distance;
            return callback(null, item);
          }
        });

      } else {
        return callback(null, item);
      }

    }
  });


}

module.exports = setDistance;