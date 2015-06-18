'use strict';

function getPostalCode(components) {
  var zip = '';
  components.forEach(function(item) {
    if (item.types.indexOf('postal_code') > -1) {
      zip = item.short_name;
    }
  });
  return zip;
}

module.exports = getPostalCode;