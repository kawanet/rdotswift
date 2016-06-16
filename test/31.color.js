#!/usr/bin/env mocha -R spec

var assert = require("assert");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  it("color", function(done) {
    var R = {
      "color": {
        "rgb": "#369",
        "argb": "#CF03",
        "rrggbb": "#6699CC",
        "aarrggbb": "#FF003366"
      }
    };
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('extension R.color') > -1);
    assert.ok(swift.indexOf('static let rgb = UIColor(red: 0.2, green: 0.4, blue:0.6, alpha: 1') > -1);
    assert.ok(swift.indexOf('static let argb = UIColor(red: 1, green: 0, blue:0.2, alpha: 0.8') > -1);
    assert.ok(swift.indexOf('static let rrggbb = UIColor(red: 0.4, green: 0.6, blue:0.8, alpha: 1') > -1);
    assert.ok(swift.indexOf('static let aarrggbb = UIColor(red: 0, green: 0.2, blue:0.4, alpha: 1') > -1);
    done();
  });
});
