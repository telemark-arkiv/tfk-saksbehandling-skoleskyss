'use strict';

function unpackAddress(item) {
  if (!item) {
    return new Error('Missing required input: item');
  }
  if (!item.dsfData) {
    return new Error('Missing required input: item.dsfData');
  }
  if (item.dsfData.MESSAGE) {
    return new Error('Missing data from dsf');
  }

  var address = {
    street: item.dsfData.ADR,
    zip: item.dsfData.POSTN,
    city: item.dsfData.POSTS
  };

  return address;
}

module.exports = unpackAddress;