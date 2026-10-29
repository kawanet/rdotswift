const {describe, it} = require("node:test");
const assert = require("node:assert").strict;
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

describe(TITLE, function() {
  it("string-array", function() {
    const R = {
      "array": {
        "planets_array": [
          "Mercury",
          "Venus",
          "Earth",
          "Mars"
        ]
      }
    };
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('extension R.array') > -1);
    assert.ok(swift.indexOf('static let planets_array = ["Mercury","Venus","Earth","Mars"]') > -1);
  });
});
