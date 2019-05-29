#!/usr/bin/env mocha -R spec

var assert = require("assert");
var fs = require("fs");
var rdotjson = require("rdotjson");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  var xml;

  it("comments.xml", function(done) {
    xml = fs.readFileSync(__dirname + "/values/comments.xml");
    assert.ok(xml);

    rdotjson(xml, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      var swift = rdotswift.format(R);
      checkSwift(swift);

      done();
    });
  });

  it("includeComments:true", function(done) {
    rdotjson(xml, {includeComments: true}, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      assert.equal(R.bool.screen_small.comment + "", "before bool,after bool,before color");

      assert.equal(R.string.app_name.comment + "", "after string");

      var swift = rdotswift.format(R);
      checkSwift(swift);
      checkComments(swift);

      done();
    });
  });

  it("includeComments:pre", function(done) {
    rdotjson(xml, {includeComments: "pre"}, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      assert.equal(R.bool.screen_small.comment + "", "before bool");

      assert.equal(R.string.app_name.comment + "", "after integer,before string,after string");

      var swift = rdotswift.format(R);
      checkSwift(swift);
      checkComments(swift);

      done();
    });
  });
});

function checkAll(R) {
  // console.warn(R);

  assert.ok(R.bool);
  assert.ok(R.color);
  assert.ok(R.dimen);
  assert.ok(R.integer);
  assert.ok(R.string);

  assert.equal(R.bool.screen_small, true);
  assert.equal(R.color.colorPrimary + "", "#3F51B5");
  assert.equal(R.dimen.activity_horizontal_margin, "16dp");
  assert.equal(R.integer.max_speed, 75);
  assert.equal(R.string.app_name, "MyApp");
}

function checkSwift(swift) {
  // console.warn(swift);

  assert.ok(swift.indexOf('/// true') > -1);
  assert.ok(swift.indexOf('static let screen_small = true') > -1);

  assert.ok(swift.indexOf('/// #3F51B5') > -1);
  assert.ok(swift.indexOf('static let colorPrimary = UIColor(red: 0.247, green: 0.318, blue:0.71, alpha: 1)') > -1);

  assert.ok(swift.indexOf('/// 16dp') > -1);
  assert.ok(swift.indexOf('static let activity_horizontal_margin: CGFloat = 16') > -1);

  assert.ok(swift.indexOf('/// 75') > -1);
  assert.ok(swift.indexOf('static let max_speed = 75') > -1);

  assert.ok(swift.indexOf('/// MyApp') > -1);
  assert.ok(swift.indexOf('static let app_name = "MyApp"') > -1);
}

function checkComments(swift) {
  assert.ok(swift.indexOf('/// before bool') > -1);
  assert.ok(swift.indexOf('/// after bool') > -1);
  assert.ok(swift.indexOf('/// before color') > -1);
  assert.ok(swift.indexOf('/// after color') > -1);
  assert.ok(swift.indexOf('/// before dimen') > -1);
  assert.ok(swift.indexOf('/// after dimen') > -1);
  assert.ok(swift.indexOf('/// before integer') > -1);
  assert.ok(swift.indexOf('/// after integer') > -1);
  assert.ok(swift.indexOf('/// before string') > -1);
  assert.ok(swift.indexOf('/// after string') > -1);
}