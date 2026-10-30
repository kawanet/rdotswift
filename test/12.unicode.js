const {describe, it} = require("node:test");
const assert = require("node:assert").strict;
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

describe(TITLE, function() {
  const R = {
    "string": {
      "tab": "[\t]",
      "star": "[★]",
      "nbsp": "[ ]",
      "control": "[\u0001]",
      "nul": "[\u0000]",
      "backspace": "[\b]",
      "formfeed": "[\f]",
      "literal": "[\\u0041]"
    },
    "array": {
      "items": ["[\u0002]", "[★]"]
    },
    "color": {
      "named": "red\u0003"
    }
  };

  it("string", function() {
    const swift = rdotswift.format(R);
    assert.ok(swift);

    // Swift spells a tab as \t, the same as JSON
    assert.ok(swift.indexOf('static let tab = "[\\t]"') > -1);

    // a character outside ASCII is written as it is
    assert.ok(swift.indexOf('static let star = "[★]"') > -1);
    assert.ok(swift.indexOf('static let nbsp = "[ ]"') > -1);

    // a control character is written as \u{XXXX}
    assert.ok(swift.indexOf('static let control = "[\\u{0001}]"') > -1);
    assert.ok(swift.indexOf('static let nul = "[\\u{0000}]"') > -1);

    // the comment line spells a control character as \u{XXXX} too
    assert.ok(swift.indexOf('/// [\\u{0001}]') > -1);
    assert.ok(swift.indexOf('/// [\\u{0000}]') > -1);
    assert.ok(swift.indexOf('/// [\\u{0008}]') > -1);
    assert.ok(swift.indexOf('static let backspace = "[\\u{8}]"') > -1);
    assert.ok(swift.indexOf('static let formfeed = "[\\u{C}]"') > -1);

    // a backslash followed by u in the text is not an escape
    assert.ok(swift.indexOf('static let literal = "[\\\\u0041]"') > -1);
  });

  it("array", function() {
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('static let items = ["[\\u{0002}]","[★]"]') > -1);
  });

  it("color", function() {
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('static let named = "red\\u{0003}"') > -1);
  });
});
