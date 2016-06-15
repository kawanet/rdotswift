#!/usr/bin/env mocha -R spec

var assert = require("assert");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("string-array", function(done) {
    var R = {
      "array": {
        "planets_array": [
          "Mercury",
          "Venus",
          "Earth",
          "Mars"
        ]
      }
    };
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('extension R.array') > -1);
    assert.ok(swift.indexOf('static let planets_array = ["Mercury","Venus","Earth","Mars"]') > -1);
    done();
  });
});
