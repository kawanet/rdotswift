#!/usr/bin/env mocha -R spec

var assert = require("assert");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  var R = {
    color: {
      colorPrimary: "#3F51B5"
    },
    dimen: {
      activity_horizontal_margin: "16dp"
    },
    string: {
      app_name: "MyApp"
    }
  };

  it("format()", function(done) {
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('#if DEBUG') < 0);
    assert.ok(swift.indexOf('import UIKit') > -1);
    assert.ok(swift.indexOf('final class R') > -1);
    assert.ok(swift.indexOf('extension R.color') > -1);
    assert.ok(swift.indexOf('static let colorPrimary = UIColor(red: 0.247, green: 0.318, blue:0.71, alpha: 1)') > -1);
    assert.ok(swift.indexOf('extension R.dimen') > -1);
    assert.ok(swift.indexOf('static let activity_horizontal_margin: CGFloat = 16') > -1);
    assert.ok(swift.indexOf('extension R.string') > -1);
    assert.ok(swift.indexOf('static let app_name = "MyApp"') > -1);
    assert.ok(swift.indexOf('#endif') < 0);
    done();
  });

  var opt_appkit = {"appkit": true};
  it(JSON.stringify(opt_appkit), function(done) {
    var swift = rdotswift.format(R, opt_appkit);
    assert.ok(swift);
    assert.ok(swift.indexOf('import AppKit') > -1);
    assert.ok(swift.indexOf('static let colorPrimary = NSColor(red: 0.247, green: 0.318, blue:0.71, alpha: 1)') > -1);
    done();
  });

  var opt_extension = {"extension": true};
  it(JSON.stringify(opt_extension), function(done) {
    var swift = rdotswift.format(R, opt_extension);
    assert.ok(swift);
    assert.ok(swift.indexOf('final class R') < 0);
    assert.ok(swift.indexOf('extension R.color') > -1);
    done();
  });

  var opt_class = {"class": "RRR"};
  it(JSON.stringify(opt_class), function(done) {
    var swift = rdotswift.format(R, opt_class);
    assert.ok(swift);
    assert.ok(swift.indexOf('final class RRR') > -1);
    assert.ok(swift.indexOf('extension RRR.color') > -1);
    done();
  });

  var opt_if = {"if": "DEBUG"};
  it(JSON.stringify(opt_if), function(done) {
    var swift = rdotswift.format(R, opt_if);
    assert.ok(swift);
    assert.ok(swift.indexOf('#if DEBUG') > -1);
    assert.ok(swift.indexOf('#endif') > -1);
    done();
  });
});
