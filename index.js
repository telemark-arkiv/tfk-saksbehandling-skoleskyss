'use strict';

function checkStatuses(item, callback){
  if (!item) {
    return callback(new Error('Missing required input: item object'), null);
  }

  return callback(null, item);

}

module.exports = checkStatuses;