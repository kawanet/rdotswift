#!/usr/bin/env mocha -R spec

const assert = require("assert").strict;
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  const R = {
    string: {
      "inout": "SWIFT_KEYWORD",
      "associatedtype": "DECL_KEYWORD",
      "undef": "SIL_KEYWORD",
      "defer": "STMT_KEYWORD",
      "if": "STMT_KEYWORD",
      "as": "EXPR_KEYWORD",
      "__FILE__": "KEYWORD",
      "_": "PAT_KEYWORD",
      "filePath": "POUND_KEYWORD",
      "sourceLocation": "POUND_DIRECTIVE_KEYWORD",
      "endif": "POUND_COND_DIRECTIVE_KEYWORD",
    }
  };

  it("TokenKinds", function(done) {
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('static let `inout` = "SWIFT_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `associatedtype` = "DECL_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `undef` = "SIL_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `defer` = "STMT_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `if` = "STMT_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `as` = "EXPR_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let __FILE__ = "KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `_` = "PAT_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let filePath = "POUND_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let sourceLocation = "POUND_DIRECTIVE_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let endif = "POUND_COND_DIRECTIVE_KEYWORD"') > -1);
    done();
  });
});
