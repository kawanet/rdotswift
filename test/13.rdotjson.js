const {describe, it} = require("node:test");
const assert = require("node:assert").strict;
const rdotjson = require("rdotjson");
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

describe(TITLE, function() {
  const xml = [
    '<resources>',
    '  <string name="tab">a\\tb</string>',
    '  <string name="star">x \\u2605 y</string>',
    '  <string name="nbsp">10 km</string>',
    '  <string name="control">a\\u0001b</string>',
    '  <string-array name="items"><item>a\\tb</item><item>\\u2605</item></string-array>',
    '</resources>'
  ].join("\n");

  it("string", {timeout: 1000}, () => new Promise((resolve, reject) => {
    const done = (err) => (err ? reject(err) : resolve());
    rdotjson(xml, function(err, R) {
      assert.ok(!err, err);
      const swift = rdotswift.format(R);
      assert.ok(swift);

      // \t in the XML is a tab, written back as \t
      assert.ok(swift.indexOf('static let tab = "a\\tb"') > -1);

      // \uXXXX in the XML is the character itself
      assert.ok(swift.indexOf('static let star = "x ★ y"') > -1);

      // a non-breaking space is kept
      assert.ok(swift.indexOf('static let nbsp = "10 km"') > -1);

      // a control character needs the Swift spelling
      assert.ok(swift.indexOf('static let control = "a\\u{0001}b"') > -1);

      done();
    });
  }));

  it("array", {timeout: 1000}, () => new Promise((resolve, reject) => {
    const done = (err) => (err ? reject(err) : resolve());
    rdotjson(xml, function(err, R) {
      assert.ok(!err, err);
      const swift = rdotswift.format(R);
      assert.ok(swift);
      assert.ok(swift.indexOf('static let items = ["a\\tb","★"]') > -1);
      done();
    });
  }));
});
