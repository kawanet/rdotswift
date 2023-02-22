#!/usr/bin/env mocha -R spec

const assert = require("assert");
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("string-array", function(done) {
    const R = {
      "array": {
        "planets_array": [
          "Mercury",
          "Venus",
          "Earth",
          "Mars"
        ]
      }
    };
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('extension R.array') > -1);
    assert.ok(swift.indexOf('static let planets_array = ["Mercury","Venus","Earth","Mars"]') > -1);
    done();
  });
});
