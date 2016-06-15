#!/usr/bin/env mocha -R spec

var assert = require("assert");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("integer", function(done) {
    var R = {
      "integer": {
        "max_speed": 75,
        "min_speed": 5
      },
      "array": {
        "bits": [4, 8, 16, 32]
      }
    };
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('static let bits = [4,8,16,32]') > -1);
    assert.ok(swift.indexOf('static let max_speed = 75') > -1);
    done();
  });
});
