#!/usr/bin/env mocha -R spec

var assert = require("assert");
var fs = require("fs");
var rdotjson = require("rdotjson");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  var xml;

  it("{objectMode: true}", function(done) {
    xml = fs.readFileSync(__dirname + "/values/values.xml");
    assert.ok(xml);

    var options = {objectMode: true};

    rdotjson(xml, options, function(err, R) {
      assert.ok(!err, err);
      checkAll(R);

      var swift = rdotswift.format(R, options);
      checkSwift(swift);

      done();
    });
  });
});

function checkAll(R) {
  // console.warn(R);

  assert.equal(R.bool.screen_small.value, true);
  assert.equal(R.color.colorPrimary.value + "", "#3F51B5");
  assert.equal(R.dimen.activity_horizontal_margin.value, "16dp");
  assert.equal(R.integer.max_speed.value, 75);
  assert.equal(R.string.app_name.value, "MyApp");
  assert.equal(R.array.bits[0].value, 4);
  assert.equal(R.array.planets_array[0].value, "Mercury");
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
