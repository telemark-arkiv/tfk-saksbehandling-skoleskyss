'use strict';

function verboseLog(verbose, message) {
  if (verbose) {
    console.log(message);
  }
}

module.exports = verboseLog;