'use strict'

function VerboseLogger (verbose) {
  if (!(this instanceof VerboseLogger)) {
    return new VerboseLogger(verbose)
  }
  var self = this
  self.verbose = verbose

  this.log = function log (message) {
    if (self.verbose) {
      console.log(message)
    }
  }
}

module.exports = VerboseLogger
