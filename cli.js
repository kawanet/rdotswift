#!/usr/bin/env node

var fs = require("fs");
var rdotswift = require("./lib/rdotswift");

function main() {
  var filemap = getFileMap(arguments);
  var args = Object.keys(filemap);
  if (!args.length) {
    var cmd = process.argv[1].replace(/^.*\//, "");
    return error("Usage: " + cmd + " app/src/*/res/values/*.xml");
  }
  var cnt = 0;
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

    console.warn("reading:", file);
    fs.readFile(file, _readFileSync);

    function _readFileSync(err, xml) {
      if (err || !xml) return end(err);
      rdotswift(xml, _rdotswift);
    }

    function _rdotswift(err, swift) {
      if (err) return end(err);

      var out = filemap[file];
      out = out.replace(/(\.xml)?$/, ".swift");

      if (!swift) {
        console.warn("skipped:", out);
        return next();
      }

      var short = out.replace(/^.*\//, "");
      swift = "//  " + short + "\n" + swift;

      cnt++;
      console.warn("writing:", out);
      fs.writeFile(out, swift, next);
    }
  }

  function end(err) {
    if (err) return error(err);

    if (!cnt) return error("nothing generated");

    copy();
  }

  function copy() {
    var src = __dirname + "/templates/R.swift";
    var dest = "R.swift";
    console.warn("copying:", dest);
    fs.writeFileSync(dest, fs.readFileSync(src));
  }
}

function getFileMap(args) {
  var map = {};
  var list = [];
  Array.prototype.forEach.call(args, split);

  var offset;
  for (offset = 0; ;) {
    var maxlen = list.reduce(length, 0);
    if (!maxlen) break;
    var count = list.reduce(exist, {});
    var keys = Object.keys(count);
    if (keys.length === 1) {
      list.forEach(splice);
    } else {
      offset++;
    }
  }
  Object.keys(map).forEach(join);

  return map;

  function split(key) {
    if (!key) return;
    var array = map[key] = key.replace(/^\/+/, "").split(/\/+/);
    list.push(array);
  }

  function length(max, array) {
    if (array.length - 1 === offset) return;
    var val = array[offset];
    var len = val && val.length;
    return Math.max(max, len);
  }

  function exist(out, array) {
    var val = array[offset];
    out[val] |= 0;
    out[val]++;
    return out;
  }

  function splice(array) {
    array.splice(offset, 1);
  }

  function join(key) {
    map[key] = "R+" + map[key].join("+");
  }
}

main.apply(null, Array.prototype.slice.call(process.argv, 2));
