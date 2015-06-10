'use strict';

function VerboseLogger(verbose) {
  if (!(this instanceof VerboseLogger)) {
    return new LogWriter(file);
  }
  var self = this;
  self.verbose = verbose;

  this.log = function log(message){
    if (self.verbose) {
      console.log(message);
    }
  }
}

module.exports = VerboseLogger;