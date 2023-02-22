#!/usr/bin/env mocha -R spec

const assert = require("assert");
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {

  /**
   * @code
   * <resources>
   *   <string name="slash">"[\\]"</string>
   *   <string name="newline">"[\n]"</string>
   *   <string name="double-quote">"[\"]"</string>
   *   <string name="single-quote">"[\']"</string>
   * </resources>
   */

  const R = {
    "string": {
      "slash": "[\\]",
      "newline": "[\n]",
      "double-quote": "[\"]",
      "single-quote": "[']"
    }
  };

  it("backslash", function() {
    const swift = rdotswift.format(R);
    assert.ok(swift);

    // [\]
    // static let slash = "[\\]"
    assert.ok(swift.indexOf('static let slash = "[\\\\]"') > -1);

    // [\n]
    // static let newline = "[\n]"
    assert.ok(swift.indexOf('static let newline = "[\\n]"') > -1);

    // ["]
    // static let double_quote = "[\"]"
    assert.ok(swift.indexOf('static let double_quote = "[\\"]"') > -1);

    // [']
    // static let single_quote = "[']"
    assert.ok(swift.indexOf('static let single_quote = "[\']"') > -1);
  });
});
