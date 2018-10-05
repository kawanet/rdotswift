#!/usr/bin/env bash -c make

ALL=TokenKinds.js

all: $(ALL)

clean:
	/bin/rm -f $(ALL)

%.js: %.def
	egrep '^[A-Z_]*KEYWORD' < $^ | perl -pe 's/^.*\((.*)\).*/KEYWORD("$$1");/; BEGIN { print "function KEYWORD(v) { exports[v]=1; }\n" }' > $@

TokenKinds.def:
	curl -o $@ "https://raw.githubusercontent.com/apple/swift/7a4aeed5/include/swift/Syntax/TokenKinds.def"
