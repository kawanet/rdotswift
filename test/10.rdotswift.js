#!/usr/bin/env mocha -R spec

var assert = require("assert");
var fs = require("fs");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  var color = 'static let colorPrimary = UIColor(red: 0.247, green: 0.318, blue:0.71, alpha: 1)';
  var dimen = 'static let activity_horizontal_margin: CGFloat = 16';
  var string = 'static let app_name = "MyApp"';

  it("colors.xml", function(done) {
    var xml = fs.readFileSync(__dirname + "/values/colors.xml");
    assert.ok(xml);
    rdotswift(xml, function(err, swift) {
      assert.ok(!err, err);
      assert.ok(swift);
      assert.ok(swift.indexOf(color) > -1);
      done();
    });
  });

  it("dimens.xml", function(done) {
    var xml = fs.readFileSync(__dirname + "/values/dimens.xml");
    assert.ok(xml);
    rdotswift(xml, function(err, swift) {
      assert.ok(!err, err);
      assert.ok(swift);
      assert.ok(swift.indexOf(dimen) > -1);
      done();
    });
  });

  it("strings.xml", function(done) {
    var xml = fs.readFileSync(__dirname + "/values/strings.xml");
    assert.ok(xml);
    rdotswift(xml, function(err, swift) {
      assert.ok(!err, err);
      assert.ok(swift);
      assert.ok(swift.indexOf(string) > -1);
      done();
    });
  });

  it("format.swift", function(done) {
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
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf(color) > -1);
    assert.ok(swift.indexOf(dimen) > -1);
    assert.ok(swift.indexOf(string) > -1);
    done();
  });
});
