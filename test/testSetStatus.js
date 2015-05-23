'use strict';

var assert = require('assert');
var setBehandlingsType = require('../lib/setBehandlingsType');

describe('setBehandlingsType', function() {

  it('it requires an item object', function(done) {

    var item = false;

    setBehandlingsType(item, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: item object/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires item.sokegrunnlag to exists', function(done) {

    var item = {
      sokegrunnlag: false,
      personnummer: "18117147130"
    };

    setBehandlingsType(item, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required param: item.sokegrunnlag/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires item.measuredDistanceRegisteredAddress to exists if sokegrunnlag is Avstand til skole', function(done) {

    var item = {
      sokegrunnlag: 'Avstand til skole',
      measuredDistanceRegisteredAddress: false,
      personnummer: "18117147130"
    };

    setBehandlingsType(item, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required param: item.measuredDistanceRegisteredAddress/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it sets item.behandlingsType to Automatic given distance as sokegrunnlag', function(done) {

    var item = require('./data/automatic_no_distance_long.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Automatic');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Automatic given distance as sokegrunnlag', function(done) {

    var item = require('./data/automatic_no_distance_short.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Automatic');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Automatic given boat as sokegrunnlag', function(done) {

    var item = require('./data/automatic_yes_boat.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Automatic');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Automatic given distance as sokegrunnlag', function(done) {

    var item = require('./data/automatic_yes_distance.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Automatic');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Manual given alternative address', function(done) {

    var item = require('./data/manual_alternative_address.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Manual');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Manual given measured distance', function(done) {

    var item = require('./data/manual_distance.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Manual');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Manual given Annet as sokegrunnlag', function(done) {

    var item = require('./data/manual_reason_other.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Manual');
      }
      done();
    });
  });

  it('it sets item.behandlingsType to Manual given school outside county', function(done) {

    var item = require('./data/manual_school_outside_county.json');

    setBehandlingsType(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.behandlingsType, 'Manual');
      }
      done();
    });
  });

});