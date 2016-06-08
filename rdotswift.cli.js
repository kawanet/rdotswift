#!/usr/bin/env node

var fs = require("fs");
var options = require("process.argv")(process.argv.slice(2))();

var rdotswift = require("./rdotswift");
var CLASS = "class";

main();

function main() {
  var args = options["--"] || [];
  if (!Object.keys(options).length) {
    var cmd = process.argv[1].replace(/^.*\//, "");
    return error("Usage: " + cmd + " app/src/main/res/values/*.xml --output=R.swift");
  }
  var buf = [];

  if (options[CLASS]) {
    _readFileSync(null, "\n");
  } else {
    next();
  }

  function error(err) {
    console.warn((err instanceof Error) ? err.stack : err + "");
    process.exit(1);
    return;
  }

  function next(err) {
    if (err) return end(err);

    if (!args.length) return end();
    var file = args.shift();
    var isSTDIN = (file === "-");
    options.source = !isSTDIN && file.replace(/^.*\//, "");
    console.warn("reading: " + (isSTDIN ? "(stdin)" : file));
    var stream = isSTDIN ? process.stdin : fs.createReadStream(file);
    _readFileSync(null, stream);
  }

  function _readFileSync(err, xml) {
    if (err || !xml) return end(err);
    var isFirst = !buf.length;
    options.header = isFirst;
    options[CLASS] = isFirst && (options[CLASS] || !options.extension);
    rdotswift(xml, options, _rdotswift);
  }

  function _rdotswift(err, swift) {
    if (err) return end(err);
    buf.push(swift);
    next();
  }

  function end(err) {
    if (err) return error(err);

    if (!buf.length) return error("nothing generated");

    var output = options.output || "-";
    var isSTDOUT = (output === "-");
    console.warn("writing: " + (isSTDOUT ? "(stdout)" : output));
    var out = isSTDOUT ? process.stdout : fs.createWriteStream(output);
    out.write(buf.join("\n"));
    if (!isSTDOUT) out.end();
  }
}
