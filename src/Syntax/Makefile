#!/usr/bin/env bash -c make

ALL=TokenKinds.js

all: $(ALL)

clean:
	/bin/rm -f $(ALL)

%.js: %.def
	( \
	echo 'const Keyword = exports.Keyword = {};' && \
	echo 'const KEYWORD = (v) => (Keyword[v] = 1);' && \
	echo 'const DECL_KEYWORD = KEYWORD;' && \
	echo 'const EXPR_KEYWORD = KEYWORD;' && \
	echo 'const PAT_KEYWORD = KEYWORD;' && \
	echo 'const STMT_KEYWORD = KEYWORD;' && \
	echo 'const SWIFT_KEYWORD = KEYWORD;' && \
	echo '' && \
	egrep '^(DECL_KEYWORD|EXPR_KEYWORD|PAT_KEYWORD|STMT_KEYWORD|SWIFT_KEYWORD)\(' < $^ | perl -pe 's/^(.*)\((.*)\).*/$$1("$$2");/' ) > $@

# TokenKinds.def - Swift Tokenizer Metaprogramming
# @see https://github.com/swiftlang/swift/blob/main/include/swift/AST/TokenKinds.def

TokenKinds.def:
	curl -o $@ "https://raw.githubusercontent.com/swiftlang/swift/f1db5d3/include/swift/AST/TokenKinds.def"
