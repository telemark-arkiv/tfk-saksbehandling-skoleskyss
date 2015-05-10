'use strict';

var assert = require('assert');
var setStatus = require('../lib/setStatus');

describe('setStatus', function() {

  it('it requires an item object', function(done) {

    var item = false;

    setStatus(item, function(err, data) {
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
      sokegrunnlag: false
    };

    setStatus(item, function(err, data) {
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

  it('it requires item.measuredDistanceRegisteredAddress to exists', function(done) {

    var item = {
      sokegrunnlag: true,
      measuredDistanceRegisteredAddress: false
    };

    setStatus(item, function(err, data) {
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

  it('it sets item.behandlingsStatus to Automatic given the right input', function(done) {

    var item = require('./data/automatic_no_distance_short.json');

    setStatus(item, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        assert.equal(data.behandlingsStatus, 'Automatic');
      }
      done();
    });
  });

  it('it sets item.behandlingsStatus to Manual given the right input', function(done) {

    var item = require('./data/manual_alternative_address.json');

    setStatus(item, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        assert.equal(data.behandlingsStatus, 'Manual');
      }
      done();
    });
  });

});