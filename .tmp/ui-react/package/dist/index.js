var styled = require('@emotion/styled');
var React = require('react');
var react = require('@emotion/react');
var react$1 = require('@floating-ui/react');
var framerMotion = require('framer-motion');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _taggedTemplateLiteralLoose(e, t) {
  return t || (t = e.slice(0)), e.raw = t, e;
}

var ItemizeContext = React__default["default"].createContext({
  level: 0,
  marker: '✓',
  usesCounter: false
});

var _excluded$u = ["margin", "marker", "as"];
var _templateObject$w;
var marginMap$2 = {
  none: '0',
  normal: '1em',
  wide: '2em'
};
var EnumerateContainer = styled__default["default"].ol(_templateObject$w || (_templateObject$w = _taggedTemplateLiteralLoose(["\n  padding-inline-start: 4ch;\n  margin-block-start: ", ";\n  margin-block-end: ", ";\n  margin-inline-start: 0;\n  margin-inline-end: 0;\n  list-style-type: ", ";\n  & > li::marker {\n    color: ", ";\n  }\n"])), function (_ref) {
  var margin = _ref.margin;
  return marginMap$2[margin];
}, function (_ref2) {
  var margin = _ref2.margin;
  return marginMap$2[margin];
}, function (_ref3) {
  var marker = _ref3.marker;
  return marker;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.color.text.secondary.main;
});
var Enumerate = React__default["default"].forwardRef(function (props, ref) {
  var itemizeContext = React.useContext(ItemizeContext);
  var _props$margin = props.margin,
    margin = _props$margin === void 0 ? itemizeContext.level === 0 ? 'normal' : 'none' : _props$margin,
    _props$marker = props.marker,
    marker = _props$marker === void 0 ? 'decimal' : _props$marker,
    _props$as = props.as,
    as = _props$as === void 0 ? 'ol' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$u);
  return React__default["default"].createElement(ItemizeContext.Provider, {
    value: {
      marker: marker,
      usesCounter: true,
      level: itemizeContext.level + 1
    }
  }, React__default["default"].createElement(EnumerateContainer, _extends$1({
    margin: margin,
    marker: marker,
    ref: ref,
    as: as
  }, rest)));
});

var _excluded$t = ["marker", "as"];
var _templateObject$v;
var ItemContainer = styled__default["default"].li(_templateObject$v || (_templateObject$v = _taggedTemplateLiteralLoose(["\n  list-style-type: ", ";\n  & > li::marker {\n    color: ", ";\n  }\n"])), function (_ref) {
  var marker = _ref.marker,
    usesCounter = _ref.usesCounter;
  return usesCounter ? marker : "'" + marker + " '";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.color.text.secondary.main;
});
var Item = React__default["default"].forwardRef(function (props, ref) {
  var itemizeContext = React.useContext(ItemizeContext);
  var _props$marker = props.marker,
    marker = _props$marker === void 0 ? itemizeContext.marker : _props$marker,
    _props$as = props.as,
    as = _props$as === void 0 ? 'li' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$t);
  return React__default["default"].createElement(ItemContainer, _extends$1({
    ref: ref,
    as: as,
    marker: marker,
    usesCounter: itemizeContext.usesCounter
  }, rest));
});

var _excluded$s = ["margin", "marker", "as"];
var _templateObject$u;
var marginMap$1 = {
  none: '0',
  normal: '1em',
  wide: '2em'
};
var ItemizeContainer = styled__default["default"].ul(_templateObject$u || (_templateObject$u = _taggedTemplateLiteralLoose(["\n  padding-inline-start: 4ch;\n  margin-block-start: ", ";\n  margin-block-end: ", ";\n  margin-inline-start: 0;\n  margin-inline-end: 0;\n  list-style-type: '", " ';\n  & > li::marker {\n    color: ", ";\n  }\n"])), function (_ref) {
  var margin = _ref.margin;
  return marginMap$1[margin];
}, function (_ref2) {
  var margin = _ref2.margin;
  return marginMap$1[margin];
}, function (_ref3) {
  var marker = _ref3.marker;
  return marker;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.color.text.secondary.main;
});
var Itemize = React__default["default"].forwardRef(function (props, ref) {
  var itemizeContext = React.useContext(ItemizeContext);
  var _props$margin = props.margin,
    margin = _props$margin === void 0 ? itemizeContext.level === 0 ? 'normal' : 'none' : _props$margin,
    _props$marker = props.marker,
    marker = _props$marker === void 0 ? itemizeContext.level === 0 ? '✓' : '–' : _props$marker,
    _props$as = props.as,
    as = _props$as === void 0 ? 'ul' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$s);
  return React__default["default"].createElement(ItemizeContext.Provider, {
    value: {
      marker: marker,
      usesCounter: false,
      level: itemizeContext.level + 1
    }
  }, React__default["default"].createElement(ItemizeContainer, _extends$1({
    margin: margin,
    marker: marker,
    ref: ref,
    as: as
  }, rest)));
});

var _excluded$r = ["padding", "children", "as"];
var _templateObject$t;
var paddingMap$7 = {
  none: 'padding: 0;',
  normal: 'padding: 8px 0;',
  wide: 'padding: 16px 0;'
};
var ListContainer = styled__default["default"].ul(_templateObject$t || (_templateObject$t = _taggedTemplateLiteralLoose(["\n  ", "\n  list-style: none;\n"])), function (_ref) {
  var padding = _ref.padding;
  return paddingMap$7[padding];
});
var List = React__default["default"].forwardRef(function (props, ref) {
  var _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    children = props.children,
    _props$as = props.as,
    as = _props$as === void 0 ? 'ul' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$r);
  return React__default["default"].createElement(ListContainer, _extends$1({
    ref: ref,
    as: as,
    padding: padding
  }, rest), children);
});

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}

function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}

function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}

function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}

function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !_isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return _construct(t, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _setPrototypeOf(Wrapper, t);
  }, _wrapNativeSuper(t);
}

// based on https://github.com/styled-components/styled-components/blob/fcf6f3804c57a14dd7984dfab7bc06ee2edca044/src/utils/error.js
/**
 * Parse errors.md and turn it into a simple hash of code: message
 * @private
 */
var ERRORS = {
  "1": "Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).\n\n",
  "2": "Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).\n\n",
  "3": "Passed an incorrect argument to a color function, please pass a string representation of a color.\n\n",
  "4": "Couldn't generate valid rgb string from %s, it returned %s.\n\n",
  "5": "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.\n\n",
  "6": "Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).\n\n",
  "7": "Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).\n\n",
  "8": "Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.\n\n",
  "9": "Please provide a number of steps to the modularScale helper.\n\n",
  "10": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  "11": "Invalid value passed as base to modularScale, expected number or em string but got \"%s\"\n\n",
  "12": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got \"%s\" instead.\n\n",
  "13": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got \"%s\" instead.\n\n",
  "14": "Passed invalid pixel value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
  "15": "Passed invalid base value (\"%s\") to %s(), please pass a value like \"12px\" or 12.\n\n",
  "16": "You must provide a template to this method.\n\n",
  "17": "You passed an unsupported selector state to this method.\n\n",
  "18": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  "19": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  "20": "expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  "21": "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  "22": "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  "23": "fontFace expects a name of a font-family.\n\n",
  "24": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  "25": "fontFace expects localFonts to be an array.\n\n",
  "26": "fontFace expects fileFormats to be an array.\n\n",
  "27": "radialGradient requries at least 2 color-stops to properly render.\n\n",
  "28": "Please supply a filename to retinaImage() as the first argument.\n\n",
  "29": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  "30": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  "31": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation\n\n",
  "32": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')\n\n",
  "33": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation\n\n",
  "34": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  "35": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
  "36": "Property must be a string value.\n\n",
  "37": "Syntax Error at %s.\n\n",
  "38": "Formula contains a function that needs parentheses at %s.\n\n",
  "39": "Formula is missing closing parenthesis at %s.\n\n",
  "40": "Formula has too many closing parentheses at %s.\n\n",
  "41": "All values in a formula must have the same unit or be unitless.\n\n",
  "42": "Please provide a number of steps to the modularScale helper.\n\n",
  "43": "Please pass a number or one of the predefined scales to the modularScale helper as the ratio.\n\n",
  "44": "Invalid value passed as base to modularScale, expected number or em/rem string but got %s.\n\n",
  "45": "Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.\n\n",
  "46": "Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.\n\n",
  "47": "minScreen and maxScreen must be provided as stringified numbers with the same units.\n\n",
  "48": "fromSize and toSize must be provided as stringified numbers with the same units.\n\n",
  "49": "Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.\n\n",
  "50": "Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.\n\n",
  "51": "Expects the first argument object to have the properties prop, fromSize, and toSize.\n\n",
  "52": "fontFace expects either the path to the font file(s) or a name of a local copy.\n\n",
  "53": "fontFace expects localFonts to be an array.\n\n",
  "54": "fontFace expects fileFormats to be an array.\n\n",
  "55": "fontFace expects a name of a font-family.\n\n",
  "56": "linearGradient requries at least 2 color-stops to properly render.\n\n",
  "57": "radialGradient requries at least 2 color-stops to properly render.\n\n",
  "58": "Please supply a filename to retinaImage() as the first argument.\n\n",
  "59": "Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.\n\n",
  "60": "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  "61": "Property must be a string value.\n\n",
  "62": "borderRadius expects a radius value as a string or number as the second argument.\n\n",
  "63": "borderRadius expects one of \"top\", \"bottom\", \"left\" or \"right\" as the first argument.\n\n",
  "64": "The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.\n\n",
  "65": "To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').\n\n",
  "66": "The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.\n\n",
  "67": "You must provide a template to this method.\n\n",
  "68": "You passed an unsupported selector state to this method.\n\n",
  "69": "Expected a string ending in \"px\" or a number passed as the first argument to %s(), got %s instead.\n\n",
  "70": "Expected a string ending in \"px\" or a number passed as the second argument to %s(), got %s instead.\n\n",
  "71": "Passed invalid pixel value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
  "72": "Passed invalid base value %s to %s(), please pass a value like \"12px\" or 12.\n\n",
  "73": "Please provide a valid CSS variable.\n\n",
  "74": "CSS variable not found and no default was provided.\n\n",
  "75": "important requires a valid style object, got a %s instead.\n\n",
  "76": "fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.\n\n",
  "77": "remToPx expects a value in \"rem\" but you provided it in \"%s\".\n\n",
  "78": "base must be set in \"px\" or \"%\" but you set it in \"%s\".\n"
};

/**
 * super basic version of sprintf
 * @private
 */
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var a = args[0];
  var b = [];
  var c;
  for (c = 1; c < args.length; c += 1) {
    b.push(args[c]);
  }
  b.forEach(function (d) {
    a = a.replace(/%[a-z]/, d);
  });
  return a;
}

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 * @private
 */
var PolishedError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(PolishedError, _Error);
  function PolishedError(code) {
    var _this;
    if (process.env.NODE_ENV === 'production') {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    } else {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(args))) || this;
    }
    return _assertThisInitialized(_this);
  }
  return PolishedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * CSS to represent truncated text with an ellipsis. You can optionally pass a max-width and number of lines before truncating.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...ellipsis('250px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${ellipsis('250px')}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'display': 'inline-block',
 *   'maxWidth': '250px',
 *   'overflow': 'hidden',
 *   'textOverflow': 'ellipsis',
 *   'whiteSpace': 'nowrap',
 *   'wordWrap': 'normal'
 * }
 */
function ellipsis(width, lines) {
  if (lines === void 0) {
    lines = 1;
  }
  var styles = {
    display: 'inline-block',
    maxWidth: width || '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal'
  };
  return lines > 1 ? _extends({}, styles, {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    display: '-webkit-box',
    whiteSpace: 'normal'
  }) : styles;
}

function colorToInt(color) {
  return Math.round(color * 255);
}
function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}
function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }
  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  }

  // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV
  var huePrime = (hue % 360 + 360) % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};

/**
 * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
 * @private
 */
function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}

var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i;
var rgbaRegex = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i;
var hslaRegex = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;

/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToRgb('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
 */
function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new PolishedError(3);
  }
  var normalizedColor = nameToHex(color);
  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }
  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha: alpha
    };
  }
  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }
  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }
  var rgbMatched = rgbRegex.exec(normalizedColor);
  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }
  var rgbaMatched = rgbaRegex.exec(normalizedColor.substring(0, 50));
  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4]) > 1 ? parseFloat("" + rgbaMatched[4]) / 100 : parseFloat("" + rgbaMatched[4])
    };
  }
  var hslMatched = hslRegex.exec(normalizedColor);
  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);
    if (!hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, rgbColorString);
    }
    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }
  var hslaMatched = hslaRegex.exec(normalizedColor.substring(0, 50));
  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);
    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;
    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;
    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";
    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);
    if (!_hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, _rgbColorString);
    }
    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4]) > 1 ? parseFloat("" + hslaMatched[4]) / 100 : parseFloat("" + hslaMatched[4])
    };
  }
  throw new PolishedError(5);
}

function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;
  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness
      };
    }
  }
  var hue;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }
  hue *= 60;
  if (color.alpha !== undefined) {
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: color.alpha
    };
  }
  return {
    hue: hue,
    saturation: saturation,
    lightness: lightness
  };
}

/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
 */
function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }
  return value;
};
var reduceHexValue$1 = reduceHexValue;

function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}
function convertToHex(red, green, blue) {
  return reduceHexValue$1("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}
function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }
  throw new PolishedError(1);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }
  throw new PolishedError(2);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue$1("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue$1("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }
  throw new PolishedError(6);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }
  throw new PolishedError(7);
}

var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};
var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};
var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};
var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};

/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */

function toColorString(color) {
  if (typeof color !== 'object') throw new PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new PolishedError(8);
}

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare
function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
}

// eslint-disable-next-line no-redeclare
function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */
function darken(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
}

// prettier-ignore
var curriedDarken = curry /* ::<number | string, string, string> */(darken);
var curriedDarken$1 = curriedDarken;

/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
 *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)',
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
 *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
 *                             'rgba(58, 133, 255, 1)' :
 *                             'rgba(255, 57, 149, 1)'};
 *
 * // CSS in JS Output
 *
 * div {
 *   background: "#CCCD64";
 *   background: "rgba(58, 133, 255, 1)";
 * }
 */
function getLuminance(color) {
  if (color === 'transparent') return 0;
  var rgbColor = parseToRgb(color);
  var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
      var channel = rgbColor[key] / 255;
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    }),
    r = _Object$keys$map[0],
    g = _Object$keys$map[1],
    b = _Object$keys$map[2];
  return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
}

/**
 * Returns the contrast ratio between two colors based on
 * [W3's recommended equation for calculating contrast](http://www.w3.org/TR/WCAG20/#contrast-ratiodef).
 *
 * @example
 * const contrastRatio = getContrast('#444', '#fff');
 */
function getContrast(color1, color2) {
  var luminance1 = getLuminance(color1);
  var luminance2 = getLuminance(color2);
  return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
}

/**
 * Returns a string value for the lightened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: lighten(0.2, '#CCCD64'),
 *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${lighten(0.2, '#FFCD64')};
 *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e5e6b1";
 *   background: "rgba(229,230,177,0.7)";
 * }
 */
function lighten(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
  }));
}

// prettier-ignore
var curriedLighten = curry /* ::<number | string, string, string> */(lighten);
var curriedLighten$1 = curriedLighten;

var defaultReturnIfLightColor = '#000';
var defaultReturnIfDarkColor = '#fff';

/**
 * Returns black or white (or optional passed colors) for best
 * contrast depending on the luminosity of the given color.
 * When passing custom return colors, strict mode ensures that the
 * return color always meets or exceeds WCAG level AA or greater. If this test
 * fails, the default return color (black or white) is returned in place of the
 * custom return color. You can optionally turn off strict mode.
 *
 * Follows [W3C specs for readability](https://www.w3.org/TR/WCAG20-TECHS/G18.html).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   color: readableColor('#000'),
 *   color: readableColor('black', '#001', '#ff8'),
 *   color: readableColor('white', '#001', '#ff8'),
 *   color: readableColor('red', '#333', '#ddd', true)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   color: ${readableColor('#000')};
 *   color: ${readableColor('black', '#001', '#ff8')};
 *   color: ${readableColor('white', '#001', '#ff8')};
 *   color: ${readableColor('red', '#333', '#ddd', true)};
 * `
 *
 * // CSS in JS Output
 * element {
 *   color: "#fff";
 *   color: "#ff8";
 *   color: "#001";
 *   color: "#000";
 * }
 */
function readableColor$1(color, returnIfLightColor, returnIfDarkColor, strict) {
  if (returnIfLightColor === void 0) {
    returnIfLightColor = defaultReturnIfLightColor;
  }
  if (returnIfDarkColor === void 0) {
    returnIfDarkColor = defaultReturnIfDarkColor;
  }
  if (strict === void 0) {
    strict = true;
  }
  var isColorLight = getLuminance(color) > 0.179;
  var preferredReturnColor = isColorLight ? returnIfLightColor : returnIfDarkColor;
  if (!strict || getContrast(color, preferredReturnColor) >= 4.5) {
    return preferredReturnColor;
  }
  return isColorLight ? defaultReturnIfLightColor : defaultReturnIfDarkColor;
}

/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff'),
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')};
 *   background: ${transparentize('0.5', 'rgba(255, 0, 0, 0.8)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */
function transparentize(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  var colorWithAlpha = _extends({}, parsedColor, {
    alpha: guard(0, 1, +(alpha * 100 - parseFloat(amount) * 100).toFixed(2) / 100)
  });
  return rgba(colorWithAlpha);
}

// prettier-ignore
var curriedTransparentize = curry /* ::<number | string, string, string> */(transparentize);
var curriedTransparentize$1 = curriedTransparentize;

function generateSelectors(template, state) {
  var stateSuffix = state ? ":" + state : '';
  return template(stateSuffix);
}

/**
 * Function helper that adds an array of states to a template of selectors. Used in textInputs and buttons.
 * @private
 */
function statefulSelectors(states, template, stateMap) {
  if (!template) throw new PolishedError(67);
  if (states.length === 0) return generateSelectors(template, null);
  var selectors = [];
  for (var i = 0; i < states.length; i += 1) {
    if (stateMap && stateMap.indexOf(states[i]) < 0) {
      throw new PolishedError(68);
    }
    selectors.push(generateSelectors(template, states[i]));
  }
  selectors = selectors.join(',');
  return selectors;
}

var stateMap$1 = [undefined, null, 'active', 'focus', 'hover'];
function template$1(state) {
  return "button" + state + ",\n  input[type=\"button\"]" + state + ",\n  input[type=\"reset\"]" + state + ",\n  input[type=\"submit\"]" + state;
}

/**
 * Populates selectors that target all buttons. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [buttons('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${buttons('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'button:active,
 *  'input[type="button"]:active,
 *  'input[type=\"reset\"]:active,
 *  'input[type=\"submit\"]:active: {
 *   'border': 'none'
 * }
 */
function buttons() {
  for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }
  return statefulSelectors(states, template$1, stateMap$1);
}

var stateMap = [undefined, null, 'active', 'focus', 'hover'];
function template(state) {
  return "input[type=\"color\"]" + state + ",\n    input[type=\"date\"]" + state + ",\n    input[type=\"datetime\"]" + state + ",\n    input[type=\"datetime-local\"]" + state + ",\n    input[type=\"email\"]" + state + ",\n    input[type=\"month\"]" + state + ",\n    input[type=\"number\"]" + state + ",\n    input[type=\"password\"]" + state + ",\n    input[type=\"search\"]" + state + ",\n    input[type=\"tel\"]" + state + ",\n    input[type=\"text\"]" + state + ",\n    input[type=\"time\"]" + state + ",\n    input[type=\"url\"]" + state + ",\n    input[type=\"week\"]" + state + ",\n    input:not([type])" + state + ",\n    textarea" + state;
}

/**
 * Populates selectors that target all text inputs. You can pass optional states to append to the selectors.
 * @example
 * // Styles as object usage
 * const styles = {
 *   [textInputs('active')]: {
 *     'border': 'none'
 *   }
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   > ${textInputs('active')} {
 *     border: none;
 *   }
 * `
 *
 * // CSS in JS Output
 *
 *  'input[type="color"]:active,
 *  input[type="date"]:active,
 *  input[type="datetime"]:active,
 *  input[type="datetime-local"]:active,
 *  input[type="email"]:active,
 *  input[type="month"]:active,
 *  input[type="number"]:active,
 *  input[type="password"]:active,
 *  input[type="search"]:active,
 *  input[type="tel"]:active,
 *  input[type="text"]:active,
 *  input[type="time"]:active,
 *  input[type="url"]:active,
 *  input[type="week"]:active,
 *  input:not([type]):active,
 *  textarea:active': {
 *   'border': 'none'
 * }
 */
function textInputs() {
  for (var _len = arguments.length, states = new Array(_len), _key = 0; _key < _len; _key++) {
    states[_key] = arguments[_key];
  }
  return statefulSelectors(states, template, stateMap);
}

var readableColor = function readableColor(color, theme) {
  return readableColor$1(curriedDarken$1(0.2, color), theme.color.text.primary.dark, theme.color.text.primary.light, false);
};
var computeHoverColor = function computeHoverColor(backgroundColor) {
  return readableColor$1(backgroundColor, curriedDarken$1(0.1, backgroundColor), curriedLighten$1(0.2, backgroundColor), false);
};

var _templateObject$s, _templateObject2$a, _templateObject3$4;
var toCssName = function toCssName(name) {
  return name.replace(/[A-Z]/g, function (m) {
    return "-" + m.toLowerCase();
  }).replace(/^-/, '');
};
var cssVariables = function cssVariables(defaults, prefix) {
  var names = Object.keys(defaults);
  var vars = Object.fromEntries(names.map(function (name) {
    return [name, "--solvedac-" + toCssName(prefix) + "-" + toCssName(name)];
  }));
  var v = Object.fromEntries(Object.entries(vars).map(function (_ref) {
    var k = _ref[0],
      v = _ref[1];
    return [k, "var(" + v + ")"];
  }));
  var styles = function styles(theme) {
    var _Object$entries$map$j;
    return (_Object$entries$map$j = Object.entries(defaults != null ? defaults : {}).map(function (_ref2) {
      var key = _ref2[0],
        value = _ref2[1];
      return "--solvedac-" + toCssName(prefix) + "-" + toCssName(key) + ": " + (typeof value === 'string' ? value : value(theme)) + ";";
    }).join('\n')) != null ? _Object$entries$map$j : '';
  };
  return {
    vars: vars,
    v: v,
    styles: styles
  };
};
var cssCentering = react.css(_templateObject$s || (_templateObject$s = _taggedTemplateLiteralLoose(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var cssDisablable = react.css(_templateObject2$a || (_templateObject2$a = _taggedTemplateLiteralLoose(["\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n"])));
var cssClickable = react.css(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteralLoose(["\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none;\n  ", "\n"])), cssDisablable);

var cardHoverTemplate = {
  backgroundColor: function backgroundColor(theme) {
    return theme.color.background.card.main;
  },
  textColor: function textColor(theme) {
    return theme.color.text.primary.main;
  },
  hoverBackgroundColor: function hoverBackgroundColor(theme) {
    return computeHoverColor(theme.color.background.card.main);
  },
  hoverTextColor: function hoverTextColor(theme) {
    return theme.color.text.primary.main;
  }
};
var transparentHoverTemplate = {
  backgroundColor: function backgroundColor(theme) {
    return curriedTransparentize$1(1, theme.color.background.card.main);
  },
  textColor: function textColor(theme) {
    return theme.color.text.primary.main;
  },
  hoverBackgroundColor: function hoverBackgroundColor(theme) {
    return theme.color.background.card.main;
  },
  hoverTextColor: function hoverTextColor(theme) {
    return theme.color.text.primary.main;
  }
};

var _excluded$q = ["backgroundColor", "hoverColor", "clickable", "disabled", "padding", "style", "children", "as"];
var _templateObject$r, _templateObject2$9, _templateObject3$3;
var _cssVariables$8 = cssVariables(_extends$1({}, transparentHoverTemplate), 'listItem'),
  vars$9 = _cssVariables$8.vars,
  v$a = _cssVariables$8.v,
  styles$8 = _cssVariables$8.styles;
var paddingMap$6 = {
  none: 'padding: 0;',
  normal: 'padding: 16px 8px;',
  wide: 'padding: 32px 16px;'
};
var ListItemWrapper = styled__default["default"].li(_templateObject$r || (_templateObject$r = _taggedTemplateLiteralLoose(["\n  display: list-item;\n  width: 100%;\n  list-style: none;\n  border-bottom: ", ";\n  &:last-child {\n    border-bottom: none;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.styles.border();
});
var whenClickable$1 = react.css(_templateObject2$9 || (_templateObject2$9 = _taggedTemplateLiteralLoose(["\n  ", "\n  transition: background 0.3s ease, color 0.3s ease;\n  &:not([disabled]):hover,\n  &:not([disabled]):active {\n    background: ", ";\n    color: ", ";\n  }\n"])), cssClickable, v$a.hoverBackgroundColor, v$a.hoverTextColor);
var ListItemContainer = styled__default["default"].div(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteralLoose(["\n  ", "\n  display: block;\n  width: 100%;\n  background: ", ";\n  color: ", ";\n  ", "\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return styles$8(theme);
}, v$a.backgroundColor, v$a.textColor, function (_ref3) {
  var clickable = _ref3.clickable;
  return clickable && whenClickable$1;
}, function (_ref4) {
  var padding = _ref4.padding;
  return paddingMap$6[padding];
});
var ListItem = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var solvedTheme = react.useTheme();
  var backgroundColor = props.backgroundColor,
    hoverColor = props.hoverColor,
    _props$clickable = props.clickable,
    clickable = _props$clickable === void 0 ? false : _props$clickable,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    style = props.style,
    children = props.children,
    _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$q);
  var computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  return React__default["default"].createElement(ListItemWrapper, null, React__default["default"].createElement(ListItemContainer, _extends$1({
    ref: ref,
    as: as,
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    disabled: disabled && clickable,
    clickable: clickable,
    padding: padding,
    style: _extends$1((_extends2 = {}, _extends2[vars$9.backgroundColor] = backgroundColor, _extends2[vars$9.hoverBackgroundColor] = computedHoverColor, _extends2[vars$9.textColor] = backgroundColor && readableColor(backgroundColor, solvedTheme), _extends2[vars$9.hoverTextColor] = computedHoverColor && readableColor(computedHoverColor, solvedTheme), _extends2), style)
  }, rest), children));
});

var _excluded$p = ["current", "backgroundColor", "disabled", "hoverColor", "accentColor", "accentHintColor", "style", "as"];
var _templateObject$q, _templateObject2$8;
var _cssVariables$7 = cssVariables(_extends$1({}, transparentHoverTemplate, {
    accentColor: function accentColor(theme) {
      return theme.color.background.table.header;
    },
    accentHintColor: function accentHintColor() {
      return 'transparent';
    }
  }), 'tab'),
  vars$8 = _cssVariables$7.vars,
  v$9 = _cssVariables$7.v,
  styles$7 = _cssVariables$7.styles;
var whenCurrent$1 = react.css(_templateObject$q || (_templateObject$q = _taggedTemplateLiteralLoose(["\n  font-weight: bold;\n  border-bottom: 2px solid ", ";\n  &:not([disabled]):hover {\n    border-bottom: 2px solid ", ";\n  }\n"])), v$9.accentColor, v$9.accentColor);
var TabContainer = styled__default["default"].button(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  flex: 1 0 0;\n  display: inline-block;\n  min-width: 64px;\n  padding: 16px 16px;\n  text-decoration: none;\n  text-align: center;\n  user-select: none;\n  border: none;\n  border-bottom: 2px solid ", ";\n  transition: background-color 0.3s ease, color 0.3s ease,\n    border-color 0.3s ease;\n  background: ", ";\n  color: ", ";\n  vertical-align: bottom;\n  &:not([disabled]):hover,\n  &:not([disabled]):active {\n    color: ", ";\n    background-color: ", ";\n    border-bottom: 2px solid ", ";\n  }\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$7(theme);
}, cssClickable, ellipsis(), v$9.accentHintColor, v$9.backgroundColor, v$9.textColor, v$9.hoverTextColor, v$9.hoverBackgroundColor, v$9.accentColor, function (_ref2) {
  var current = _ref2.current;
  return current && whenCurrent$1;
});
var Tab = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var solvedTheme = react.useTheme();
  var _props$current = props.current,
    current = _props$current === void 0 ? false : _props$current,
    backgroundColor = props.backgroundColor,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    hoverColor = props.hoverColor,
    accentColor = props.accentColor,
    accentHintColor = props.accentHintColor,
    style = props.style,
    _props$as = props.as,
    as = _props$as === void 0 ? 'a' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$p);
  var computedAccentColor = accentColor || backgroundColor && readableColor(backgroundColor, solvedTheme);
  var computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  return React__default["default"].createElement(TabContainer, _extends$1({
    ref: ref,
    as: as,
    role: "button",
    tabIndex: 0,
    disabled: disabled,
    current: current,
    style: _extends$1((_extends2 = {}, _extends2[vars$8.backgroundColor] = backgroundColor, _extends2[vars$8.hoverBackgroundColor] = computedHoverColor, _extends2[vars$8.textColor] = backgroundColor && readableColor(backgroundColor, solvedTheme), _extends2[vars$8.hoverTextColor] = computedHoverColor && readableColor(computedHoverColor, solvedTheme), _extends2[vars$8.accentColor] = computedAccentColor, _extends2[vars$8.accentHintColor] = accentHintColor, _extends2), style)
  }, rest));
});

var _excluded$o = ["fullWidth", "multiline", "as"];
var _templateObject$p;
var TabsContainer = styled__default["default"].nav(_templateObject$p || (_templateObject$p = _taggedTemplateLiteralLoose(["\n  overflow-x: auto;\n  display: ", ";\n  white-space: ", ";\n  flex-wrap: ", ";\n"])), function (_ref) {
  var fullWidth = _ref.fullWidth;
  return fullWidth ? 'flex' : 'block';
}, function (_ref2) {
  var multiline = _ref2.multiline;
  return multiline ? 'nowrap' : 'normal';
}, function (_ref3) {
  var multiline = _ref3.multiline;
  return multiline ? 'wrap' : 'nowrap';
});
var Tabs = React__default["default"].forwardRef(function (props, ref) {
  var _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$multiline = props.multiline,
    multiline = _props$multiline === void 0 ? false : _props$multiline,
    _props$as = props.as,
    as = _props$as === void 0 ? 'nav' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$o);
  return React__default["default"].createElement(TabsContainer, _extends$1({
    ref: ref,
    as: as,
    fullWidth: fullWidth,
    multiline: multiline
  }, rest));
});

var TableContext = React__default["default"].createContext({
  padding: 'normal',
  sticky: false,
  verticalAlign: 'top'
});

var TableRowGroupContext = React__default["default"].createContext({
  header: false,
  verticalAlign: 'top'
});

var _excluded$n = ["padding", "verticalAlign", "header", "as", "numeric"];
var _templateObject$o, _templateObject2$7;
var paddingMap$5 = {
  none: 'padding: 0;',
  dense: 'padding: 8px;',
  normal: 'padding: 16px;',
  wide: 'padding: 32px;'
};
var whenHeader = react.css(_templateObject$o || (_templateObject$o = _taggedTemplateLiteralLoose(["\n  text-align: center;\n  font-weight: 700;\n"])));
var CellContainer = styled__default["default"].td(_templateObject2$7 || (_templateObject2$7 = _taggedTemplateLiteralLoose(["\n  display: table-cell;\n  border-bottom: ", ";\n  ", "\n  ", "\n  ", "\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.styles.border();
}, function (_ref2) {
  var padding = _ref2.padding;
  return paddingMap$5[padding];
}, function (_ref3) {
  var verticalAlign = _ref3.verticalAlign;
  return "vertical-align: " + verticalAlign + ";";
}, function (_ref4) {
  var numeric = _ref4.numeric;
  return numeric && "text-align: right; font-feature-settings: 'tnum';";
}, function (_ref5) {
  var header = _ref5.header;
  return header && whenHeader;
});
var Cell = React__default["default"].forwardRef(function (props, ref) {
  var tableContext = React.useContext(TableContext);
  var tableRowGroupContext = React.useContext(TableRowGroupContext);
  var _props$padding = props.padding,
    padding = _props$padding === void 0 ? tableContext.padding : _props$padding,
    _props$verticalAlign = props.verticalAlign,
    verticalAlign = _props$verticalAlign === void 0 ? tableRowGroupContext.verticalAlign : _props$verticalAlign,
    _props$header = props.header,
    header = _props$header === void 0 ? tableRowGroupContext.header : _props$header,
    as = props.as,
    _props$numeric = props.numeric,
    numeric = _props$numeric === void 0 ? false : _props$numeric,
    rest = _objectWithoutPropertiesLoose(props, _excluded$n);
  var calculatedAs = as || (header ? 'th' : 'td');
  return React__default["default"].createElement(CellContainer, _extends$1({
    padding: padding,
    verticalAlign: verticalAlign,
    numeric: numeric,
    header: header,
    ref: ref,
    as: calculatedAs
  }, rest));
});

var _excluded$m = ["header", "padding", "verticalAlign", "as"];
var _templateObject$n;
var RowContainer = styled__default["default"].tr(_templateObject$n || (_templateObject$n = _taggedTemplateLiteralLoose(["\n  display: table-row;\n  ", "\n"])), function (_ref) {
  var header = _ref.header;
  return header && 'text-align: center; font-weight: 700;';
});
var Row = React__default["default"].forwardRef(function (props, ref) {
  var tableContext = React.useContext(TableContext);
  var _props$header = props.header,
    header = _props$header === void 0 ? false : _props$header,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? tableContext.padding : _props$padding,
    _props$verticalAlign = props.verticalAlign,
    verticalAlign = _props$verticalAlign === void 0 ? tableContext.verticalAlign : _props$verticalAlign,
    _props$as = props.as,
    as = _props$as === void 0 ? 'tr' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$m);
  return React__default["default"].createElement(TableContext.Provider, {
    value: _extends$1({}, tableContext, {
      padding: padding,
      verticalAlign: verticalAlign
    })
  }, React__default["default"].createElement(RowContainer, _extends$1({
    header: header,
    ref: ref,
    as: as
  }, rest)));
});

var _excluded$l = ["fullWidth", "padding", "verticalAlign", "sticky", "as"];
var _templateObject$m;
var TableContainer$1 = styled__default["default"].table(_templateObject$m || (_templateObject$m = _taggedTemplateLiteralLoose(["\n  display: table;\n  ", "\n"])), function (_ref) {
  var fullWidth = _ref.fullWidth;
  return fullWidth && 'width: 100%;';
});
var Table = React__default["default"].forwardRef(function (props, ref) {
  var _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    _props$verticalAlign = props.verticalAlign,
    verticalAlign = _props$verticalAlign === void 0 ? 'top' : _props$verticalAlign,
    _props$sticky = props.sticky,
    sticky = _props$sticky === void 0 ? false : _props$sticky,
    _props$as = props.as,
    as = _props$as === void 0 ? 'table' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$l);
  return React__default["default"].createElement(TableContext.Provider, {
    value: {
      padding: padding,
      sticky: sticky,
      verticalAlign: verticalAlign
    }
  }, React__default["default"].createElement(TableRowGroupContext.Provider, {
    value: {
      header: false,
      verticalAlign: verticalAlign
    }
  }, React__default["default"].createElement(TableContainer$1, _extends$1({
    fullWidth: fullWidth,
    ref: ref,
    as: as
  }, rest))));
});

var _excluded$k = ["as"];
var _templateObject$l;
var TableBodyContainer = styled__default["default"].tbody(_templateObject$l || (_templateObject$l = _taggedTemplateLiteralLoose(["\n  display: table-row-group;\n"])));
var TableBody = React__default["default"].forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'tbody' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$k);
  return React__default["default"].createElement(TableBodyContainer, _extends$1({
    ref: ref,
    as: as
  }, rest));
});

var _excluded$j = ["as"];
var _templateObject$k;
var TableContainerContainer = styled__default["default"].div(_templateObject$k || (_templateObject$k = _taggedTemplateLiteralLoose(["\n  overflow-x: auto;\n"])));
var TableContainer = React__default["default"].forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$j);
  return React__default["default"].createElement(TableContainerContainer, _extends$1({
    ref: ref,
    as: as
  }, rest));
});

var _excluded$i = ["as"];
var _templateObject$j;
var TableFootContainer = styled__default["default"].tfoot(_templateObject$j || (_templateObject$j = _taggedTemplateLiteralLoose(["\n  display: table-footer-group;\n  text-align: center;\n  font-weight: 700;\n"])));
var TableFoot = React__default["default"].forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'tfoot' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$i);
  return React__default["default"].createElement(TableFootContainer, _extends$1({
    ref: ref,
    as: as
  }, rest));
});

var _excluded$h = ["sticky", "verticalAlign", "as"];
var _templateObject$i;
var getStickyValue = function getStickyValue(sticky) {
  if (typeof sticky === 'number') {
    return sticky + "px";
  }
  if (typeof sticky === 'string') {
    return sticky;
  }
  return '0';
};
var TableHeadContainer = styled__default["default"].thead(_templateObject$i || (_templateObject$i = _taggedTemplateLiteralLoose(["\n  display: table-header-group;\n  ", "\n"])), function (_ref) {
  var sticky = _ref.sticky;
  return (typeof sticky !== 'boolean' || sticky === true) && "position: sticky; top: " + getStickyValue(sticky) + ";";
});
var TableHead = React__default["default"].forwardRef(function (props, ref) {
  var tableContext = React.useContext(TableContext);
  var _props$sticky = props.sticky,
    sticky = _props$sticky === void 0 ? tableContext.sticky : _props$sticky,
    _props$verticalAlign = props.verticalAlign,
    verticalAlign = _props$verticalAlign === void 0 ? tableContext.verticalAlign : _props$verticalAlign,
    _props$as = props.as,
    as = _props$as === void 0 ? 'thead' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$h);
  return React__default["default"].createElement(TableRowGroupContext.Provider, {
    value: {
      header: true,
      verticalAlign: verticalAlign
    }
  }, React__default["default"].createElement(TableHeadContainer, _extends$1({
    sticky: sticky,
    ref: ref,
    as: as
  }, rest)));
});

var _excluded$g = ["disabled", "circle", "fullWidth", "padding", "style", "children", "as"];
var _templateObject$h;
var _cssVariables$6 = cssVariables(_extends$1({}, cardHoverTemplate, {
    hoverShadow: function hoverShadow(theme) {
      return theme.styles.shadow(computeHoverColor(theme.color.background.card.main), 8);
    },
    activeShadow: function activeShadow(theme) {
      return theme.styles.shadow(computeHoverColor(theme.color.background.card.main), 4);
    }
  }), 'button'),
  vars$7 = _cssVariables$6.vars,
  v$8 = _cssVariables$6.v,
  styles$6 = _cssVariables$6.styles;
var paddingMap$4 = {
  none: 'padding: 0;',
  normal: 'padding: 12px 16px;'
};
var ButtonContainer = styled__default["default"].button(_templateObject$h || (_templateObject$h = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  ", "\n  display: inline-block;\n  vertical-align: middle;\n  text-align: center;\n  background: ", ";\n  color: ", ";\n  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease,\n    box-shadow 0.3s ease;\n  border-radius: ", ";\n  &:not([disabled]):hover,\n  &:not([disabled]):active {\n    background: ", ";\n    color: ", ";\n  }\n  &:not([disabled]):hover {\n    box-shadow: ", ";\n    transform: translate(0, -4px);\n  }\n  &:not([disabled]):active {\n    box-shadow: ", ";\n    transform: translate(0, -2px);\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$6(theme);
}, cssClickable, function (_ref2) {
  var fullWidth = _ref2.fullWidth;
  return fullWidth && 'width: 100%;';
}, function (_ref3) {
  var padding = _ref3.padding;
  return paddingMap$4[padding];
}, v$8.backgroundColor, v$8.textColor, function (_ref4) {
  var circle = _ref4.circle;
  return circle ? '9999px' : '4px';
}, v$8.hoverBackgroundColor, v$8.hoverTextColor, v$8.hoverShadow, v$8.activeShadow);
var useComputedBackgroundColor = function useComputedBackgroundColor(props) {
  var solvedTheme = react.useTheme();
  var backgroundColor = props.backgroundColor,
    primary = props.primary,
    transparent = props.transparent;
  if (transparent) return curriedTransparentize$1(1, cardHoverTemplate.backgroundColor(solvedTheme));
  if (backgroundColor) return backgroundColor;
  if (primary) return solvedTheme.color.solvedAc;
  return undefined;
};
var useComputedHoverColor = function useComputedHoverColor(props) {
  var solvedTheme = react.useTheme();
  var backgroundColor = props.backgroundColor,
    hoverColor = props.hoverColor,
    primary = props.primary,
    transparent = props.transparent;
  if (hoverColor) return hoverColor;
  if (backgroundColor) return computeHoverColor(backgroundColor);
  if (primary) return computeHoverColor(solvedTheme.color.solvedAc);
  if (transparent) return computeHoverColor(cardHoverTemplate.backgroundColor(solvedTheme));
  return undefined;
};
var Button = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var solvedTheme = react.useTheme();
  var _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$circle = props.circle,
    circle = _props$circle === void 0 ? false : _props$circle,
    _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    style = props.style,
    children = props.children,
    _props$as = props.as,
    as = _props$as === void 0 ? 'button' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$g);
  var computedBackgroundColor = useComputedBackgroundColor(props);
  var computedHoverColor = useComputedHoverColor(props);
  return React__default["default"].createElement(ButtonContainer, _extends$1({
    as: as,
    role: "button",
    tabIndex: 0,
    ref: ref,
    disabled: disabled,
    circle: circle,
    fullWidth: fullWidth,
    padding: padding,
    style: _extends$1((_extends2 = {}, _extends2[vars$7.backgroundColor] = computedBackgroundColor, _extends2[vars$7.hoverBackgroundColor] = computedHoverColor, _extends2[vars$7.textColor] = computedBackgroundColor && readableColor(computedBackgroundColor, solvedTheme), _extends2[vars$7.hoverTextColor] = computedHoverColor && readableColor(computedHoverColor, solvedTheme), _extends2[vars$7.hoverShadow] = computedHoverColor && solvedTheme.styles.shadow(computedHoverColor, 8), _extends2[vars$7.activeShadow] = computedHoverColor && solvedTheme.styles.shadow(computedHoverColor, 4), _extends2), style)
  }, rest), children);
});

var _excluded$f = ["backgroundColor", "hoverColor", "clickable", "disabled", "padding", "style", "children", "as"];
var _templateObject$g, _templateObject2$6;
var _cssVariables$5 = cssVariables(_extends$1({}, cardHoverTemplate), 'card'),
  vars$6 = _cssVariables$5.vars,
  v$7 = _cssVariables$5.v,
  styles$5 = _cssVariables$5.styles;
var paddingMap$3 = {
  none: 'padding: 0;',
  normal: 'padding: 8px;',
  wide: 'padding: 16px;'
};
var whenClickable = react.css(_templateObject$g || (_templateObject$g = _taggedTemplateLiteralLoose(["\n  ", "\n  transition: background 0.3s ease, color 0.3s ease;\n  &:not([disabled]):hover,\n  &:not([disabled]):active {\n    background: ", ";\n    color: ", ";\n  }\n"])), cssClickable, v$7.hoverBackgroundColor, v$7.hoverTextColor);
var CardContainer = styled__default["default"].div(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteralLoose(["\n  ", "\n  display: block;\n  background: ", ";\n  color: ", ";\n  border-radius: 8px;\n  ", "\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$5(theme);
}, v$7.backgroundColor, v$7.textColor, function (_ref2) {
  var clickable = _ref2.clickable;
  return clickable && whenClickable;
}, function (_ref3) {
  var padding = _ref3.padding;
  return paddingMap$3[padding];
});
var Card = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var solvedTheme = react.useTheme();
  var backgroundColor = props.backgroundColor,
    hoverColor = props.hoverColor,
    _props$clickable = props.clickable,
    clickable = _props$clickable === void 0 ? false : _props$clickable,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    style = props.style,
    children = props.children,
    _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$f);
  var computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  return React__default["default"].createElement(CardContainer, _extends$1({
    ref: ref,
    as: as,
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    disabled: disabled && clickable,
    clickable: clickable,
    padding: padding,
    style: _extends$1((_extends2 = {}, _extends2[vars$6.backgroundColor] = backgroundColor, _extends2[vars$6.hoverBackgroundColor] = computedHoverColor, _extends2[vars$6.textColor] = backgroundColor && readableColor(backgroundColor, solvedTheme), _extends2[vars$6.hoverTextColor] = computedHoverColor && readableColor(computedHoverColor, solvedTheme), _extends2), style)
  }, rest), children);
});

var _templateObject$f;
var Centering = styled__default["default"].div(_templateObject$f || (_templateObject$f = _taggedTemplateLiteralLoose(["\n  ", "\n"])), cssCentering);

var _excluded$e = ["backgroundColor", "style", "as"];
var _templateObject$e;
var _cssVariables$4 = cssVariables({
    backgroundColor: function backgroundColor(theme) {
      return theme.color.background.card.dark;
    },
    textColor: function textColor(theme) {
      return theme.color.text.primary.main;
    }
  }, 'chip'),
  vars$5 = _cssVariables$4.vars,
  v$6 = _cssVariables$4.v,
  styles$4 = _cssVariables$4.styles;
var ChipContainer = styled__default["default"].div(_templateObject$e || (_templateObject$e = _taggedTemplateLiteralLoose(["\n  ", "\n  background-color: ", ";\n  color: ", ";\n  padding: 8px 12px;\n  border-radius: 32px;\n  text-align: center;\n  line-height: 1.2;\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$4(theme);
}, v$6.backgroundColor, v$6.textColor);
var Chip = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var theme = react.useTheme();
  var backgroundColor = props.backgroundColor,
    style = props.style,
    _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$e);
  return React__default["default"].createElement(ChipContainer, _extends$1({
    ref: ref,
    as: as,
    style: _extends$1((_extends2 = {}, _extends2[vars$5.backgroundColor] = backgroundColor, _extends2[vars$5.textColor] = backgroundColor && readableColor(backgroundColor, theme), _extends2), style)
  }, rest));
});

var _templateObject$d;
var CollapseContainer = styled__default["default"].div(_templateObject$d || (_templateObject$d = _taggedTemplateLiteralLoose(["\n  height: ", ";\n  transform-origin: top;\n  opacity: ", ";\n  transition: height 0.3s ease, opacity 0.3s ease;\n  pointer-events: ", ";\n  overflow: 'hidden';\n"])), function (_ref) {
  var renderHeight = _ref.renderHeight;
  return typeof renderHeight === 'number' ? renderHeight + "px" : renderHeight;
}, function (_ref2) {
  var shown = _ref2.shown;
  return shown ? 1 : 0;
}, function (_ref3) {
  var shown = _ref3.shown;
  return shown ? 'all' : 'none';
});
var Collapse = React__default["default"].forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    shown = props.shown,
    children = props.children;
  var contentsRef = React.useRef(null);
  var _useState = React.useState(0),
    contentHeight = _useState[0],
    setContentHeight = _useState[1];
  var _useState2 = React.useState(0),
    renderHeight = _useState2[0],
    setRenderHeight = _useState2[1];
  var _useState3 = React.useState(shown),
    mountChild = _useState3[0],
    setMountChild = _useState3[1];
  React.useLayoutEffect(function () {
    var _contentsRef$current$, _contentsRef$current;
    if (contentsRef.current === null || !mountChild) return;
    setContentHeight((_contentsRef$current$ = (_contentsRef$current = contentsRef.current) == null ? void 0 : _contentsRef$current.clientHeight) != null ? _contentsRef$current$ : 0);
  }, [children, mountChild]);
  React.useLayoutEffect(function () {
    if (shown) setMountChild(true);
    setRenderHeight(shown ? 0 : contentHeight);
    var renderHeightDelay = setTimeout(function () {
      setRenderHeight(shown ? contentHeight : 0);
    }, 30);
    var animationDelay = setTimeout(function () {
      setRenderHeight(shown ? 'auto' : 0);
      if (!shown) setMountChild(false);
    }, 400);
    return function () {
      clearTimeout(renderHeightDelay);
      clearTimeout(animationDelay);
    };
  }, [shown, contentHeight]);
  return React__default["default"].createElement(CollapseContainer, {
    as: as,
    ref: ref,
    shown: shown,
    renderHeight: renderHeight
  }, mountChild ? React__default["default"].createElement("div", {
    ref: contentsRef
  }, children) : null);
});

var _excluded$d = ["w", "padding", "topBarPadding", "style", "as"];
var _templateObject$c;
var _cssVariables$3 = cssVariables({
    width: '1200px'
  }, 'container'),
  vars$4 = _cssVariables$3.vars,
  v$5 = _cssVariables$3.v,
  styles$3 = _cssVariables$3.styles;
var paddingMap$2 = {
  none: 'padding: 0;',
  normal: 'padding: 0 16px;',
  wide: 'padding: 0 32px;'
};
var ContainerContainer = styled__default["default"].nav(_templateObject$c || (_templateObject$c = _taggedTemplateLiteralLoose(["\n  ", "\n  max-width: ", ";\n  ", "\n  ", "\n  margin: 0 auto;\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$3(theme);
}, v$5.width, function (_ref2) {
  var padding = _ref2.padding;
  return paddingMap$2[padding];
}, function (_ref3) {
  var topBarPadding = _ref3.topBarPadding;
  return topBarPadding && 'padding-top: 72px;';
});
var Container = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var _props$w = props.w,
    w = _props$w === void 0 ? '1200px' : _props$w,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    _props$topBarPadding = props.topBarPadding,
    topBarPadding = _props$topBarPadding === void 0 ? false : _props$topBarPadding,
    style = props.style,
    _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$d);
  return React__default["default"].createElement(ContainerContainer, _extends$1({
    ref: ref,
    as: as,
    padding: padding,
    topBarPadding: topBarPadding,
    style: _extends$1((_extends2 = {}, _extends2[vars$4.width] = typeof w === 'string' ? w : w + "px", _extends2), style)
  }, rest));
});

var _excluded$c = ["h", "w", "as"];
var Space = React__default["default"].forwardRef(function (props, ref) {
  var height = props.h,
    width = props.w,
    _props$as = props.as,
    RenderComponent = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$c);
  if (typeof width !== 'undefined') {
    return React__default["default"].createElement(RenderComponent, _extends$1({
      ref: ref,
      style: {
        display: 'inline-block',
        width: width,
        height: height
      }
    }, rest));
  }
  return React__default["default"].createElement(RenderComponent, _extends$1({
    ref: ref,
    style: {
      display: 'block',
      width: width,
      height: height
    }
  }, rest));
});

var _excluded$b = ["margin", "as"];
var _templateObject$b;
var DividerItem = styled__default["default"].div(_templateObject$b || (_templateObject$b = _taggedTemplateLiteralLoose(["\n  border-top: 1px dashed ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.color.border;
});
var Divider = React__default["default"].forwardRef(function (props, ref) {
  var _props$margin = props.margin,
    margin = _props$margin === void 0 ? 'normal' : _props$margin,
    _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$b);
  if (!margin || margin === 'none') return React__default["default"].createElement(DividerItem, _extends$1({}, rest));
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(Space, {
    h: margin === 'wide' ? 64 : 32
  }), React__default["default"].createElement(DividerItem, _extends$1({
    as: as,
    ref: ref
  }, rest)), React__default["default"].createElement(Space, {
    h: margin === 'wide' ? 64 : 32
  }));
});

var _templateObject$a, _templateObject2$5;
var reset = react.css(_templateObject$a || (_templateObject$a = _taggedTemplateLiteralLoose(["\n  html,\n  body,\n  div,\n  span,\n  applet,\n  object,\n  iframe,\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6,\n  p,\n  blockquote,\n  pre,\n  a,\n  abbr,\n  acronym,\n  address,\n  big,\n  cite,\n  code,\n  del,\n  dfn,\n  em,\n  img,\n  ins,\n  kbd,\n  q,\n  s,\n  samp,\n  small,\n  strike,\n  strong,\n  sub,\n  sup,\n  tt,\n  var,\n  b,\n  u,\n  i,\n  center,\n  dl,\n  dt,\n  dd,\n  ol,\n  ul,\n  li,\n  fieldset,\n  form,\n  label,\n  legend,\n  table,\n  caption,\n  tbody,\n  tfoot,\n  thead,\n  tr,\n  th,\n  td,\n  article,\n  aside,\n  canvas,\n  details,\n  embed,\n  figure,\n  figcaption,\n  footer,\n  header,\n  hgroup,\n  menu,\n  nav,\n  output,\n  ruby,\n  section,\n  summary,\n  time,\n  mark,\n  audio,\n  video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n  article,\n  aside,\n  details,\n  figcaption,\n  figure,\n  footer,\n  header,\n  hgroup,\n  menu,\n  nav,\n  section {\n    display: block;\n  }\n  body {\n    line-height: 1;\n  }\n  ol,\n  ul {\n    list-style: none;\n  }\n  blockquote,\n  q {\n    quotes: none;\n  }\n  blockquote:before,\n  blockquote:after,\n  q:before,\n  q:after {\n    content: '';\n    content: none;\n  }\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n"])));
var globalCss = function globalCss(theme) {
  return react.css(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteralLoose(["\n  ", "\n\n  * {\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  html {\n    font-family: ", ";\n    font-weight: 400;\n    width: 100%;\n    background: ", ";\n  }\n\n  body {\n    margin: 0;\n    width: 100%;\n    line-height: 1.6;\n    color: ", ";\n    background: ", ";\n    scrollbar-width: thin;\n    scrollbar-color: ", " ", ";\n  }\n\n  ::selection {\n    color: ", ";\n    background: ", ";\n  }\n\n  a {\n    color: inherit;\n  }\n\n  b,\n  strong {\n    font-weight: 700;\n  }\n\n  i,\n  em {\n    font-style: italic;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n\n  sup {\n    top: -0.5em;\n  }\n\n  sub {\n    bottom: -0.25em;\n  }\n\n  small {\n    font-size: 75%;\n  }\n\n  pre,\n  code {\n    font-family: ", ";\n  }\n\n  /* @keepallvillain */\n  :lang(ko) {\n    h1,\n    h2,\n    h3 {\n      word-break: keep-all;\n    }\n  }\n\n  ", " {\n    font: inherit;\n  }\n\n  ", " {\n    border: none;\n    font: inherit;\n    text-align: inherit;\n  }\n\n  /* TODO remove named classes */\n  img.emoji {\n    height: 1em;\n    width: 1em;\n    margin: 0 0.05em 0 0.1em;\n    vertical-align: -0.1em;\n  }\n\n  /* TODO remove named classes */\n  .noscroll {\n    overflow: hidden !important;\n  }\n\n  /* TODO remove named classes */\n  .bronze {\n    color: #ad5600;\n  }\n\n  /* TODO remove named classes */\n  .silver {\n    color: #435f7a;\n  }\n\n  /* TODO remove named classes */\n  .gold {\n    color: #ec9a00;\n  }\n\n  /* TODO remove named classes */\n  .platinum {\n    color: #27e2a4;\n  }\n\n  /* TODO remove named classes */\n  .diamond {\n    color: #00b4fc;\n  }\n\n  /* TODO remove named classes */\n  .ruby {\n    color: #ff0062;\n  }\n\n  /* TODO remove named classes */\n  .master {\n    color: #b300e0;\n  }\n\n  ::-webkit-scrollbar {\n    width: 12px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n    border-left: 1px ", " dashed;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: ", ";\n  }\n  ::-webkit-scrollbar-thumb:window-inactive {\n    background: ", ";\n  }\n"])), reset, theme.typography.paragraph, theme.color.background.footer, theme.color.text.primary.main, theme.color.background.page, theme.color.border, theme.color.background.page, theme.color.background.page, curriedTransparentize$1(0.5, theme.color.text.primary.main), theme.typography.code, textInputs(), buttons(), theme.color.background.page, theme.color.border, theme.color.border, theme.color.border);
};
var SolvedGlobalStyles = function SolvedGlobalStyles() {
  var theme = react.useTheme();
  return React__default["default"].createElement(react.Global, {
    styles: globalCss(theme)
  });
};

var cssLength = function cssLength(_cssLength) {
  if (typeof _cssLength === 'number') {
    return _cssLength + "px";
  }
  return _cssLength || '0px';
};

var cssDiv = function cssDiv(a, b) {
  if (typeof a === 'number') {
    return a / b;
  }
  return "calc(" + cssLength(a) + " / " + b + ")";
};

var defaultPalette = {
  white: '#ffffff',
  gray: {
    0: '#ffffff',
    50: '#fdfdfe',
    100: '#f7f8f9',
    150: '#eaeced',
    200: '#dddfe0',
    250: '#d7d9da',
    300: '#d0d2d4',
    400: '#b8bcbf',
    500: '#8a8f95',
    600: '#5b626a',
    700: '#2c3640',
    750: '#1a2733',
    800: '#15202b',
    850: '#101a23',
    900: '#0b131b',
    950: '#040609',
    1000: '#000000'
  },
  black: '#000000',
  ac: '#17ce3a',
  status: {
    info: '#8a8f95',
    warn: '#ec9a00',
    error: '#ff0062',
    success: '#00b4fc',
    progress: '#17ce3a'
  },
  problemState: {
    ac: '#009f6b',
    partial: '#efc050',
    wa: '#e74c3c'
  },
  "class": {
    0: ['#4f5257', '#282a2e'],
    1: ['#249ce5', '#49fbfe'],
    2: ['#20c5e9', '#41fdfe'],
    3: ['#1bdf8b', '#37fefc'],
    4: ['#2bd521', '#58fd45'],
    5: ['#b0db15', '#fdfe2b'],
    6: ['#ebca0f', '#fefd1d'],
    7: ['#f3b412', '#fffd26'],
    8: ['#ff7d00', '#fffc00'],
    9: ['#f31b74', '#ff37ee'],
    10: ['#a720e8', '#fd43ff']
  }
};
var Light = {
  name: 'Light',
  color: {
    solvedAc: defaultPalette.ac,
    text: {
      primary: {
        main: defaultPalette.black,
        inverted: defaultPalette.white,
        light: defaultPalette.white,
        dark: defaultPalette.black
      },
      secondary: {
        main: defaultPalette.gray[500],
        inverted: defaultPalette.gray[400],
        light: defaultPalette.gray[400],
        dark: defaultPalette.gray[500]
      }
    },
    background: {
      page: defaultPalette.white,
      card: {
        main: defaultPalette.gray[100],
        dark: defaultPalette.gray[200]
      },
      table: {
        main: defaultPalette.gray[100],
        header: defaultPalette.gray[800]
      },
      footer: defaultPalette.gray[100],
      progress: defaultPalette.gray[900]
    },
    problem: defaultPalette.problemState,
    status: defaultPalette.status,
    border: defaultPalette.gray[200]
  },
  typography: {
    paragraph: '"Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple string Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    code: '"JetBrains Mono", "Noto Sans KR", "Consolas", "Courier New", Courier, monospace'
  },
  styles: {
    border: function border(color) {
      return "1px solid " + (color || defaultPalette.gray[200]);
    },
    shadow: function shadow(color, length) {
      return curriedTransparentize$1(0.6, color || defaultPalette.gray[200]) + " 0px " + cssLength(cssDiv(length || 8, 2)) + " " + cssLength(length || 8);
    }
  }
};
var Dark = _extends$1({}, Light, {
  name: 'Dark',
  color: _extends$1({}, Light.color, {
    text: {
      primary: {
        main: defaultPalette.white,
        inverted: defaultPalette.black,
        light: defaultPalette.white,
        dark: defaultPalette.black
      },
      secondary: {
        main: defaultPalette.gray[400],
        inverted: defaultPalette.gray[500],
        light: defaultPalette.gray[500],
        dark: defaultPalette.gray[400]
      }
    },
    background: {
      page: defaultPalette.gray[800],
      card: {
        main: defaultPalette.gray[900],
        dark: defaultPalette.gray[800]
      },
      table: {
        main: defaultPalette.gray[750],
        header: defaultPalette.white
      },
      footer: defaultPalette.gray[900],
      progress: defaultPalette.gray[950]
    },
    border: defaultPalette.gray[700]
  }),
  styles: {
    border: function border(color) {
      return "1px solid " + (color || defaultPalette.gray[700]).toString();
    },
    shadow: function shadow(color, length) {
      return curriedTransparentize$1(0.6, color || defaultPalette.gray[200]) + " 0px " + cssLength(cssDiv(length || 8, 2)) + " " + cssLength(length || 8);
    }
  }
});
var Black = _extends$1({}, Dark, {
  name: 'Black',
  color: _extends$1({}, Dark.color, {
    background: {
      page: defaultPalette.black,
      card: {
        main: defaultPalette.gray[900],
        dark: defaultPalette.gray[800]
      },
      table: {
        main: defaultPalette.gray[900],
        header: defaultPalette.white
      },
      footer: defaultPalette.gray[900],
      progress: defaultPalette.gray[700]
    }
  }),
  styles: {
    border: function border(color) {
      return "1px solid " + (color || defaultPalette.gray[900]).toString();
    },
    shadow: function shadow(color, length) {
      return curriedTransparentize$1(0.6, color || defaultPalette.gray[200]) + " 0px " + cssLength(cssDiv(length || 8, 2)) + " " + cssLength(length || 8);
    }
  }
});
var solvedThemes = {
  light: Light,
  dark: Dark,
  black: Black,
  palette: defaultPalette
};

var _excluded$a = ["title", "theme", "noDefaultStyles", "children", "arrow", "open", "place", "interactive", "activateOnHover", "activateOnClick", "noThemeChange", "zIndex", "onOpenChange"];
var _templateObject$9, _templateObject2$4, _templateObject3$2;
var TooltipWrapper = styled__default["default"].span(_templateObject$9 || (_templateObject$9 = _taggedTemplateLiteralLoose(["\n  display: inline;\n"])));
var TooltipContainer = styled__default["default"](framerMotion.motion(Card))(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteralLoose(["\n  background-color: ", ";\n  border: ", ";\n  box-shadow: ", ";\n  z-index: 30000;\n  backdrop-filter: blur(4px);\n  font-size: initial;\n  font-weight: initial;\n"])), function (_ref) {
  var theme = _ref.theme;
  return curriedTransparentize$1(0.1, theme.color.background.card.main);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.styles.border();
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.styles.shadow(undefined, 16);
});
var Arrow = styled__default["default"].div(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  width: 16px;\n  height: 16px;\n  border-width: 8px;\n  border-style: solid;\n  border-color: transparent transparent\n    ", "\n    transparent;\n  z-index: 30000;\n  pointer-events: none;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return curriedTransparentize$1(0.1, theme.color.background.card.main);
});
var renderSide = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};
var resolveArrowStyles = function resolveArrowStyles(arrowX, arrowY, arrowPosition, padding) {
  if (padding === void 0) {
    padding = 16;
  }
  if (arrowPosition === 'bottom') {
    return {
      left: arrowX != null ? arrowX : undefined,
      bottom: -padding,
      transform: "scaleY(-1)"
    };
  }
  if (arrowPosition === 'top') {
    return {
      left: arrowX != null ? arrowX : undefined,
      top: -padding
    };
  }
  if (arrowPosition === 'left') {
    return {
      top: arrowY != null ? arrowY : undefined,
      left: -16,
      transform: "rotate(-90deg)"
    };
  }
  if (arrowPosition === 'right') {
    return {
      top: arrowY != null ? arrowY : undefined,
      right: -16,
      transform: "rotate(90deg)"
    };
  }
  return {};
};
var Tooltip = function Tooltip(props) {
  var title = props.title,
    theme = props.theme,
    noBackground = props.noDefaultStyles,
    children = props.children,
    _props$arrow = props.arrow,
    drawArrow = _props$arrow === void 0 ? true : _props$arrow,
    open = props.open,
    place = props.place,
    _props$interactive = props.interactive,
    interactive = _props$interactive === void 0 ? false : _props$interactive,
    _props$activateOnHove = props.activateOnHover,
    activateOnHover = _props$activateOnHove === void 0 ? true : _props$activateOnHove,
    _props$activateOnClic = props.activateOnClick,
    activateOnClick = _props$activateOnClic === void 0 ? false : _props$activateOnClic,
    _props$noThemeChange = props.noThemeChange,
    noThemeChange = _props$noThemeChange === void 0 ? false : _props$noThemeChange,
    zIndex = props.zIndex,
    onOpenChange = props.onOpenChange,
    cardProps = _objectWithoutPropertiesLoose(props, _excluded$a);
  var _useState = React.useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var renderTooltip = typeof open === 'boolean' ? open : isOpen;
  var arrowRef = React.useRef(null);
  var handleOpenChange = function handleOpenChange(open) {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  var _useFloating = react$1.useFloating({
      placement: place,
      strategy: 'fixed',
      open: isOpen,
      onOpenChange: handleOpenChange,
      middleware: [react$1.offset(16), react$1.shift({
        padding: 16
      }), react$1.flip(), react$1.arrow({
        element: arrowRef
      })],
      whileElementsMounted: function whileElementsMounted(reference, floating, update) {
        return react$1.autoUpdate(reference, floating, update, {
          animationFrame: true
        });
      }
    }),
    x = _useFloating.x,
    y = _useFloating.y,
    refs = _useFloating.refs,
    strategy = _useFloating.strategy,
    context = _useFloating.context,
    placement = _useFloating.placement,
    _useFloating$middlewa = _useFloating.middlewareData.arrow,
    _useFloating$middlewa2 = _useFloating$middlewa === void 0 ? {} : _useFloating$middlewa,
    arrowX = _useFloating$middlewa2.x,
    arrowY = _useFloating$middlewa2.y;
  var _useInteractions = react$1.useInteractions([react$1.useHover(context, {
      enabled: activateOnHover,
      delay: 200,
      move: true,
      handleClose: react$1.safePolygon({
        buffer: 1
      })
    }), react$1.useClick(context, {
      enabled: activateOnClick
    }), react$1.useDismiss(context, {
      enabled: activateOnClick
    })]),
    getReferenceProps = _useInteractions.getReferenceProps,
    getFloatingProps = _useInteractions.getFloatingProps;
  var RenderComponent = noBackground ? framerMotion.motion.div : TooltipContainer;
  var ThemeProviderComponent = React.useMemo(function () {
    return noThemeChange || noBackground ? React__default["default"].Fragment : function (_ref5) {
      var children = _ref5.children;
      return (
        // eslint-disable-next-line react/jsx-indent
        React__default["default"].createElement(react.ThemeProvider, {
          theme: theme || solvedThemes.dark
        }, children)
      );
    };
  }, [noThemeChange, noBackground, theme]);
  var arrowPosition = renderSide[placement.split('-')[0]];
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(TooltipWrapper, _extends$1({
    ref: refs.setReference
  }, getReferenceProps()), children), React__default["default"].createElement(react$1.FloatingPortal, null, React__default["default"].createElement(ThemeProviderComponent, null, React__default["default"].createElement(framerMotion.AnimatePresence, null, renderTooltip && React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(RenderComponent, _extends$1({
    ref: refs.setFloating
  }, getFloatingProps(_extends$1({}, cardProps || {}, {
    style: _extends$1({}, 'style' in cardProps ? cardProps.style || {} : {}, {
      position: strategy,
      top: y || 0,
      left: x || 0,
      pointerEvents: interactive ? 'auto' : 'none',
      zIndex: zIndex
    })
  })), {
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    },
    initial: {
      opacity: 0,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.9
    }
  }), title, drawArrow && React__default["default"].createElement(Arrow, {
    ref: arrowRef,
    style: resolveArrowStyles(arrowX, arrowY, arrowPosition)
  })))))));
};

var _excluded$9 = ["interactive", "activateOnHover", "activateOnClick", "noThemeChange"];
var Dropdown = function Dropdown(props) {
  var _props$interactive = props.interactive,
    interactive = _props$interactive === void 0 ? true : _props$interactive,
    _props$activateOnHove = props.activateOnHover,
    activateOnHover = _props$activateOnHove === void 0 ? false : _props$activateOnHove,
    _props$activateOnClic = props.activateOnClick,
    activateOnClick = _props$activateOnClic === void 0 ? true : _props$activateOnClic,
    _props$noThemeChange = props.noThemeChange,
    noThemeChange = _props$noThemeChange === void 0 ? true : _props$noThemeChange,
    rest = _objectWithoutPropertiesLoose(props, _excluded$9);
  return React__default["default"].createElement(Tooltip, _extends$1({
    interactive: interactive,
    activateOnHover: activateOnHover,
    activateOnClick: activateOnClick,
    noThemeChange: noThemeChange
  }, rest));
};

var _excluded$8 = ["padding", "fullHeight", "as"];
var _templateObject$8;
var paddingMap$1 = {
  none: 'padding: 0;',
  normal: 'padding: 32px 0;',
  wide: 'padding: 64px 0;'
};
var EmptyStatePlaceholderContainer = styled__default["default"].div(_templateObject$8 || (_templateObject$8 = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  width: 100%;\n  color: ", ";\n  text-align: center;\n"])), cssCentering, function (_ref) {
  var fullHeight = _ref.fullHeight;
  return fullHeight && 'height: 100%;';
}, function (_ref2) {
  var padding = _ref2.padding;
  return paddingMap$1[padding || 'normal'];
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.color.text.secondary.main;
});
var EmptyStatePlaceholder = React__default["default"].forwardRef(function (props, ref) {
  var padding = props.padding,
    fullHeight = props.fullHeight,
    _props$as = props.as,
    as = _props$as === void 0 ? 'div' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$8);
  return React__default["default"].createElement(EmptyStatePlaceholderContainer, _extends$1({
    as: as,
    ref: ref,
    fullHeight: fullHeight,
    padding: padding
  }, rest));
});

var _excluded$7 = ["backgroundColor", "padding", "style", "as"];
var _templateObject$7;
var _cssVariables$2 = cssVariables({
    backgroundColor: function backgroundColor(theme) {
      return theme.color.background.footer;
    },
    textColor: function textColor(theme) {
      return theme.color.text.secondary.main;
    }
  }, 'footer'),
  vars$3 = _cssVariables$2.vars,
  v$4 = _cssVariables$2.v,
  styles$2 = _cssVariables$2.styles;
var paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 16px 0;',
  wide: 'padding: 32px 0;'
};
var FooterContainer = styled__default["default"].nav(_templateObject$7 || (_templateObject$7 = _taggedTemplateLiteralLoose(["\n  ", "\n  background: ", ";\n  color: ", ";\n  ", "\n  font-size: small;\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$2(theme);
}, v$4.backgroundColor, v$4.textColor, function (_ref2) {
  var padding = _ref2.padding;
  return paddingMap[padding];
});
var Footer = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var backgroundColor = props.backgroundColor,
    _props$padding = props.padding,
    padding = _props$padding === void 0 ? 'normal' : _props$padding,
    style = props.style,
    _props$as = props.as,
    as = _props$as === void 0 ? 'footer' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$7);
  return React__default["default"].createElement(FooterContainer, _extends$1({
    ref: ref,
    as: as,
    padding: padding,
    style: _extends$1((_extends2 = {}, _extends2[vars$3.backgroundColor] = backgroundColor, _extends2), style)
  }, rest));
});

var _excluded$6 = ["backgroundColor", "style", "as"];
var _templateObject$6;
var navBarVariables = cssVariables({
  backgroundColor: function backgroundColor(theme) {
    return theme.color.background.page;
  },
  textColor: function textColor(theme) {
    return theme.color.text.primary.main;
  }
}, 'navBar');
var vars$2 = navBarVariables.vars,
  v$3 = navBarVariables.v;
var NavbarContainer = styled__default["default"].header(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteralLoose(["\n  width: 100%;\n  height: 72px;\n  background-color: ", ";\n  color: ", ";\n  border-bottom: ", ";\n"])), v$3.backgroundColor, v$3.textColor, function (_ref) {
  var theme = _ref.theme;
  return theme.styles.border();
});
var NavBar = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var theme = react.useTheme();
  var backgroundColor = props.backgroundColor,
    style = props.style,
    _props$as = props.as,
    as = _props$as === void 0 ? 'header' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$6);
  return React__default["default"].createElement(NavbarContainer, _extends$1({
    ref: ref,
    as: as,
    style: _extends$1((_extends2 = {}, _extends2[vars$2.backgroundColor] = backgroundColor, _extends2[vars$2.textColor] = backgroundColor && readableColor(backgroundColor, theme), _extends2), style)
  }, rest));
});

var _excluded$5 = ["current", "disabled", "backgroundColor", "hoverColor", "activeColor", "style", "as"];
var _templateObject$5, _templateObject2$3;
var _cssVariables$1 = cssVariables(_extends$1({}, transparentHoverTemplate, {
    activeBackgroundColor: function activeBackgroundColor(theme) {
      return computeHoverColor(theme.color.text.primary.main);
    },
    activeTextColor: function activeTextColor(theme) {
      return theme.color.text.primary.inverted;
    }
  }), 'pagination-item'),
  vars$1 = _cssVariables$1.vars,
  v$2 = _cssVariables$1.v,
  styles$1 = _cssVariables$1.styles;
var whenCurrent = react.css(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteralLoose(["\n  font-weight: bold;\n  background: ", ";\n  color: ", ";\n  &:not([disabled]):hover,\n  &:not([disabled]):active {\n    background: ", ";\n    color: ", ";\n  }\n"])), v$2.activeBackgroundColor, v$2.activeTextColor, v$2.activeBackgroundColor, v$2.activeTextColor);
var PaginationItemContainer = styled__default["default"].button(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  flex: 1 0 0;\n  display: inline-block;\n  transition: background-color 0.2s;\n  min-width: 64px;\n  padding: 16px 8px;\n  text-decoration: none;\n  text-align: center;\n  background: ", ";\n  color: ", ";\n  &:not([disabled]):hover,\n  &:not([disabled]):active {\n    background: ", ";\n    color: ", ";\n  }\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles$1(theme);
}, ellipsis(), cssClickable, v$2.backgroundColor, v$2.textColor, v$2.hoverBackgroundColor, v$2.hoverTextColor, function (_ref2) {
  var current = _ref2.current;
  return current && whenCurrent;
});
var PaginationItem = React__default["default"].forwardRef(function (props, ref) {
  var _extends2;
  var solvedTheme = react.useTheme();
  var _props$current = props.current,
    current = _props$current === void 0 ? false : _props$current,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    backgroundColor = props.backgroundColor,
    hoverColor = props.hoverColor,
    activeColor = props.activeColor,
    style = props.style,
    _props$as = props.as,
    as = _props$as === void 0 ? 'a' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$5);
  var computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  var computedActiveColor = activeColor || backgroundColor && computeHoverColor(backgroundColor);
  return React__default["default"].createElement(PaginationItemContainer, _extends$1({
    ref: ref,
    as: as,
    role: "button",
    tabIndex: 0,
    current: current,
    disabled: disabled,
    style: _extends$1((_extends2 = {}, _extends2[vars$1.backgroundColor] = backgroundColor, _extends2[vars$1.hoverBackgroundColor] = computedHoverColor, _extends2[vars$1.activeBackgroundColor] = computedActiveColor, _extends2[vars$1.textColor] = backgroundColor && readableColor(backgroundColor, solvedTheme), _extends2[vars$1.hoverTextColor] = computedHoverColor && readableColor(computedHoverColor, solvedTheme), _extends2[vars$1.activeTextColor] = computedActiveColor && readableColor(computedActiveColor, solvedTheme), _extends2), style)
  }, rest));
});

var _excluded$4 = ["margin", "as"];
var _templateObject$4;
var marginMap = {
  none: '0',
  normal: '1em',
  wide: '2em'
};
var ParagraphContainer = styled__default["default"].p(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteralLoose(["\n  margin-block-start: ", ";\n  margin-block-end: ", ";\n  margin-inline-start: 0;\n  margin-inline-end: 0;\n"])), function (_ref) {
  var margin = _ref.margin;
  return marginMap[margin];
}, function (_ref2) {
  var margin = _ref2.margin;
  return marginMap[margin];
});
var Paragraph = React__default["default"].forwardRef(function (props, ref) {
  var _props$margin = props.margin,
    margin = _props$margin === void 0 ? 'normal' : _props$margin,
    _props$as = props.as,
    as = _props$as === void 0 ? 'p' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$4);
  return React__default["default"].createElement(ParagraphContainer, _extends$1({
    ref: ref,
    as: as,
    margin: margin
  }, rest));
});

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v$1=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v$1)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$2;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

var has$1 = has$2;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = ReactPropTypesSecret$1;
  var loggedTypeFailures = {};
  var has = has$1;

  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes$1.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

var checkPropTypes = checkPropTypes_1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */








var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has$1(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has$1(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret$1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var require$$1 = factoryWithTypeCheckers;

var require$$2 = factoryWithThrowingShims;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var propTypes = createCommonjsModule(function (module) {
if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require$$1(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require$$2();
}
});

var PropTypes = propTypes;

/**
 * @tabler/icons-react v2.47.0 - MIT
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @tabler/icons-react v2.47.0 - MIT
 */

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var createReactComponent = (iconName, iconNamePascal, iconNode) => {
  const Component = React.forwardRef(
    (_a, ref) => {
      var _b = _a, { color = "currentColor", size = 24, stroke = 2, children } = _b, rest = __objRest(_b, ["color", "size", "stroke", "children"]);
      return React.createElement(
        "svg",
        __spreadValues(__spreadProps(__spreadValues({
          ref
        }, defaultAttributes), {
          width: size,
          height: size,
          stroke: color,
          strokeWidth: stroke,
          className: `tabler-icon tabler-icon-${iconName}`
        }), rest),
        [...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)), ...children || []]
      );
    }
  );
  Component.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  Component.displayName = `${iconNamePascal}`;
  return Component;
};

/**
 * @tabler/icons-react v2.47.0 - MIT
 */

var IconChevronDown = createReactComponent("chevron-down", "IconChevronDown", [
  ["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]
]);

var _excluded$3 = ["fullWidth", "disableEllipsis", "items", "value", "zIndex", "onChange", "render", "ListItemProps"];
var _templateObject$3, _templateObject2$2, _templateObject3$1;
// TODO add style variables
var SelectDisplay = styled__default["default"].div(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteralLoose(["\n  ", "\n  ", "\n  ", "\n  position: relative;\n  display: inline-block;\n  font-family: inherit;\n  height: auto;\n  line-height: normal;\n  font-size: 1rem;\n  padding: 0.8em 0.5em;\n  padding-right: 48px;\n  max-width: 100%;\n  min-width: 74px;\n  background: ", ";\n  color: ", ";\n  border: ", ";\n  border-radius: 8px;\n  width: ", ";\n"])), cssDisablable, cssClickable, function (_ref) {
  var enableEllipsis = _ref.ellipsis;
  return enableEllipsis && ellipsis();
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.color.background.footer;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.color.text.primary.main;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.styles.border();
}, function (_ref5) {
  var fullWidth = _ref5.fullWidth;
  return fullWidth ? '100%' : 'auto';
});
var SelectItemsWrapper = styled__default["default"](framerMotion.motion.div)(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteralLoose(["\n  background: ", ";\n  border: ", ";\n  border-radius: 8px;\n  overflow-y: auto;\n  box-shadow: ", ";\n  max-width: 100vw;\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.color.background.page;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.styles.border();
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.styles.shadow(undefined, 16);
});
var SelectInputAdornment = styled__default["default"](Centering)(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  width: 48px;\n  color: ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.color.text.secondary.main;
});
var Select = React__default["default"].forwardRef(function (props, ref) {
  var _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$disableEllipsi = props.disableEllipsis,
    disableEllipsis = _props$disableEllipsi === void 0 ? false : _props$disableEllipsi,
    _props$items = props.items,
    items = _props$items === void 0 ? [] : _props$items,
    value = props.value,
    zIndex = props.zIndex,
    onChange = props.onChange,
    _props$render = props.render,
    render = _props$render === void 0 ? function (e) {
      return typeof e === 'string' ? e : e.value;
    } : _props$render,
    ListItemProps = props.ListItemProps,
    rest = _objectWithoutPropertiesLoose(props, _excluded$3);
  var theme = react.useTheme();
  var listRef = React.useRef([]);
  var listContentRef = React.useRef([]);
  var allowSelectRef = React.useRef(false);
  var allowMouseUpRef = React.useRef(true);
  var selectTimeoutRef = React.useRef(null);
  var _useState = React.useState(false),
    open = _useState[0],
    setOpen = _useState[1];
  var _useState2 = React.useState(0),
    selectedIndex = _useState2[0],
    setSelectedIndex = _useState2[1];
  var _useState3 = React.useState(null),
    activeIndex = _useState3[0],
    setActiveIndex = _useState3[1];
  var _useState4 = React.useState(false),
    controlledScrolling = _useState4[0],
    setControlledScrolling = _useState4[1];
  var _useState5 = React.useState(false),
    touch = _useState5[0],
    setTouch = _useState5[1];
  var handleCommit = function handleCommit(index) {
    setSelectedIndex(index);
    if (onChange) {
      onChange(items[index]);
    }
    setOpen(false);
  };
  React.useEffect(function () {
    var idx = items.findIndex(function (it) {
      return typeof it === 'string' ? it === value : it.value === value;
    });
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  }, [value]);
  var _useFloating = react$1.useFloating({
      placement: 'bottom',
      open: open,
      onOpenChange: setOpen,
      whileElementsMounted: function whileElementsMounted(reference, floating, update) {
        return react$1.autoUpdate(reference, floating, update, {
          animationFrame: true
        });
      },
      middleware: [react$1.offset(8)].concat([touch ? react$1.shift({
        crossAxis: true,
        padding: 8
      }) : react$1.flip({
        padding: 8
      })], [react$1.size({
        apply: function apply(_ref0) {
          var elements = _ref0.elements,
            availableHeight = _ref0.availableHeight,
            availableWidth = _ref0.availableWidth,
            rects = _ref0.rects;
          Object.assign(elements.floating.style, {
            maxHeight: availableHeight + "px",
            minWidth: rects.reference.width + "px",
            maxWidth: availableWidth + "px"
          });
        },
        padding: 8
      })])
    }),
    x = _useFloating.x,
    y = _useFloating.y,
    refs = _useFloating.refs,
    strategy = _useFloating.strategy,
    context = _useFloating.context;
  var reference = refs.reference;
  React.useImperativeHandle(ref, function () {
    return reference;
  });
  var _useInteractions = react$1.useInteractions([react$1.useClick(context), react$1.useDismiss(context), react$1.useRole(context, {
      role: 'listbox'
    }), react$1.useListNavigation(context, {
      listRef: listRef,
      activeIndex: activeIndex,
      selectedIndex: selectedIndex,
      onNavigate: setActiveIndex
    }), react$1.useTypeahead(context, {
      listRef: listContentRef,
      activeIndex: activeIndex,
      onMatch: open ? setActiveIndex : handleCommit
    })]),
    getReferenceProps = _useInteractions.getReferenceProps,
    getFloatingProps = _useInteractions.getFloatingProps,
    getItemProps = _useInteractions.getItemProps;
  React.useLayoutEffect(function () {
    if (open) {
      selectTimeoutRef.current = setTimeout(function () {
        allowSelectRef.current = true;
      }, 300);
      return function () {
        clearTimeout(selectTimeoutRef.current);
      };
    }
    allowSelectRef.current = false;
    allowMouseUpRef.current = true;
    return undefined;
  }, [open]);
  React.useLayoutEffect(function () {
    var onPointerDown = function onPointerDown(e) {
      var _refs$floating$curren;
      var target = e.target;
      if (!((_refs$floating$curren = refs.floating.current) != null && _refs$floating$curren.contains(target))) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('pointerdown', onPointerDown);
      return function () {
        document.removeEventListener('pointerdown', onPointerDown);
      };
    }
    return undefined;
  }, [open, refs]);
  React.useLayoutEffect(function () {
    if (open && controlledScrolling) {
      requestAnimationFrame(function () {
        if (activeIndex != null) {
          var _listRef$current$acti;
          (_listRef$current$acti = listRef.current[activeIndex]) == null || _listRef$current$acti.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    }
  }, [open, refs, controlledScrolling, activeIndex]);
  React.useLayoutEffect(function () {
    if (open) {
      requestAnimationFrame(function () {
        if (selectedIndex != null) {
          var _listRef$current$sele;
          (_listRef$current$sele = listRef.current[selectedIndex]) == null || _listRef$current$sele.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    }
  }, [open, selectedIndex]);
  React.useLayoutEffect(function () {
    if (refs.floating.current) {
      refs.floating.current.style.maxHeight = '';
    }
  }, [refs]);
  var selected = selectedIndex < items.length ? items[selectedIndex] : null;
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(SelectDisplay, _extends$1({
    ref: refs.setReference,
    fullWidth: fullWidth,
    ellipsis: !disableEllipsis,
    role: "button",
    tabIndex: 0
  }, getReferenceProps({
    onTouchStart: function onTouchStart() {
      setTouch(true);
    },
    onPointerMove: function onPointerMove(_ref1) {
      var pointerType = _ref1.pointerType;
      if (pointerType === 'mouse') {
        setTouch(false);
      }
    }
  }), rest), selected ? render(selected) : null, React__default["default"].createElement(SelectInputAdornment, null, React__default["default"].createElement(IconChevronDown, null))), React__default["default"].createElement(react$1.FloatingPortal, null, React__default["default"].createElement(framerMotion.AnimatePresence, null, open && React__default["default"].createElement(react$1.FloatingOverlay, {
    lockScroll: !touch,
    style: {
      zIndex: typeof zIndex === 'number' ? zIndex : 1
    }
  }, React__default["default"].createElement(react$1.FloatingFocusManager, {
    context: context
  }, React__default["default"].createElement(SelectItemsWrapper, _extends$1({
    style: {
      position: strategy,
      top: y != null ? y : 0,
      left: x != null ? x : 0,
      originX: 0.5,
      originY: 0
    },
    ref: refs.setFloating
  }, getFloatingProps({
    onKeyDown: function onKeyDown() {
      setControlledScrolling(true);
    },
    onPointerMove: function onPointerMove() {
      setControlledScrolling(false);
    },
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
    }
  }), {
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    },
    initial: {
      opacity: 0,
      y: 0,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 8,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: 0,
      scale: 0.9
    }
  }), items.map(function (item, i) {
    return React__default["default"].createElement(ListItem, _extends$1({
      clickable: true,
      key: typeof item === 'string' ? item : item.value,
      role: "option",
      tabIndex: 0,
      "aria-selected": selectedIndex === i,
      backgroundColor: i === selectedIndex ? theme.color.background.card.main : undefined,
      ref: function ref(node) {
        listRef.current[i] = node;
        listContentRef.current[i] = typeof item === 'string' ? item : item.value;
      }
    }, getItemProps(_extends$1({}, ListItemProps, {
      style: _extends$1({}, disableEllipsis ? {} : {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }, (ListItemProps == null ? void 0 : ListItemProps.style) || {}, {
        fontWeight: i === selectedIndex ? 'bold' : 'normal'
      }),
      onTouchStart: function onTouchStart() {
        allowSelectRef.current = true;
        allowMouseUpRef.current = false;
      },
      onKeyDown: function onKeyDown(e) {
        allowSelectRef.current = true;
        if (e.key === 'Enter' && allowSelectRef.current) {
          handleCommit(i);
        }
      },
      onClick: function onClick() {
        if (allowSelectRef.current) {
          handleCommit(i);
        }
      },
      onMouseUp: function onMouseUp() {
        if (!allowMouseUpRef.current) {
          return;
        }
        if (allowSelectRef.current) {
          handleCommit(i);
        }
        clearTimeout(selectTimeoutRef.current);
        selectTimeoutRef.current = setTimeout(function () {
          allowSelectRef.current = true;
        });
      }
    }))), render(item, i));
  })))))));
});

var _excluded$2 = ["value", "onChange", "backgroundColor", "backgroundActiveColor", "knobColor", "knobActiveColor"];
var _templateObject$2, _templateObject2$1;
var _cssVariables = cssVariables({
    backgroundColor: function backgroundColor(theme) {
      return theme.color.background.page;
    },
    backgroundActiveColor: function backgroundActiveColor(theme) {
      return theme.color.solvedAc;
    },
    knobColor: function knobColor(theme) {
      return theme.color.background.page;
    },
    knobBorderColor: function knobBorderColor(theme) {
      return theme.color.border;
    },
    knobActiveColor: function knobActiveColor(theme) {
      return theme.color.background.page;
    },
    knobActiveBorderColor: function knobActiveBorderColor(theme) {
      return theme.color.border;
    }
  }, 'button'),
  vars = _cssVariables.vars,
  v = _cssVariables.v,
  styles = _cssVariables.styles;
var SwitchBase = styled__default["default"].div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteralLoose(["\n  ", "\n  height: 30px;\n  width: 56px;\n  display: inline-block;\n  background-color: ", ";\n  border-radius: 30px;\n  cursor: pointer;\n  border: ", ";\n  box-shadow: inset 1px 1px 9px -3px rgba(4, 4, 4, 0.08),\n    1px 2px 6px -2px rgba(0, 0, 0, 0.01);\n  transition: background-color 0.2s ease-in;\n"])), function (_ref) {
  var theme = _ref.theme;
  return styles(theme);
}, function (_ref2) {
  var active = _ref2.active;
  return active ? v.backgroundActiveColor : v.backgroundColor;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.styles.border();
});
var SwitchKnob = styled__default["default"].div(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteralLoose(["\n  width: 26px;\n  height: 26px;\n  display: inline-block;\n  background-color: ", ";\n  border: ", ";\n  box-shadow: 0 1px 3px rgba(107, 106, 106, 0.26),\n    0 5px 1px rgba(107, 106, 106, 0.13);\n  border-radius: 26px;\n  margin: 1px 1px;\n  margin-left: 1px;\n  transform: ", ";\n  transition: transform 0.2s ease-in, background-color 0.2s ease-in,\n    border-color 0.2s ease-in;\n"])), function (_ref4) {
  var active = _ref4.active;
  return active ? v.knobActiveColor : v.knobColor;
}, function (_ref5) {
  var active = _ref5.active;
  return "1px solid " + (active ? v.knobActiveBorderColor : v.knobBorderColor);
}, function (_ref6) {
  var active = _ref6.active;
  return active ? 'translateX(26px)' : 'translateX(0)';
});
var computeKnobBorderColor = function computeKnobBorderColor(props) {
  var knobColor = props.knobColor,
    knobBorderColor = props.knobBorderColor;
  if (knobBorderColor) return knobBorderColor;
  if (knobColor) return computeHoverColor(knobColor);
  return undefined;
};
var computeKnobActiveBorderColor = function computeKnobActiveBorderColor(props) {
  var knobColor = props.knobColor,
    _props$knobActiveColo = props.knobActiveColor,
    knobActiveColor = _props$knobActiveColo === void 0 ? knobColor : _props$knobActiveColo,
    knobBorderColor = props.knobBorderColor,
    _props$knobActiveBord = props.knobActiveBorderColor,
    knobActiveBorderColor = _props$knobActiveBord === void 0 ? knobBorderColor : _props$knobActiveBord;
  if (knobActiveBorderColor) return knobActiveBorderColor;
  if (knobActiveColor) return computeHoverColor(knobActiveColor);
  return undefined;
};
var Switch = React__default["default"].forwardRef(function (props, ref) {
  var _style, _style2;
  var value = props.value,
    onChange = props.onChange,
    backgroundColor = props.backgroundColor,
    backgroundActiveColor = props.backgroundActiveColor,
    knobColor = props.knobColor,
    _props$knobActiveColo2 = props.knobActiveColor,
    knobActiveColor = _props$knobActiveColo2 === void 0 ? knobColor : _props$knobActiveColo2,
    rest = _objectWithoutPropertiesLoose(props, _excluded$2);
  var computedKnobBorderColor = computeKnobBorderColor(props);
  var computedKnobActiveBorderColor = computeKnobActiveBorderColor(props);
  return React__default["default"].createElement(SwitchBase, _extends$1({
    ref: ref,
    active: value,
    onClick: function onClick() {
      return onChange && onChange(!value);
    },
    style: (_style = {}, _style[vars.backgroundColor] = backgroundColor, _style[vars.backgroundActiveColor] = backgroundActiveColor, _style)
  }, rest), React__default["default"].createElement(SwitchKnob, {
    active: value,
    style: (_style2 = {}, _style2[vars.knobColor] = knobColor, _style2[vars.knobActiveColor] = knobActiveColor, _style2[vars.knobBorderColor] = computedKnobBorderColor, _style2[vars.knobActiveBorderColor] = computedKnobActiveBorderColor, _style2)
  }));
});

var _excluded$1 = ["fullWidth", "multiline", "disabled", "resizable", "as"];
var _templateObject$1;
var TextFieldContainer = styled__default["default"].input(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteralLoose(["\n  ", "\n  font-family: inherit;\n  height: auto;\n  line-height: normal;\n  font-size: 1rem;\n  padding: 0.8em 0.5em;\n  background: ", ";\n  color: ", ";\n  border: ", ";\n  border-radius: 8px;\n  width: ", ";\n  resize: ", ";\n"])), cssDisablable, function (_ref) {
  var theme = _ref.theme;
  return theme.color.background.footer;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.color.text.primary.main;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.styles.border();
}, function (_ref4) {
  var fullWidth = _ref4.fullWidth;
  return fullWidth ? '100%' : 'auto';
}, function (_ref5) {
  var resizable = _ref5.resizable;
  return resizable;
});
var getResizable = function getResizable(resizable) {
  if (typeof resizable === 'boolean') {
    return resizable ? 'both' : 'none';
  }
  if (!resizable) {
    return 'none';
  }
  return resizable;
};
var TextField = React__default["default"].forwardRef(function (props, ref) {
  var _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    _props$multiline = props.multiline,
    multiline = _props$multiline === void 0 ? false : _props$multiline,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$resizable = props.resizable,
    resizable = _props$resizable === void 0 ? false : _props$resizable,
    _props$as = props.as,
    as = _props$as === void 0 ? multiline ? 'textarea' : 'input' : _props$as,
    rest = _objectWithoutPropertiesLoose(props, _excluded$1);
  return React__default["default"].createElement(TextFieldContainer, _extends$1({
    fullWidth: fullWidth,
    disabled: disabled,
    resizable: getResizable(resizable),
    ref: ref,
    as: as
  }, rest));
});

var _excluded = ["variant", "as"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0, _templateObject1, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19;
var variants = function variants(theme) {
  return {
    "default": react.css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose([""]))),
    description: react.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      color: ", ";\n    "])), theme.color.text.secondary.main),
    error: react.css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      color: ", ";\n    "])), theme.color.status.error),
    info: react.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      color: ", ";\n    "])), theme.color.status.info),
    progress: react.css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      color: ", ";\n    "])), theme.color.status.progress),
    success: react.css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      color: ", ";\n    "])), theme.color.status.success),
    warn: react.css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      color: ", ";\n    "])), theme.color.status.warn),
    h1: react.css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      display: block;\n      word-break: keep-all;\n      font-weight: 800;\n      font-size: 2em;\n      letter-spacing: -0.04ch;\n      margin-block-start: 0.67em;\n      margin-block-end: 0.67em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n    "]))),
    h2: react.css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n      display: block;\n      word-break: keep-all;\n      font-weight: 800;\n      font-size: 1.5em;\n      letter-spacing: -0.02ch;\n      margin-block-start: 0.83em;\n      margin-block-end: 0.83em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n    "]))),
    h3: react.css(_templateObject0 || (_templateObject0 = _taggedTemplateLiteralLoose(["\n      display: block;\n      word-break: keep-all;\n      font-weight: 800;\n      font-size: 1.2em;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n    "]))),
    h4: react.css(_templateObject1 || (_templateObject1 = _taggedTemplateLiteralLoose(["\n      display: block;\n      font-weight: 800;\n      font-size: 1em;\n      letter-spacing: 0.02ch;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n    "]))),
    h5: react.css(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n      display: block;\n      font-weight: 700;\n      font-size: 1em;\n      letter-spacing: 0.02ch;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n    "]))),
    h6: react.css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n      display: block;\n      font-weight: 600;\n      font-size: 1em;\n      letter-spacing: 0.02ch;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n    "]))),
    small: react.css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteralLoose(["\n      font-size: 75%;\n    "]))),
    smaller: react.css(_templateObject13 || (_templateObject13 = _taggedTemplateLiteralLoose(["\n      font-size: 65%;\n    "]))),
    tabular: react.css(_templateObject14 || (_templateObject14 = _taggedTemplateLiteralLoose(["\n      font-feature-settings: 'tnum';\n    "]))),
    readable: react.css(_templateObject15 || (_templateObject15 = _taggedTemplateLiteralLoose(["\n      font-feature-settings: 'ss06', 'zero';\n    "]))),
    'no-ligatures': react.css(_templateObject16 || (_templateObject16 = _taggedTemplateLiteralLoose(["\n      font-variant-ligatures: none;\n    "]))),
    'no-margin': react.css(_templateObject17 || (_templateObject17 = _taggedTemplateLiteralLoose(["\n      margin: 0;\n    "]))),
    ellipsis: react.css(_templateObject18 || (_templateObject18 = _taggedTemplateLiteralLoose(["\n      ", "\n    "])), ellipsis())
  };
};
var variantKeys = Object.keys(variants(solvedThemes.light));
var asMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  small: 'small',
  smaller: 'small'
};
var TypoContainer = styled__default["default"].span(_templateObject19 || (_templateObject19 = _taggedTemplateLiteralLoose(["\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme,
    variant = _ref.variant;
  return variant.map(function (v) {
    return variants(theme)[v];
  });
});
var firstVariant = function firstVariant(variant) {
  if (typeof variant === 'string') return variant;
  if (Array.isArray(variant) && variant.length > 0) return variant[0];
  return undefined;
};
var Typo = React__default["default"].forwardRef(function (props, ref) {
  var _firstVariant;
  var _props$variant = props.variant,
    variant = _props$variant === void 0 ? [] : _props$variant,
    as = props.as,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var calculatedVariants = [].concat(typeof variant === 'string' ? [variant] : variant, Object.entries(rest).filter(function (_ref2) {
    var k = _ref2[0],
      v = _ref2[1];
    return variantKeys.includes(k) && typeof v === 'boolean' && v;
  }).map(function (_ref3) {
    var k = _ref3[0];
    return k;
  }));
  // TODO types are wrong when `as` is inferred by variant
  var calculatedAs = as || asMap[(_firstVariant = firstVariant(calculatedVariants)) != null ? _firstVariant : 'default'] || 'span';
  var filteredRest = Object.fromEntries(Object.entries(rest).filter(function (_ref4) {
    var k = _ref4[0];
    return !variantKeys.includes(k);
  }));
  return React__default["default"].createElement(TypoContainer, _extends$1({
    ref: ref,
    as: calculatedAs,
    variant: calculatedVariants
  }, filteredRest));
});

exports.Button = Button;
exports.Card = Card;
exports.Cell = Cell;
exports.Centering = Centering;
exports.Chip = Chip;
exports.Collapse = Collapse;
exports.Container = Container;
exports.Divider = Divider;
exports.Dropdown = Dropdown;
exports.EmptyStatePlaceholder = EmptyStatePlaceholder;
exports.Enumerate = Enumerate;
exports.Footer = Footer;
exports.Item = Item;
exports.Itemize = Itemize;
exports.List = List;
exports.ListItem = ListItem;
exports.NavBar = NavBar;
exports.PaginationItem = PaginationItem;
exports.Paragraph = Paragraph;
exports.Row = Row;
exports.Select = Select;
exports.SolvedGlobalStyles = SolvedGlobalStyles;
exports.Space = Space;
exports.Switch = Switch;
exports.Tab = Tab;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableContainer = TableContainer;
exports.TableFoot = TableFoot;
exports.TableHead = TableHead;
exports.Tabs = Tabs;
exports.TextField = TextField;
exports.Tooltip = Tooltip;
exports.Typo = Typo;
exports.navBarVariables = navBarVariables;
exports.solvedThemes = solvedThemes;
//# sourceMappingURL=index.js.map
