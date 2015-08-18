'use strict';

var thru = require('thru');
var VerboseLogger = require('./verboseLog');

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

var doSaksbehandling = thru(function(itemString, callback) {
  var item = JSON.parse(itemString);
  var verboseLog = new VerboseLogger(item.verboseLog);
  verboseLog.log("doSaksbehandling");

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
  // Sets behandlingsAarsak to unknown
  item.behandlingsAarsak = 'Unknown';
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
    if (item.measuredDistanceRegisteredAddress.distanceValue > 5800 && item.measuredDistanceRegisteredAddress.distanceValue < 6200) {
      item.behandlingsType = 'Manual';
      item.behandlingsResultat = 'Unknown';
      item.behandlingsAarsak = 'Distance needs manual check';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue < 5800) {
      item.behandlingsType = 'Automatic';
      item.behandlingsResultat = 'No';
      item.behandlingsAarsak = 'Distance to short';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue > 6200) {
      item.behandlingsType = 'Automatic';
      item.behandlingsResultat = 'Yes';
      item.behandlingsAarsak = 'Distance approved';
    }
  }
  // If Delt bosted
  if (item.alternativAdresse === 'Delt bosted' && item.sokegrunnlag === 'Avstand til skole') {
    // Both adresses too short
    if (item.measuredDistanceRegisteredAddress.distanceValue < 5800 && item.measuredDistanceAlternativeAddress.distanceValue < 5800) {
      item.behandlingsType = 'Automatic';
      item.behandlingsResultat = 'No';
      item.behandlingsAarsak = 'Distance to short';
    }
    // Registered under 6200 and Alternative over 5800
    if (item.measuredDistanceRegisteredAddress.distanceValue > 5800 && item.measuredDistanceAlternativeAddress.distanceValue < 6200) {
      item.behandlingsType = 'Manual';
      item.behandlingsResultat = 'Unknown';
      item.behandlingsAarsak = 'Distance needs manual check';
    }
    // Registered over 6500
    if (item.measuredDistanceAlternativeAddress.distanceValue > 6200) {
      item.behandlingsType = 'Automatic';
      item.behandlingsResultat = 'Yes';
      item.behandlingsAarsak = 'Distance approved';
    }
  }

  //Automatic: By boat or Ferry
  if (item.behandlingsType === 'Automatic' && item.sokegrunnlag === 'Båt/ferge') {
    if (ferryZips.indexOf(item.registeredAddress.zip) > -1) {
      item.behandlingsResultat = 'Yes';
      item.behandlingsAarsak = 'Ferry approved';
    }
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
    item.behandlingsAarsak = 'Age above 26';
  }

  //Missing dsf data
  if (!item.dsfData.PERS) {
    item.behandlingsType = 'Manual';
    item.behandlingsResultat = 'Unknown';
    item.behandlingsAarsak = 'Missing dsf data';
  }

  //Any errors
  if (item.errors.length > 0) {
    item.behandlingsType = 'Manual';
    item.behandlingsResultat = 'Unknown';
    item.behandlingsAarsak = 'Errors during lookups';
  }

  verboseLog.log("doSaksbehandling: finished");
  return callback(null, JSON.stringify(item));

});

module.exports = doSaksbehandling;