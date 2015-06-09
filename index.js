'use strict';

function createPipeline(item, callback) {
  var thru = require('thru');
  var pipeline = thru();
  var prepareItem = require('./lib/prepareItem');
  var lookupDSF = require('./lib/lookupDSF');
  var geocodeFolkeregistrertAdresse = require('./lib/geocodeFolkeregistrertAdresse');
  var lookupGnrBnrFolkeRegistrert = require('./lib/lookupGnrBnrFolkeregistrert');
  var lookupGnrBnrAlternative = require('./lib/lookupGnrBnrAlternative');
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
    .pipe(lookupGnrBnrFolkeRegistrert)
    .pipe(lookupGnrBnrAlternative)
    .pipe(setMeasurementAddresses)
    .pipe(measureDistanceRegistered)
    .pipe(measureDistanceAlternative)
    .pipe(doSaksbehandling)
    .pipe(cleanupItem)
    .pipe(writeToFile);

  writeToFile.on('finish', function(){
    return callback(null, 'File ' + item._id + '.json' + ' written.');
  });

  pipeline.write(JSON.stringify(item));

}

module.exports = createPipeline;