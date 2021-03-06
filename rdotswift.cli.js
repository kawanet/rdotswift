#!/usr/bin/env node

var fs = require("fs");
var options = require("process.argv")(process.argv.slice(2))();
var rdotjson = require("rdotjson");

var rdotswift = require("./rdotswift");
var CLASS = "class";
var IF = "if";

main();

function main() {
  var args = options["--"] || [];
  if (!Object.keys(options).length) {
    var cmd = process.argv[1].replace(/^.*\//, "");
    return error("Usage: " + cmd + " app/src/main/res/values/*.xml --output=R.swift");
  }
  var R;
  var buf = [];
  var optionIF = options[IF];

  if (options[CLASS] === true) {
    options[CLASS] = "R"; // compat
  }

  if (options.merge) {
    options.R = R = {};
  }

  if (!options.extension) {
    append(); // load empty XML at first
  }

  next();

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
    if (!options.merge) options.source = !isSTDIN && file.replace(/^.*\//, "");
    console.warn("reading: " + (isSTDIN ? "(stdin)" : file));
    var stream = isSTDIN ? process.stdin : fs.createReadStream(file);
    rdotjson(stream, options, parsed);
  }

  function parsed(err, R) {
    if (err) return end(err);
    if (!options.merge) append(R);
    next();
  }

  function append(R) {
    var isFirst = !buf.length;
    var isLast = !args.length;
    options.header = isFirst;
    options.extension = options.extension || !isFirst;
    options[IF] = isFirst && optionIF;
    options.endif = (isLast && optionIF) || false;
    var swift = rdotswift.format(R || {}, options);
    buf.push(swift);
  }

  function end(err) {
    if (err) return error(err);
    if (options.merge) append(R);
    if (!buf.length) return error("nothing generated");
    var output = options.output || "-";
    var isSTDOUT = (output === "-");
    console.warn("writing: " + (isSTDOUT ? "(stdout)" : output));
    var out = isSTDOUT ? process.stdout : fs.createWriteStream(output);
    out.write(buf.join("\n"));
    if (!isSTDOUT) out.end();
  }
}
