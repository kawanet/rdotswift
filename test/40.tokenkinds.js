#!/usr/bin/env mocha -R spec

var assert = require("assert");
var rdotswift = require("../rdotswift");
var TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  var R = {
    string: {
      "associatedtype": "DECL_KEYWORD",
      "undef": "SIL_KEYWORD",
      "defer": "STMT_KEYWORD",
      "as": "EXPR_KEYWORD",
      "__FILE__": "KEYWORD",
      "_": "PAT_KEYWORD",
      "keyPath": "POUND_KEYWORD",
      "sourceLocation": "POUND_DIRECTIVE_KEYWORD",
      "if": "POUND_COND_DIRECTIVE_KEYWORD"
    }
  };

  it("TokenKinds", function(done) {
    var swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('static let `associatedtype` = "DECL_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `undef` = "SIL_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `defer` = "STMT_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `as` = "EXPR_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `__FILE__` = "KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `_` = "PAT_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `keyPath` = "POUND_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `sourceLocation` = "POUND_DIRECTIVE_KEYWORD"') > -1);
    assert.ok(swift.indexOf('static let `if` = "POUND_COND_DIRECTIVE_KEYWORD"') > -1);
    done();
  });
});
