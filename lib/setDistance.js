'use strict';

var measureDistance = require('./measureDistance');

function setDistance(item, callback){
  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }

  var destination = item.eksternSkoleAdresse !== '' ? item.eksternSkoleAdresse : item.skoleAdresse;
  var origin;
  var originAlternative;

  if (item.folkeregistrertAdresseBosted === 'Gateadresse') {
    origin = item.folkeregistrertAdresseGateadresse, + ', ' + item.folkeregistrertAdressePostnummer + ' ' + item.folkeregistrertAdressePoststed;
  }

  if (item.alternativAdresseBosted === 'Gateadresse') {
    originAlternative = item.alternativAdresseGateadresse + ', ' + item.alternativAdressePostnummer + ' ' + item.alternativAdressePoststed;
  }

  measureDistance({origin:origin, destination:destination}, function(error, data) {
    if (error) {
      return callback(error, null);
    } else {
      item.measuredDistanceRegisteredAddress = data;

      if (originAlternative) {

        measureDistance({origin: originAlternative, destination:destination}, function(err, distance) {
          if (err) {
            return callback(err);
          } else {
            item.measuredDistanceAlternativeAddress = distance;
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