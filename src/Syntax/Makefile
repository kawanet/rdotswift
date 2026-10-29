#!/usr/bin/env bash -c make

ALL=TokenKinds.js

all: $(ALL)

clean:
	/bin/rm -f $(ALL)

%.js: %.def
	egrep '^[A-Z_]*KEYWORD\(' < $^ | egrep -v '^POUND_KEYWORD\(' | perl -pe 's/^.*\((.*)\).*/KEYWORD("$$1");/; BEGIN { print "function KEYWORD(v) { exports[v]=1; }\n" }' > $@

# TokenKinds.def - Swift Tokenizer Metaprogramming
# @see https://github.com/swiftlang/swift/blob/main/include/swift/AST/TokenKinds.def

TokenKinds.def:
	curl -o $@ "https://raw.githubusercontent.com/swiftlang/swift/f1db5d3/include/swift/AST/TokenKinds.def"
