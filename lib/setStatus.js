'use strict';

function setStatus(item, callback) {
  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }
  if (!item.sokegrunnlag) {
    return callback(new Error('Missing required param: item.sokegrunnlag'), null);
  }
  if (!item.measuredDistanceRegisteredAddress) {
    return callback(new Error('Missing required param: item.measuredDistanceRegisteredAddress'), null);
  }

  if (item.sokegrunnlag === 'Annen årsak') {
    item.behandlingsStatus = 'Manual';
  } else {
    item.behandlingsStatus = 'Automatic'
  }
  if (item.measuredDistanceRegisteredAddress > 5500 && item.measuredDistanceRegisteredAddress < 6500) {
    item.behandlingsStatus = 'Manual';
  }
  if (item.measuredDistanceRegisteredAddress > 6500 && item.measuredDistanceRegisteredAddress < 40000) {
    item.behandlingsStatus = 'Automatic';
  }
  if (item.measuredDistanceRegisteredAddress > 40000) {
    item.behandlingsStatus = 'Automatic';
  }

  if (item.alternativAdresse !== '') {
    item.behandlingsStatus = 'Manual';
  }

  return callback(null, item);

}

module.exports = setStatus;