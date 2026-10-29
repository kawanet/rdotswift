#!/usr/bin/env node

const fs = require("fs");
const options = require("process.argv")(process.argv.slice(2))();
const rdotjson = require("rdotjson");

const rdotswift = require("./rdotswift");
const CLASS = "class";
const IF = "if";

main();

function main() {
  const args = options["--"] || [];
  if (!Object.keys(options).length) {
    const cmd = process.argv[1].replace(/^.*\//, "");
    return error("Usage: " + cmd + " app/src/main/res/values/*.xml --output=R.swift");
  }
  let R;
  const buf = [];
  const optionIF = options[IF];

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
    const file = args.shift();
    const isSTDIN = (file === "-");
    if (!options.merge) options.source = !isSTDIN && file.replace(/^.*\//, "");
    console.warn("reading: " + (isSTDIN ? "(stdin)" : file));
    const stream = isSTDIN ? process.stdin : fs.createReadStream(file);
    rdotjson(stream, options, parsed);
  }

  function parsed(err, R) {
    if (err) return end(err);
    if (!options.merge) append(R);
    next();
  }

  function append(R) {
    const isFirst = !buf.length;
    const isLast = !args.length;
    options.header = isFirst;
    options.extension = options.extension || !isFirst;
    options[IF] = isFirst && optionIF;
    options.endif = (isLast && optionIF) || false;
    const swift = rdotswift.format(R || {}, options);
    buf.push(swift);
  }

  function end(err) {
    if (err) return error(err);
    if (options.merge) append(R);
    if (!buf.length) return error("nothing generated");
    const output = options.output || "-";
    const isSTDOUT = (output === "-");
    console.warn("writing: " + (isSTDOUT ? "(stdout)" : output));
    const out = isSTDOUT ? process.stdout : fs.createWriteStream(output);
    out.write(buf.join("\n"));
    if (!isSTDOUT) out.end();
  }
}
