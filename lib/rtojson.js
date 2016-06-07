// rtojson.js

var cheerio = require("cheerio");

module.exports = rtojson;

/**
 * parse resource XML
 *
 * @param xml {String|Buffer}
 * @param callback {Function} function(err, R) {...}
 */

function rtojson(xml, callback) {
  var $ = cheerio.load(xml, {
    normalizeWhitespace: true,
    xmlMode: true
  });

  var R = {};
  $("resources > *").each(function(idx, e) {
    var $e = $(e);
    var type = e.name;
    if (!type) return;
    var hash = R[type] || (R[type] = {});
    var name = $e.attr("name");
    hash[name] = $e.text();
  });

  if (callback) return callback(null, R);
}
