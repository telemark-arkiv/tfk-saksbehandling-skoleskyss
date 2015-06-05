'use strict';

function unpackAddress(item) {
  if (!item) {
    return new Error('Missing required input: item');
  }
  if (!Array.isArray(item.address_components)) {
    return new Error('Malformed item. item.address_components must be an array');
  }
  var address = {};

  item.address_components.forEach(function(component){
    if (component.types.indexOf('street_number') > -1) {
      address.streetNumber = component.long_name;
    }
    if (component.types.indexOf('route') > -1) {
      address.street = component.long_name;
    }
    if (component.types.indexOf('postal_town') > -1) {
      address.city = component.long_name;
    }
    if (component.types.indexOf('postal_code') > -1) {
      address.zip = component.long_name;
    }
  });

  return address;

}

module.exports = unpackAddress;