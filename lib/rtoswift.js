// rtoswift.js

var rtojson = require("./rtojson");

module.exports = rtoswift;

/**
 * generates Swift source code from resource XML
 *
 * @param xml {String|Buffer}
 * @param callback {Function} function(err, swift) {...}
 */

function rtoswift(xml, callback) {
  return rtojson(xml, then);

  function then(err, R) {
    if (err) {
      if (callback) return callback(err);
      throw err;
    }

    var cnt = 0;
    var rows = [];
    rows.push("import UIKit");
    rows.push("");
    string(R.string);
    color(R.color);
    var swift = cnt ? rows.join("\n") : "";
    if (callback) return callback(null, swift);

    function string(src) {
      if (!src) return;
      rows.push("extension R.string {");
      for (var key in src) {
        var val = src[key];
        var comment = "    /** " + val + " */";
        rows.push(comment);
        var row = "    static let " + key + " = " + JSON.stringify(val + "");
        rows.push(row);
        cnt++;
      }
      rows.push("}");
      rows.push("");
    }

    function color(src) {
      if (!src) return;
      rows.push("extension R.color {");
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
        var comment = "    /** " + val + " */";
        rows.push(comment);
        var row = "    static let " + key + " = " +
          "UIColor(red: " + c(red) + ", green: " + c(green) + ", blue:" + c(blue) + ", alpha: 1)";
        rows.push(row);
        cnt++;
      }
      rows.push("}");
      rows.push("");
    }
  }

  function c(val) {
    return Math.round(val / 255 * 1000) / 1000;
  }
}