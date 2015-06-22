'use strict';

function createPipeline(item, callback) {
  var thru = require('thru');
  var pipeline = thru();
  var prepareItem = require('./lib/prepareItem');
  var lookupDSF = require('./lib/lookupDSF');
  var geocodeFolkeregistrertAdresse = require('./lib/geocodeFolkeregistrertAdresse');
  var geocodeAlternativAdresse = require('./lib/geocodeAlternativAdresse');
  var lookupGnrBnrFolkeRegistrert = require('./lib/lookupGnrBnrFolkeregistrert');
  var lookupGnrBnrAlternative = require('./lib/lookupGnrBnrAlternative');
  var checkNSBTransport = require('./lib/checkNSBTransport');
  var checkTBRTransport = require('./lib/checkTBRTransport');
  var setMeasurementAddresses = require('./lib/setMeasurementAddresses');
  var measureDistanceRegistered = require('./lib/measureDistanceRegistered');
  var measureDistanceAlternative = require('./lib/measureDistanceAlternative');
  var doSaksbehandling = require('./lib/doSaksbehandling');
  var cleanupItem = require('./lib/cleanupItem');
  var writeToFile = require('./lib/writeToFile');

  pipeline
    .pipe(prepareItem)
    .pipe(lookupDSF)
    .pipe(geocodeFolkeregistrertAdresse)
    .pipe(geocodeAlternativAdresse)
    .pipe(lookupGnrBnrFolkeRegistrert)
    .pipe(lookupGnrBnrAlternative)
    .pipe(checkNSBTransport)
    .pipe(checkTBRTransport)
    .pipe(setMeasurementAddresses)
    .pipe(measureDistanceRegistered)
    .pipe(measureDistanceAlternative)
    .pipe(doSaksbehandling)
    .pipe(cleanupItem)
    .pipe(writeToFile);

  writeToFile.on('finish', function() {
    return callback(null, 'File ' + item._id + '.json' + ' written.');
  });

  pipeline.write(JSON.stringify(item));

}

module.exports = createPipeline;