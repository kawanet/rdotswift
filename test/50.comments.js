#!/usr/bin/env mocha -R spec

var assert = require("assert");
var fs = require("fs");
var rdotjson = require("rdotjson");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  var xml;

  it("values.xml", function(done) {
    xml = fs.readFileSync(__dirname + "/values/values.xml");
    assert.ok(xml);
    done();
  });

  it("{comment: null}", function(done) {
    rdotjson(xml, {comment: null}, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      var swift = rdotswift.format(R);
      checkSwift(swift);

      done();
    });
  });

  it("{comment: 'post'}", function(done) {
    rdotjson(xml, {comment: 'post'}, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      assert.equal(R.bool.screen_small.comment + "", "before bool,between bool", "R.bool.screen_small");

      assert.equal(R.string.action_settings.comment + "", "after string,before array", "R.string.action_settings");

      var swift = rdotswift.format(R);
      checkSwift(swift);
      checkBefore(swift);
      checkAfter(swift);
      checkBetween(swift);

      done();
    });
  });

  it("{comment: 'pre'},", function(done) {
    rdotjson(xml, {comment: 'pre'}, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      assert.equal(R.bool.screen_small.comment + "", "before bool", "R.bool.screen_small");

      assert.equal(R.string.action_settings.comment + "", "between string", "R.string.action_settings");

      var swift = rdotswift.format(R);
      checkSwift(swift);
      checkBefore(swift);
      checkAfter(swift);
      checkBetween(swift);

      done();
    });
  });

  it("{comment: 'right'},", function(done) {
    rdotjson(xml, {comment: 'right'}, function(err, R) {
      assert.ok(!err, err);
      assert.ok(R);
      checkAll(R);

      assert.equal(R.bool.screen_small.comment + "", "between bool", "R.bool.screen_small");

      assert.equal(R.string.app_name.comment + "", "between string", "R.string.app_name");

      var swift = rdotswift.format(R);
      checkSwift(swift);
      checkBetween(swift);

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
  assert.equal(R.array.bits[0], 4);
  assert.equal(R.array.planets_array[0], "Mercury");
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

  assert.ok(swift.indexOf('/// 4') > -1);
  assert.ok(swift.indexOf('static let bits = [4]') > -1);

  assert.ok(swift.indexOf('/// Mercury') > -1);
  assert.ok(swift.indexOf('static let planets_array = ["Mercury"]') > -1);
}

function checkBefore(swift) {
  assert.ok(swift.indexOf('/// before bool') > -1);
  assert.ok(swift.indexOf('/// before color') > -1);
  assert.ok(swift.indexOf('/// before dimen') > -1);
  assert.ok(swift.indexOf('/// before integer') > -1);
  assert.ok(swift.indexOf('/// before string') > -1);
  assert.ok(swift.indexOf('/// before array') > -1);
}

function checkAfter(swift) {
  assert.ok(swift.indexOf('/// after bool') > -1);
  assert.ok(swift.indexOf('/// after color') > -1);
  assert.ok(swift.indexOf('/// after dimen') > -1);
  assert.ok(swift.indexOf('/// after integer') > -1);
  assert.ok(swift.indexOf('/// after string') > -1);
  assert.ok(swift.indexOf('/// after array') > -1);
}

function checkBetween(swift) {
  assert.ok(swift.indexOf('/// between bool') > -1);
  assert.ok(swift.indexOf('/// between string') > -1);
  assert.ok(swift.indexOf('/// between array') > -1);
}
