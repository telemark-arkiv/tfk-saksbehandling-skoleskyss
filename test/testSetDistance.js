'use strict';

var assert = require('assert');
var setDistance = require('../lib/setDistance');

describe('setDistance', function() {

  it('it requires an item object', function(done) {

    var item = false;

    setDistance(item, function(err, data) {
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

  it('it measures the walking distance from registered address', function(done) {

    var item = require('./data/automatic_yes_distance.json');

    setDistance(item, function(err, data) {
      if (err) {
        throw err;
      } else {
        assert.equal(data.measuredDistanceRegisteredAddress.distanceValue, item.measuredDistanceRegisteredAddress.distanceValue);
      }
      done();
    });
  });

});
