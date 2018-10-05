/**
 * /// isOperatorStartCodePoint - Return true if the specified code point is a
 * /// valid start of an operator.
 * static bool isOperatorStartCodePoint(uint32_t C) {
 *   // ASCII operator chars.
 *   static const char OpChars[] = "/=-+*%<>!&|^~.?";
 *   if (C < 0x80)
 *     return memchr(OpChars, C, sizeof(OpChars) - 1) != 0;
 * 
 *   // Unicode math, symbol, arrow, dingbat, and line/box drawing chars.
 *   return (C >= 0x00A1 && C <= 0x00A7)
 *     || C == 0x00A9 || C == 0x00AB || C == 0x00AC || C == 0x00AE
 *     || C == 0x00B0 || C == 0x00B1 || C == 0x00B6 || C == 0x00BB
 *     || C == 0x00BF || C == 0x00D7 || C == 0x00F7
 *     || C == 0x2016 || C == 0x2017 || (C >= 0x2020 && C <= 0x2027)
 *     || (C >= 0x2030 && C <= 0x203E) || (C >= 0x2041 && C <= 0x2053)
 *     || (C >= 0x2055 && C <= 0x205E) || (C >= 0x2190 && C <= 0x23FF)
 *     || (C >= 0x2500 && C <= 0x2775) || (C >= 0x2794 && C <= 0x2BFF)
 *     || (C >= 0x2E00 && C <= 0x2E7F) || (C >= 0x3001 && C <= 0x3003)
 *     || (C >= 0x3008 && C <= 0x3030);
 * }
 */

exports.isOperatorStartCodePoint = new RegExp(/[/=\-+*%<>!&|^~.?\u00A1-\u00A7\u00A9\u00AB\u00AC\u00AE\u00B0\u00B1\u00B6\u00BB\u00BF\u00D7\u00F7\u2016\u2017\u2020-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u23FF\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3030]/g);

/**
 * /// isOperatorContinuationCodePoint - Return true if the specified code point
 * /// is a valid operator code point.
 * static bool isOperatorContinuationCodePoint(uint32_t C) {
 *   if (isOperatorStartCodePoint(C))
 *     return true;
 *
 *   // Unicode combining characters and variation selectors.
 *   return (C >= 0x0300 && C <= 0x036F)
 *       || (C >= 0x1DC0 && C <= 0x1DFF)
 *       || (C >= 0x20D0 && C <= 0x20FF)
 *       || (C >= 0xFE00 && C <= 0xFE0F)
 *       || (C >= 0xFE20 && C <= 0xFE2F)
 *       || (C >= 0xE0100 && C <= 0xE01EF);
 * }
 */

exports.isOperatorContinuationCodePoint = new RegExp(/[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE00-\uFE0F\uFE20-\uFE2F]/g);
