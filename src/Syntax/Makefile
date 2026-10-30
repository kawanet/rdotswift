#!/usr/bin/env bash -c make

ALL=TokenKinds.js

all: $(ALL)

clean:
	/bin/rm -f $(ALL)

%.js: %.def
	( \
	echo 'const Keyword = exports.Keyword = {};' && \
	echo 'const KEYWORD = (v) => (Keyword[v] = 1);' && \
	egrep '^[A-Z_]*KEYWORD\(' < $^ | egrep -v '^(POUND|SIL)_' | perl -pe 's/^.*\((.*)\).*/KEYWORD("$$1");/;' ) > $@

# TokenKinds.def - Swift Tokenizer Metaprogramming
# @see https://github.com/swiftlang/swift/blob/main/include/swift/AST/TokenKinds.def

TokenKinds.def:
	curl -o $@ "https://raw.githubusercontent.com/swiftlang/swift/f1db5d3/include/swift/AST/TokenKinds.def"
