#!/usr/bin/env mocha -R spec

var assert = require("assert");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("color", function(done) {
    var R = {
      "color": {
        "opaque_red": "#ff0000",
        "invisible_red": "#00ff0000",
        "translucent_red": "#80ff0000"
      }
    };
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('extension R.color') > -1);
    assert.ok(swift.indexOf('static let opaque_red = UIColor(red: 1, green: 0, blue:0, alpha: 1') > -1);
    assert.ok(swift.indexOf('static let invisible_red = UIColor(red: 1, green: 0, blue:0, alpha: 0') > -1);
    assert.ok(swift.indexOf('static let translucent_red = UIColor(red: 1, green: 0, blue:0, alpha: 0.5') > -1);
    done();
  });
});
