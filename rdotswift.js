// rdotswift.js

exports.format = format;

var CLASS = "class";
var IF = "if";

/**
 * generates Swift source code
 *
 * @param R {Object}
 * @param [options] {Object}
 * @returns {String}
 */

function format(R, options) {
  if (!options) options = {};
  var out = [];
  var header = (options.header !== false);

  if (header) {
    out.push("// Generated by rdotswift <https://github.com/kawanet/rdotswift>");
    out.push("");
  }

  if (options[IF]) {
    out.push("#if " + options[IF]);
    out.push("");
  }

  if (header) {
    out.push("import UIKit");
    out.push("");
  }

  if (!options.extension) {
    var className = options[CLASS] || "R";
    out.push("final class " + className + " {");
    ["bool", "color", "dimen", "string"].map(function(type, idx) {
      if (idx) out.push("");
      out.push("    final class " + type + " {");
      out.push("    }");
    });
    out.push("}");
    out.push("");
  }

  if (options.source) {
    out.push("// " + options.source);
    out.push("");
  }

  out = out.concat(bool(R.bool, options));
  out = out.concat(color(R.color, options));
  out = out.concat(dimen(R.dimen, options));
  out = out.concat(string(R.string, options));

  if (options.endif || (options[IF] && options.endif !== false)) {
    out.push("#endif");
    out.push("");
  }

  return out.join("\n");
}

function string(src, options) {
  var rows = [];
  for (var key in src) {
    var val = src[key];
    rows.push(comment(val));
    val = JSON.stringify(val + "").replace(/\\\\/g, "\\");
    var row = "    static let " + key + " = " + val;
    rows.push(row);
  }
  return extension("string", rows, options);
}

function color(src, options) {
  var rows = [];
  for (var key in src) {
    var val = src[key];
    if (!val) return;
    if (!val.match(/^#\w+$/)) return;
    var rgb = parseInt(val.substr(1), 16);
    var blue = rgb & 0xFF;
    rgb >>= 8;
    var green = rgb & 0xFF;
    rgb >>= 8;
    var red = rgb & 0xFF;
    rows.push(comment(val));
    var row = "    static let " + key + " = " +
      "UIColor(red: " + c(red) + ", green: " + c(green) + ", blue:" + c(blue) + ", alpha: 1)";
    rows.push(row);
  }
  return extension("color", rows, options);

  function c(val) {
    return Math.round(val / 255 * 1000) / 1000;
  }
}

function dimen(src, options) {
  var rows = [];
  for (var key in src) {
    var val = src[key];
    if (!val) return;
    rows.push(comment(val));
    var row = "    static let " + key + ": CGFloat = " + parseInt(val);
    rows.push(row);
  }
  return extension("dimen", rows, options);
}

function bool(src, options) {
  var rows = [];
  for (var key in src) {
    var val = src[key];
    rows.push(comment(val));
    var row = "    static let " + key + " = " + val;
    rows.push(row);
  }
  return extension("bool", rows, options);
}

function extension(type, rows, options) {
  if (rows.length) {
    var className = options[CLASS] || "R";
    className += "." + type;
    rows.unshift("extension " + className + " {");
    rows.push("}");
    rows.push("");
  }
  return rows;
}

function comment(val) {
  if (val === "") val = "(empty)";
  if ("string" === typeof val) {
    val = val.replace(/\*\//g, "*\\/");
    val = val.replace(/\n/g, "\\n");
  }
  return "    /** " + val + " */";
}