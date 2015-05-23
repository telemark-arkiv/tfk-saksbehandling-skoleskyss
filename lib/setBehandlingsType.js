'use strict';

var checkOrigin = require('./checkOrigin');

function fixFodselsaar(year) {
  var thisYear = new Date().getFullYear() - 2000;
  var newYear = '';
  if (parseInt(year, 10) > thisYear) {
    newYear = parseInt('19' + year, 10);
  } else {
    newYear = parseInt('20' + year, 10);
  }
  return newYear;
}

function setStatus(item, callback) {
  // Sanitychecks
  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }
  if (!item.sokegrunnlag) {
    return callback(new Error('Missing required param: item.sokegrunnlag'), null);
  }
  if (item.sokegrunnlag === 'Avstand til skole' && !item.measuredDistanceRegisteredAddress) {
    return callback(new Error('Missing required param: item.measuredDistanceRegisteredAddress'), null);
  }
  // Variables
  var ferryZips = [
    '3780',
    '3781',
    '3783'
  ];
  var fodselsAar = fixFodselsaar(item.personnummer.substr(4,2));
  var thisYear = new Date().getFullYear();
  // Sets behandlingsResultat to unknown
  item.behandlingsResultat = 'Unknown';
  //Automatic or Manual?
  if (item.sokegrunnlag === 'Annen årsak') {
    item.behandlingsType = 'Manual';
  } else {
    item.behandlingsType = 'Automatic';
  }
  if (item.alternativAdresse !== '') {
    item.behandlingsType = 'Manual';
  }
  if (item.eksternSkoleNavn !== '') {
    item.behandlingsType = 'Manual';
  }
  //Automatic: Checks measured distance
  if (item.behandlingsType === 'Automatic' && item.sokegrunnlag === 'Avstand til skole') {
    if (item.measuredDistanceRegisteredAddress.distanceValue > 5500 && item.measuredDistanceRegisteredAddress.distanceValue < 6500) {
      item.behandlingsType = 'Manual';
      item.behandlingsResultat = 'Unknown';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue < 5500) {
      item.behandlingsType = 'Automatic';
      item.behandlingsResultat = 'No';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue > 6500) {
      item.behandlingsType = 'Automatic';
      item.behandlingsResultat = 'Yes';
    }
  }
  //Automatic: By boat or Ferry
  if (item.behandlingsType === 'Automatic' && item.sokegrunnlag === 'Båt/ferge') {
    ferryZips.forEach(function(zip) {
      if (item.folkeregistrertAdresseAdresse.indexOf(zip) > -1) {
        item.behandlingsResultat = 'Yes';
      }
    });
    //If not yes, go to manual
    if (item.behandlingsResultat === 'Unknown') {
      item.behandlingsType = 'Manual';
      item.behandlingsResultat = 'Unknown';
    }
  }
  //Check age
  if (thisYear - fodselsAar >= 26) {
    item.behandlingsType = 'Manual';
    item.behandlingsResultat = 'Unknown';
  }
  //Automatic: Not from Telemark?
  if (!checkOrigin(item)) {
    item.behandlingsType = 'Automatic';
    item.behandlingsResultat = 'No';
    item.behandlingsAarsak = 'Not from Telemark';
  }

  return callback(null, item);
}

module.exports = setStatus;
