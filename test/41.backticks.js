const {describe, it} = require("node:test");
const assert = require("node:assert").strict;
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

describe(TITLE, function() {
  const R = {
    string: {
      "valueOf": "VALUEOF",
      "toString": "TOSTRING",
      "Type": "TYPE",
      "Protocol": "PROTOCOL",
    }
  };

  it("backticks", function() {
    const swift = rdotswift.format(R);
    assert.ok(swift);

    assert.ok(swift.indexOf('static let valueOf = "VALUEOF"') > -1);
    assert.ok(swift.indexOf('static let toString = "TOSTRING"') > -1);

    /**
     * @see https://github.com/swiftlang/swift/blob/main/lib/Sema/TypeCheckDeclPrimary.cpp
     */
    assert.ok(swift.indexOf('static let `Type` = "TYPE"') > -1);
    assert.ok(swift.indexOf('static let `Protocol` = "PROTOCOL"') > -1);
  });
});
