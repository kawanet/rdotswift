#!/usr/bin/env mocha -R spec

const assert = require("assert");
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("integer", function(done) {
    const R = {
      "integer": {
        "max_speed": 75,
        "min_speed": 5
      },
      "array": {
        "bits": [4, 8, 16, 32]
      }
    };
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('extension R.array') > -1);
    assert.ok(swift.indexOf('static let bits = [4,8,16,32]') > -1);
    assert.ok(swift.indexOf('extension R.integer') > -1);
    assert.ok(swift.indexOf('static let max_speed = 75') > -1);
    done();
  });
});
