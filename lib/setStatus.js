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
    item.behandlingsStatus = 'Manual';
  } else {
    item.behandlingsStatus = 'Automatic';
  }
  if (item.alternativAdresse !== '') {
    item.behandlingsStatus = 'Manual';
  }
  if (item.eksternSkoleNavn !== '') {
    item.behandlingsStatus = 'Manual';
  }
  if (item.behandlingsStatus === 'Automatic' && item.sokegrunnlag === 'Avstand til skole') {
    if (item.measuredDistanceRegisteredAddress.distanceValue > 5500 && item.measuredDistanceRegisteredAddress.distanceValue < 6500) {
      item.behandlingsStatus = 'Manual';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue > 6500 && item.measuredDistanceRegisteredAddress.distanceValue < 40000) {
      item.behandlingsStatus = 'Automatic';
    }
    if (item.measuredDistanceRegisteredAddress.distanceValue > 40000) {
      item.behandlingsStatus = 'Automatic';
    }
  }

  return callback(null, item);

}

module.exports = setStatus;