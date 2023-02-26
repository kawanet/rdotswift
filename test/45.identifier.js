#!/usr/bin/env mocha -R spec

const assert = require("assert").strict;
const rdotswift = require("../rdotswift");
const TITLE = __filename.replace(/^.*\//, "") + ":";

/* jshint mocha:true */

describe(TITLE, function() {
  const R = {
    string: {
      "foo.foo": "FOO.FOO",
      "bar\uFE00bar": "BAR\uFE00BAR",
      "baz..\uFE00\uFE00baz": "BAZ..\uFE00\uFE00BAZ"
    }
  };

  it("Identifier", function(done) {
    const swift = rdotswift.format(R);
    assert.ok(swift);
    assert.ok(swift.indexOf('static let foo_foo = "FOO.FOO"') > -1);
    assert.ok(swift.indexOf('static let bar_bar = "BAR\uFE00BAR"') > -1);
    assert.ok(swift.indexOf('static let baz____baz = "BAZ..\uFE00\uFE00BAZ"') > -1);
    done();
  });
});
