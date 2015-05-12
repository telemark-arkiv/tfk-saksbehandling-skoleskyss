'use strict';

function setStatus(item, callback) {
  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }
  if (!item.sokegrunnlag) {
    return callback(new Error('Missing required param: item.sokegrunnlag'), null);
  }
  if (item.sokegrunnlag === 'Avstand til skole' && !item.measuredDistanceRegisteredAddress) {
    return callback(new Error('Missing required param: item.measuredDistanceRegisteredAddress'), null);
  }
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
  if (item.behandlingsType === 'Automatic' && item.sokegrunnlag === 'Avstand til skole') {
    if (item.measuredDistanceRegisteredAddress.distanceValue > 5500 && item.measuredDistanceRegisteredAddress.distanceValue < 6500) {
      item.behandlingsType = 'Manual';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue > 6500 && item.measuredDistanceRegisteredAddress.distanceValue < 40000) {
      item.behandlingsType = 'Automatic';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue > 40000) {
      item.behandlingsType = 'Automatic';
    }
  }

  return callback(null, item);

}

module.exports = setStatus;