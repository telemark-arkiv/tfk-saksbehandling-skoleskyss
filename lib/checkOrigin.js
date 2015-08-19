'use strict'

function checkOrigin (item) {
  var status = false

  if (item.registeredGnrBnrData && item.registeredGnrBnrData.FYLKESNAVN === 'TELEMARK') {
    status = true
  }

  if (item.geocodedRegisteredAddress) {
    item.geocodedRegisteredAddress.address_components.forEach(function (part) {
      if (part.types[0] === 'administrative_area_level_1' && part.long_name === 'Telemark') {
        status = true
      }
    })
  }

  return status
}

module.exports = checkOrigin
