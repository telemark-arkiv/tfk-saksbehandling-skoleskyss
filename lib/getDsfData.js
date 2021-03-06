'use strict'

var dsf = require('dsf')

function getDsfData (item, callback) {
  if (!item) {
    return callback(new Error('Missing required input: item object'))
  }
  if (!item.personnummer || item.personnummer === '') {
    return callback(new Error('Missing required input: item.personnummer'))
  }
  if (!item.navn || item.navn === '') {
    return callback(new Error('Missing required input: item.navn'))
  }

  var nameList = item.navn.split(' ')
  var fodselsNummer = item.personnummer
  var lastName = nameList.pop()
  var firstName = nameList.join(' ')
  var options = {
    saksref: 'Referanse',
    foedselsnr: fodselsNummer,
    etternavn: lastName,
    fornavn: firstName
  }

  dsf(options, function (error, data) {
    if (error) {
      return callback(error, null)
    } else {
      if (!data.RESULT) {
        item.dsfData = data
      } else {
        item.dsfData = data.RESULT.HOV
      }
      return callback(null, item)
    }
  })
}

module.exports = getDsfData
