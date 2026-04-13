import styled from '@emotion/styled';
import React, { useContext, useRef, useState, useLayoutEffect, useMemo, forwardRef, createElement, useEffect, useImperativeHandle } from 'react';
import { css, useTheme, Global, ThemeProvider } from '@emotion/react';
import { useFloating, offset, shift, flip, arrow, autoUpdate, useInteractions, useHover, safePolygon, useClick, useDismiss, FloatingPortal, size, useRole, useListNavigation, useTypeahead, FloatingOverlay, FloatingFocusManager } from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

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

const ItemizeContext = React.createContext({
  level: 0,
  marker: '✓',
  usesCounter: false
});

const _excluded$u = ["margin", "marker", "as"];
let _$w = t => t,
  _t$w;
const marginMap$2 = {
  none: '0',
  normal: '1em',
  wide: '2em'
};
const EnumerateContainer = styled.ol(_t$w || (_t$w = _$w`
  padding-inline-start: 4ch;
  margin-block-start: ${0};
  margin-block-end: ${0};
  margin-inline-start: 0;
  margin-inline-end: 0;
  list-style-type: ${0};
  & > li::marker {
    color: ${0};
  }
`), ({
  margin
}) => marginMap$2[margin], ({
  margin
}) => marginMap$2[margin], ({
  marker
}) => marker, ({
  theme
}) => theme.color.text.secondary.main);
const Enumerate = React.forwardRef((props, ref) => {
  const itemizeContext = useContext(ItemizeContext);
  const {
      margin = itemizeContext.level === 0 ? 'normal' : 'none',
      marker = 'decimal',
      as = 'ol'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$u);
  return React.createElement(ItemizeContext.Provider, {
    value: {
      marker,
      usesCounter: true,
      level: itemizeContext.level + 1
    }
  }, React.createElement(EnumerateContainer, _extends$1({
    margin: margin,
    marker: marker,
    ref: ref,
    as: as
  }, rest)));
});

const _excluded$t = ["marker", "as"];
let _$v = t => t,
  _t$v;
const ItemContainer = styled.li(_t$v || (_t$v = _$v`
  list-style-type: ${0};
  & > li::marker {
    color: ${0};
  }
`), ({
  marker,
  usesCounter
}) => usesCounter ? marker : `'${marker} '`, ({
  theme
}) => theme.color.text.secondary.main);
const Item = React.forwardRef((props, ref) => {
  const itemizeContext = useContext(ItemizeContext);
  const {
      marker = itemizeContext.marker,
      as = 'li'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$t);
  return React.createElement(ItemContainer, _extends$1({
    ref: ref,
    as: as,
    marker: marker,
    usesCounter: itemizeContext.usesCounter
  }, rest));
});

const _excluded$s = ["margin", "marker", "as"];
let _$u = t => t,
  _t$u;
const marginMap$1 = {
  none: '0',
  normal: '1em',
  wide: '2em'
};
const ItemizeContainer = styled.ul(_t$u || (_t$u = _$u`
  padding-inline-start: 4ch;
  margin-block-start: ${0};
  margin-block-end: ${0};
  margin-inline-start: 0;
  margin-inline-end: 0;
  list-style-type: '${0} ';
  & > li::marker {
    color: ${0};
  }
`), ({
  margin
}) => marginMap$1[margin], ({
  margin
}) => marginMap$1[margin], ({
  marker
}) => marker, ({
  theme
}) => theme.color.text.secondary.main);
const Itemize = React.forwardRef((props, ref) => {
  const itemizeContext = useContext(ItemizeContext);
  const {
      margin = itemizeContext.level === 0 ? 'normal' : 'none',
      marker = itemizeContext.level === 0 ? '✓' : '–',
      as = 'ul'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$s);
  return React.createElement(ItemizeContext.Provider, {
    value: {
      marker,
      usesCounter: false,
      level: itemizeContext.level + 1
    }
  }, React.createElement(ItemizeContainer, _extends$1({
    margin: margin,
    marker: marker,
    ref: ref,
    as: as
  }, rest)));
});

const _excluded$r = ["padding", "children", "as"];
let _$t = t => t,
  _t$t;
const paddingMap$7 = {
  none: 'padding: 0;',
  normal: 'padding: 8px 0;',
  wide: 'padding: 16px 0;'
};
const ListContainer = styled.ul(_t$t || (_t$t = _$t`
  ${0}
  list-style: none;
`), ({
  padding
}) => paddingMap$7[padding]);
const List = React.forwardRef((props, ref) => {
  const {
      padding = 'normal',
      children,
      as = 'ul'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$r);
  return React.createElement(ListContainer, _extends$1({
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

const readableColor = (color, theme) => {
  return readableColor$1(curriedDarken$1(0.2, color), theme.color.text.primary.dark, theme.color.text.primary.light, false);
};
const computeHoverColor = backgroundColor => {
  return readableColor$1(backgroundColor, curriedDarken$1(0.1, backgroundColor), curriedLighten$1(0.2, backgroundColor), false);
};

let _$s = t => t,
  _t$s,
  _t2$a,
  _t3$4;
const toCssName = name => name.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');
const cssVariables = (defaults, prefix) => {
  const names = Object.keys(defaults);
  const vars = Object.fromEntries(names.map(name => [name, `--solvedac-${toCssName(prefix)}-${toCssName(name)}`]));
  const v = Object.fromEntries(Object.entries(vars).map(([k, v]) => [k, `var(${v})`]));
  const styles = theme => {
    var _Object$entries$map$j;
    return (_Object$entries$map$j = Object.entries(defaults != null ? defaults : {}).map(([key, value]) => `--solvedac-${toCssName(prefix)}-${toCssName(key)}: ${typeof value === 'string' ? value : value(theme)};`).join('\n')) != null ? _Object$entries$map$j : '';
  };
  return {
    vars,
    v,
    styles
  };
};
const cssCentering = css(_t$s || (_t$s = _$s`
  display: flex;
  align-items: center;
  justify-content: center;
`));
const cssDisablable = css(_t2$a || (_t2$a = _$s`
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`));
const cssClickable = css(_t3$4 || (_t3$4 = _$s`
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  ${0}
`), cssDisablable);

const cardHoverTemplate = {
  backgroundColor: theme => theme.color.background.card.main,
  textColor: theme => theme.color.text.primary.main,
  hoverBackgroundColor: theme => computeHoverColor(theme.color.background.card.main),
  hoverTextColor: theme => theme.color.text.primary.main
};
const transparentHoverTemplate = {
  backgroundColor: theme => curriedTransparentize$1(1, theme.color.background.card.main),
  textColor: theme => theme.color.text.primary.main,
  hoverBackgroundColor: theme => theme.color.background.card.main,
  hoverTextColor: theme => theme.color.text.primary.main
};

const _excluded$q = ["backgroundColor", "hoverColor", "clickable", "disabled", "padding", "style", "children", "as"];
let _$r = t => t,
  _t$r,
  _t2$9,
  _t3$3;
const {
  vars: vars$9,
  v: v$a,
  styles: styles$8
} = cssVariables(_extends$1({}, transparentHoverTemplate), 'listItem');
const paddingMap$6 = {
  none: 'padding: 0;',
  normal: 'padding: 16px 8px;',
  wide: 'padding: 32px 16px;'
};
const ListItemWrapper = styled.li(_t$r || (_t$r = _$r`
  display: list-item;
  width: 100%;
  list-style: none;
  border-bottom: ${0};
  &:last-child {
    border-bottom: none;
  }
`), ({
  theme
}) => theme.styles.border());
const whenClickable$1 = css(_t2$9 || (_t2$9 = _$r`
  ${0}
  transition: background 0.3s ease, color 0.3s ease;
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${0};
    color: ${0};
  }
`), cssClickable, v$a.hoverBackgroundColor, v$a.hoverTextColor);
const ListItemContainer = styled.div(_t3$3 || (_t3$3 = _$r`
  ${0}
  display: block;
  width: 100%;
  background: ${0};
  color: ${0};
  ${0}
  ${0}
`), ({
  theme
}) => styles$8(theme), v$a.backgroundColor, v$a.textColor, ({
  clickable
}) => clickable && whenClickable$1, ({
  padding
}) => paddingMap$6[padding]);
const ListItem = React.forwardRef((props, ref) => {
  const solvedTheme = useTheme();
  const {
      backgroundColor,
      hoverColor,
      clickable = false,
      disabled = false,
      padding = 'normal',
      style,
      children,
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$q);
  const computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  return React.createElement(ListItemWrapper, null, React.createElement(ListItemContainer, _extends$1({
    ref: ref,
    as: as,
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    disabled: disabled && clickable,
    clickable: clickable,
    padding: padding,
    style: _extends$1({
      [vars$9.backgroundColor]: backgroundColor,
      [vars$9.hoverBackgroundColor]: computedHoverColor,
      [vars$9.textColor]: backgroundColor && readableColor(backgroundColor, solvedTheme),
      [vars$9.hoverTextColor]: computedHoverColor && readableColor(computedHoverColor, solvedTheme)
    }, style)
  }, rest), children));
});

const _excluded$p = ["current", "backgroundColor", "disabled", "hoverColor", "accentColor", "accentHintColor", "style", "as"];
let _$q = t => t,
  _t$q,
  _t2$8;
const {
  vars: vars$8,
  v: v$9,
  styles: styles$7
} = cssVariables(_extends$1({}, transparentHoverTemplate, {
  accentColor: theme => theme.color.background.table.header,
  accentHintColor: () => 'transparent'
}), 'tab');
const whenCurrent$1 = css(_t$q || (_t$q = _$q`
  font-weight: bold;
  border-bottom: 2px solid ${0};
  &:not([disabled]):hover {
    border-bottom: 2px solid ${0};
  }
`), v$9.accentColor, v$9.accentColor);
const TabContainer = styled.button(_t2$8 || (_t2$8 = _$q`
  ${0}
  ${0}
  ${0}
  flex: 1 0 0;
  display: inline-block;
  min-width: 64px;
  padding: 16px 16px;
  text-decoration: none;
  text-align: center;
  user-select: none;
  border: none;
  border-bottom: 2px solid ${0};
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  background: ${0};
  color: ${0};
  vertical-align: bottom;
  &:not([disabled]):hover,
  &:not([disabled]):active {
    color: ${0};
    background-color: ${0};
    border-bottom: 2px solid ${0};
  }
  ${0}
`), ({
  theme
}) => styles$7(theme), cssClickable, ellipsis(), v$9.accentHintColor, v$9.backgroundColor, v$9.textColor, v$9.hoverTextColor, v$9.hoverBackgroundColor, v$9.accentColor, ({
  current
}) => current && whenCurrent$1);
const Tab = React.forwardRef((props, ref) => {
  const solvedTheme = useTheme();
  const {
      current = false,
      backgroundColor,
      disabled = false,
      hoverColor,
      accentColor,
      accentHintColor,
      style,
      as = 'a'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$p);
  const computedAccentColor = accentColor || backgroundColor && readableColor(backgroundColor, solvedTheme);
  const computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  return React.createElement(TabContainer, _extends$1({
    ref: ref,
    as: as,
    role: "button",
    tabIndex: 0,
    disabled: disabled,
    current: current,
    style: _extends$1({
      [vars$8.backgroundColor]: backgroundColor,
      [vars$8.hoverBackgroundColor]: computedHoverColor,
      [vars$8.textColor]: backgroundColor && readableColor(backgroundColor, solvedTheme),
      [vars$8.hoverTextColor]: computedHoverColor && readableColor(computedHoverColor, solvedTheme),
      [vars$8.accentColor]: computedAccentColor,
      [vars$8.accentHintColor]: accentHintColor
    }, style)
  }, rest));
});

const _excluded$o = ["fullWidth", "multiline", "as"];
let _$p = t => t,
  _t$p;
const TabsContainer = styled.nav(_t$p || (_t$p = _$p`
  overflow-x: auto;
  display: ${0};
  white-space: ${0};
  flex-wrap: ${0};
`), ({
  fullWidth
}) => fullWidth ? 'flex' : 'block', ({
  multiline
}) => multiline ? 'nowrap' : 'normal', ({
  multiline
}) => multiline ? 'wrap' : 'nowrap');
const Tabs = React.forwardRef((props, ref) => {
  const {
      fullWidth = false,
      multiline = false,
      as = 'nav'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$o);
  return React.createElement(TabsContainer, _extends$1({
    ref: ref,
    as: as,
    fullWidth: fullWidth,
    multiline: multiline
  }, rest));
});

const TableContext = React.createContext({
  padding: 'normal',
  sticky: false,
  verticalAlign: 'top'
});

const TableRowGroupContext = React.createContext({
  header: false,
  verticalAlign: 'top'
});

const _excluded$n = ["padding", "verticalAlign", "header", "as", "numeric"];
let _$o = t => t,
  _t$o,
  _t2$7;
const paddingMap$5 = {
  none: 'padding: 0;',
  dense: 'padding: 8px;',
  normal: 'padding: 16px;',
  wide: 'padding: 32px;'
};
const whenHeader = css(_t$o || (_t$o = _$o`
  text-align: center;
  font-weight: 700;
`));
const CellContainer = styled.td(_t2$7 || (_t2$7 = _$o`
  display: table-cell;
  border-bottom: ${0};
  ${0}
  ${0}
  ${0}
  ${0}
`), ({
  theme
}) => theme.styles.border(), ({
  padding
}) => paddingMap$5[padding], ({
  verticalAlign
}) => `vertical-align: ${verticalAlign};`, ({
  numeric
}) => numeric && "text-align: right; font-feature-settings: 'tnum';", ({
  header
}) => header && whenHeader);
const Cell = React.forwardRef((props, ref) => {
  const tableContext = useContext(TableContext);
  const tableRowGroupContext = useContext(TableRowGroupContext);
  const {
      padding = tableContext.padding,
      verticalAlign = tableRowGroupContext.verticalAlign,
      header = tableRowGroupContext.header,
      as,
      numeric = false
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$n);
  const calculatedAs = as || (header ? 'th' : 'td');
  return React.createElement(CellContainer, _extends$1({
    padding: padding,
    verticalAlign: verticalAlign,
    numeric: numeric,
    header: header,
    ref: ref,
    as: calculatedAs
  }, rest));
});

const _excluded$m = ["header", "padding", "verticalAlign", "as"];
let _$n = t => t,
  _t$n;
const RowContainer = styled.tr(_t$n || (_t$n = _$n`
  display: table-row;
  ${0}
`), ({
  header
}) => header && 'text-align: center; font-weight: 700;');
const Row = React.forwardRef((props, ref) => {
  const tableContext = useContext(TableContext);
  const {
      header = false,
      padding = tableContext.padding,
      verticalAlign = tableContext.verticalAlign,
      as = 'tr'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$m);
  return React.createElement(TableContext.Provider, {
    value: _extends$1({}, tableContext, {
      padding,
      verticalAlign
    })
  }, React.createElement(RowContainer, _extends$1({
    header: header,
    ref: ref,
    as: as
  }, rest)));
});

const _excluded$l = ["fullWidth", "padding", "verticalAlign", "sticky", "as"];
let _$m = t => t,
  _t$m;
const TableContainer$1 = styled.table(_t$m || (_t$m = _$m`
  display: table;
  ${0}
`), ({
  fullWidth
}) => fullWidth && 'width: 100%;');
const Table = React.forwardRef((props, ref) => {
  const {
      fullWidth = false,
      padding = 'normal',
      verticalAlign = 'top',
      sticky = false,
      as = 'table'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$l);
  return React.createElement(TableContext.Provider, {
    value: {
      padding,
      sticky,
      verticalAlign
    }
  }, React.createElement(TableRowGroupContext.Provider, {
    value: {
      header: false,
      verticalAlign
    }
  }, React.createElement(TableContainer$1, _extends$1({
    fullWidth: fullWidth,
    ref: ref,
    as: as
  }, rest))));
});

const _excluded$k = ["as"];
let _$l = t => t,
  _t$l;
const TableBodyContainer = styled.tbody(_t$l || (_t$l = _$l`
  display: table-row-group;
`));
const TableBody = React.forwardRef((props, ref) => {
  const {
      as = 'tbody'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$k);
  return React.createElement(TableBodyContainer, _extends$1({
    ref: ref,
    as: as
  }, rest));
});

const _excluded$j = ["as"];
let _$k = t => t,
  _t$k;
const TableContainerContainer = styled.div(_t$k || (_t$k = _$k`
  overflow-x: auto;
`));
const TableContainer = React.forwardRef((props, ref) => {
  const {
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$j);
  return React.createElement(TableContainerContainer, _extends$1({
    ref: ref,
    as: as
  }, rest));
});

const _excluded$i = ["as"];
let _$j = t => t,
  _t$j;
const TableFootContainer = styled.tfoot(_t$j || (_t$j = _$j`
  display: table-footer-group;
  text-align: center;
  font-weight: 700;
`));
const TableFoot = React.forwardRef((props, ref) => {
  const {
      as = 'tfoot'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$i);
  return React.createElement(TableFootContainer, _extends$1({
    ref: ref,
    as: as
  }, rest));
});

const _excluded$h = ["sticky", "verticalAlign", "as"];
let _$i = t => t,
  _t$i;
const getStickyValue = sticky => {
  if (typeof sticky === 'number') {
    return `${sticky}px`;
  }
  if (typeof sticky === 'string') {
    return sticky;
  }
  return '0';
};
const TableHeadContainer = styled.thead(_t$i || (_t$i = _$i`
  display: table-header-group;
  ${0}
`), ({
  sticky
}) => (typeof sticky !== 'boolean' || sticky === true) && `position: sticky; top: ${getStickyValue(sticky)};`);
const TableHead = React.forwardRef((props, ref) => {
  const tableContext = useContext(TableContext);
  const {
      sticky = tableContext.sticky,
      verticalAlign = tableContext.verticalAlign,
      as = 'thead'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$h);
  return React.createElement(TableRowGroupContext.Provider, {
    value: {
      header: true,
      verticalAlign
    }
  }, React.createElement(TableHeadContainer, _extends$1({
    sticky: sticky,
    ref: ref,
    as: as
  }, rest)));
});

const _excluded$g = ["disabled", "circle", "fullWidth", "padding", "style", "children", "as"];
let _$h = t => t,
  _t$h;
const {
  vars: vars$7,
  v: v$8,
  styles: styles$6
} = cssVariables(_extends$1({}, cardHoverTemplate, {
  hoverShadow: theme => theme.styles.shadow(computeHoverColor(theme.color.background.card.main), 8),
  activeShadow: theme => theme.styles.shadow(computeHoverColor(theme.color.background.card.main), 4)
}), 'button');
const paddingMap$4 = {
  none: 'padding: 0;',
  normal: 'padding: 12px 16px;'
};
const ButtonContainer = styled.button(_t$h || (_t$h = _$h`
  ${0}
  ${0}
  ${0}
  ${0}
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  background: ${0};
  color: ${0};
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: ${0};
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${0};
    color: ${0};
  }
  &:not([disabled]):hover {
    box-shadow: ${0};
    transform: translate(0, -4px);
  }
  &:not([disabled]):active {
    box-shadow: ${0};
    transform: translate(0, -2px);
  }
`), ({
  theme
}) => styles$6(theme), cssClickable, ({
  fullWidth
}) => fullWidth && 'width: 100%;', ({
  padding
}) => paddingMap$4[padding], v$8.backgroundColor, v$8.textColor, ({
  circle
}) => circle ? '9999px' : '4px', v$8.hoverBackgroundColor, v$8.hoverTextColor, v$8.hoverShadow, v$8.activeShadow);
const useComputedBackgroundColor = props => {
  const solvedTheme = useTheme();
  const {
    backgroundColor,
    primary,
    transparent
  } = props;
  if (transparent) return curriedTransparentize$1(1, cardHoverTemplate.backgroundColor(solvedTheme));
  if (backgroundColor) return backgroundColor;
  if (primary) return solvedTheme.color.solvedAc;
  return undefined;
};
const useComputedHoverColor = props => {
  const solvedTheme = useTheme();
  const {
    backgroundColor,
    hoverColor,
    primary,
    transparent
  } = props;
  if (hoverColor) return hoverColor;
  if (backgroundColor) return computeHoverColor(backgroundColor);
  if (primary) return computeHoverColor(solvedTheme.color.solvedAc);
  if (transparent) return computeHoverColor(cardHoverTemplate.backgroundColor(solvedTheme));
  return undefined;
};
const Button = React.forwardRef((props, ref) => {
  const solvedTheme = useTheme();
  const {
      disabled = false,
      circle = false,
      fullWidth = false,
      padding = 'normal',
      style,
      children,
      as = 'button'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$g);
  const computedBackgroundColor = useComputedBackgroundColor(props);
  const computedHoverColor = useComputedHoverColor(props);
  return React.createElement(ButtonContainer, _extends$1({
    as: as,
    role: "button",
    tabIndex: 0,
    ref: ref,
    disabled: disabled,
    circle: circle,
    fullWidth: fullWidth,
    padding: padding,
    style: _extends$1({
      [vars$7.backgroundColor]: computedBackgroundColor,
      [vars$7.hoverBackgroundColor]: computedHoverColor,
      [vars$7.textColor]: computedBackgroundColor && readableColor(computedBackgroundColor, solvedTheme),
      [vars$7.hoverTextColor]: computedHoverColor && readableColor(computedHoverColor, solvedTheme),
      [vars$7.hoverShadow]: computedHoverColor && solvedTheme.styles.shadow(computedHoverColor, 8),
      [vars$7.activeShadow]: computedHoverColor && solvedTheme.styles.shadow(computedHoverColor, 4)
    }, style)
  }, rest), children);
});

const _excluded$f = ["backgroundColor", "hoverColor", "clickable", "disabled", "padding", "style", "children", "as"];
let _$g = t => t,
  _t$g,
  _t2$6;
const {
  vars: vars$6,
  v: v$7,
  styles: styles$5
} = cssVariables(_extends$1({}, cardHoverTemplate), 'card');
const paddingMap$3 = {
  none: 'padding: 0;',
  normal: 'padding: 8px;',
  wide: 'padding: 16px;'
};
const whenClickable = css(_t$g || (_t$g = _$g`
  ${0}
  transition: background 0.3s ease, color 0.3s ease;
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${0};
    color: ${0};
  }
`), cssClickable, v$7.hoverBackgroundColor, v$7.hoverTextColor);
const CardContainer = styled.div(_t2$6 || (_t2$6 = _$g`
  ${0}
  display: block;
  background: ${0};
  color: ${0};
  border-radius: 8px;
  ${0}
  ${0}
`), ({
  theme
}) => styles$5(theme), v$7.backgroundColor, v$7.textColor, ({
  clickable
}) => clickable && whenClickable, ({
  padding
}) => paddingMap$3[padding]);
const Card = React.forwardRef((props, ref) => {
  const solvedTheme = useTheme();
  const {
      backgroundColor,
      hoverColor,
      clickable = false,
      disabled = false,
      padding = 'normal',
      style,
      children,
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$f);
  const computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  return React.createElement(CardContainer, _extends$1({
    ref: ref,
    as: as,
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    disabled: disabled && clickable,
    clickable: clickable,
    padding: padding,
    style: _extends$1({
      [vars$6.backgroundColor]: backgroundColor,
      [vars$6.hoverBackgroundColor]: computedHoverColor,
      [vars$6.textColor]: backgroundColor && readableColor(backgroundColor, solvedTheme),
      [vars$6.hoverTextColor]: computedHoverColor && readableColor(computedHoverColor, solvedTheme)
    }, style)
  }, rest), children);
});

let _$f = t => t,
  _t$f;
const Centering = styled.div(_t$f || (_t$f = _$f`
  ${0}
`), cssCentering);

const _excluded$e = ["backgroundColor", "style", "as"];
let _$e = t => t,
  _t$e;
const {
  vars: vars$5,
  v: v$6,
  styles: styles$4
} = cssVariables({
  backgroundColor: theme => theme.color.background.card.dark,
  textColor: theme => theme.color.text.primary.main
}, 'chip');
const ChipContainer = styled.div(_t$e || (_t$e = _$e`
  ${0}
  background-color: ${0};
  color: ${0};
  padding: 8px 12px;
  border-radius: 32px;
  text-align: center;
  line-height: 1.2;
`), ({
  theme
}) => styles$4(theme), v$6.backgroundColor, v$6.textColor);
const Chip = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const {
      backgroundColor,
      style,
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$e);
  return React.createElement(ChipContainer, _extends$1({
    ref: ref,
    as: as,
    style: _extends$1({
      [vars$5.backgroundColor]: backgroundColor,
      [vars$5.textColor]: backgroundColor && readableColor(backgroundColor, theme)
    }, style)
  }, rest));
});

let _$d = t => t,
  _t$d;
const CollapseContainer = styled.div(_t$d || (_t$d = _$d`
  height: ${0};
  transform-origin: top;
  opacity: ${0};
  transition: height 0.3s ease, opacity 0.3s ease;
  pointer-events: ${0};
  overflow: 'hidden';
`), ({
  renderHeight
}) => typeof renderHeight === 'number' ? `${renderHeight}px` : renderHeight, ({
  shown
}) => shown ? 1 : 0, ({
  shown
}) => shown ? 'all' : 'none');
const Collapse = React.forwardRef((props, ref) => {
  const {
    as = 'div',
    shown,
    children
  } = props;
  const contentsRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [renderHeight, setRenderHeight] = useState(0);
  const [mountChild, setMountChild] = useState(shown);
  useLayoutEffect(() => {
    var _contentsRef$current$, _contentsRef$current;
    if (contentsRef.current === null || !mountChild) return;
    setContentHeight((_contentsRef$current$ = (_contentsRef$current = contentsRef.current) == null ? void 0 : _contentsRef$current.clientHeight) != null ? _contentsRef$current$ : 0);
  }, [children, mountChild]);
  useLayoutEffect(() => {
    if (shown) setMountChild(true);
    setRenderHeight(shown ? 0 : contentHeight);
    const renderHeightDelay = setTimeout(() => {
      setRenderHeight(shown ? contentHeight : 0);
    }, 30);
    const animationDelay = setTimeout(() => {
      setRenderHeight(shown ? 'auto' : 0);
      if (!shown) setMountChild(false);
    }, 400);
    return () => {
      clearTimeout(renderHeightDelay);
      clearTimeout(animationDelay);
    };
  }, [shown, contentHeight]);
  return React.createElement(CollapseContainer, {
    as: as,
    ref: ref,
    shown: shown,
    renderHeight: renderHeight
  }, mountChild ? React.createElement("div", {
    ref: contentsRef
  }, children) : null);
});

const _excluded$d = ["w", "padding", "topBarPadding", "style", "as"];
let _$c = t => t,
  _t$c;
const {
  vars: vars$4,
  v: v$5,
  styles: styles$3
} = cssVariables({
  width: '1200px'
}, 'container');
const paddingMap$2 = {
  none: 'padding: 0;',
  normal: 'padding: 0 16px;',
  wide: 'padding: 0 32px;'
};
const ContainerContainer = styled.nav(_t$c || (_t$c = _$c`
  ${0}
  max-width: ${0};
  ${0}
  ${0}
  margin: 0 auto;
`), ({
  theme
}) => styles$3(theme), v$5.width, ({
  padding
}) => paddingMap$2[padding], ({
  topBarPadding
}) => topBarPadding && 'padding-top: 72px;');
const Container = React.forwardRef((props, ref) => {
  const {
      w = '1200px',
      padding = 'normal',
      topBarPadding = false,
      style,
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$d);
  return React.createElement(ContainerContainer, _extends$1({
    ref: ref,
    as: as,
    padding: padding,
    topBarPadding: topBarPadding,
    style: _extends$1({
      [vars$4.width]: typeof w === 'string' ? w : `${w}px`
    }, style)
  }, rest));
});

const _excluded$c = ["h", "w", "as"];
const Space = React.forwardRef((props, ref) => {
  const {
      h: height,
      w: width,
      as: RenderComponent = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$c);
  if (typeof width !== 'undefined') {
    return React.createElement(RenderComponent, _extends$1({
      ref: ref,
      style: {
        display: 'inline-block',
        width,
        height
      }
    }, rest));
  }
  return React.createElement(RenderComponent, _extends$1({
    ref: ref,
    style: {
      display: 'block',
      width,
      height
    }
  }, rest));
});

const _excluded$b = ["margin", "as"];
let _$b = t => t,
  _t$b;
const DividerItem = styled.div(_t$b || (_t$b = _$b`
  border-top: 1px dashed ${0};
`), ({
  theme
}) => theme.color.border);
const Divider = React.forwardRef((props, ref) => {
  const {
      margin = 'normal',
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$b);
  if (!margin || margin === 'none') return React.createElement(DividerItem, _extends$1({}, rest));
  return React.createElement(React.Fragment, null, React.createElement(Space, {
    h: margin === 'wide' ? 64 : 32
  }), React.createElement(DividerItem, _extends$1({
    as: as,
    ref: ref
  }, rest)), React.createElement(Space, {
    h: margin === 'wide' ? 64 : 32
  }));
});

let _$a = t => t,
  _t$a,
  _t2$5;
const reset = css(_t$a || (_t$a = _$a`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`));
const globalCss = theme => css(_t2$5 || (_t2$5 = _$a`
  ${0}

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: ${0};
    font-weight: 400;
    width: 100%;
    background: ${0};
  }

  body {
    margin: 0;
    width: 100%;
    line-height: 1.6;
    color: ${0};
    background: ${0};
    scrollbar-width: thin;
    scrollbar-color: ${0} ${0};
  }

  ::selection {
    color: ${0};
    background: ${0};
  }

  a {
    color: inherit;
  }

  b,
  strong {
    font-weight: 700;
  }

  i,
  em {
    font-style: italic;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  small {
    font-size: 75%;
  }

  pre,
  code {
    font-family: ${0};
  }

  /* @keepallvillain */
  :lang(ko) {
    h1,
    h2,
    h3 {
      word-break: keep-all;
    }
  }

  ${0} {
    font: inherit;
  }

  ${0} {
    border: none;
    font: inherit;
    text-align: inherit;
  }

  /* TODO remove named classes */
  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }

  /* TODO remove named classes */
  .noscroll {
    overflow: hidden !important;
  }

  /* TODO remove named classes */
  .bronze {
    color: #ad5600;
  }

  /* TODO remove named classes */
  .silver {
    color: #435f7a;
  }

  /* TODO remove named classes */
  .gold {
    color: #ec9a00;
  }

  /* TODO remove named classes */
  .platinum {
    color: #27e2a4;
  }

  /* TODO remove named classes */
  .diamond {
    color: #00b4fc;
  }

  /* TODO remove named classes */
  .ruby {
    color: #ff0062;
  }

  /* TODO remove named classes */
  .master {
    color: #b300e0;
  }

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${0};
    border-left: 1px ${0} dashed;
  }

  ::-webkit-scrollbar-thumb {
    background: ${0};
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: ${0};
  }
`), reset, theme.typography.paragraph, theme.color.background.footer, theme.color.text.primary.main, theme.color.background.page, theme.color.border, theme.color.background.page, theme.color.background.page, curriedTransparentize$1(0.5, theme.color.text.primary.main), theme.typography.code, textInputs(), buttons(), theme.color.background.page, theme.color.border, theme.color.border, theme.color.border);
const SolvedGlobalStyles = () => {
  const theme = useTheme();
  return React.createElement(Global, {
    styles: globalCss(theme)
  });
};

const cssLength = cssLength => {
  if (typeof cssLength === 'number') {
    return `${cssLength}px`;
  }
  return cssLength || '0px';
};

const cssDiv = (a, b) => {
  if (typeof a === 'number') {
    return a / b;
  }
  return `calc(${cssLength(a)} / ${b})`;
};

const defaultPalette = {
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
  class: {
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
const Light = {
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
    border: color => `1px solid ${color || defaultPalette.gray[200]}`,
    shadow: (color, length) => `${curriedTransparentize$1(0.6, color || defaultPalette.gray[200])} 0px ${cssLength(cssDiv(length || 8, 2))} ${cssLength(length || 8)}`
  }
};
const Dark = _extends$1({}, Light, {
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
    border: color => `1px solid ${(color || defaultPalette.gray[700]).toString()}`,
    shadow: (color, length) => `${curriedTransparentize$1(0.6, color || defaultPalette.gray[200])} 0px ${cssLength(cssDiv(length || 8, 2))} ${cssLength(length || 8)}`
  }
});
const Black = _extends$1({}, Dark, {
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
    border: color => `1px solid ${(color || defaultPalette.gray[900]).toString()}`,
    shadow: (color, length) => `${curriedTransparentize$1(0.6, color || defaultPalette.gray[200])} 0px ${cssLength(cssDiv(length || 8, 2))} ${cssLength(length || 8)}`
  }
});
const solvedThemes = {
  light: Light,
  dark: Dark,
  black: Black,
  palette: defaultPalette
};

const _excluded$a = ["title", "theme", "noDefaultStyles", "children", "arrow", "open", "place", "interactive", "activateOnHover", "activateOnClick", "noThemeChange", "zIndex", "onOpenChange"];
let _$9 = t => t,
  _t$9,
  _t2$4,
  _t3$2;
const TooltipWrapper = styled.span(_t$9 || (_t$9 = _$9`
  display: inline;
`));
const TooltipContainer = styled(motion(Card))(_t2$4 || (_t2$4 = _$9`
  background-color: ${0};
  border: ${0};
  box-shadow: ${0};
  z-index: 30000;
  backdrop-filter: blur(4px);
  font-size: initial;
  font-weight: initial;
`), ({
  theme
}) => curriedTransparentize$1(0.1, theme.color.background.card.main), ({
  theme
}) => theme.styles.border(), ({
  theme
}) => theme.styles.shadow(undefined, 16));
const Arrow = styled.div(_t3$2 || (_t3$2 = _$9`
  position: absolute;
  width: 16px;
  height: 16px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent
    ${0}
    transparent;
  z-index: 30000;
  pointer-events: none;
`), ({
  theme
}) => curriedTransparentize$1(0.1, theme.color.background.card.main));
const renderSide = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};
const resolveArrowStyles = (arrowX, arrowY, arrowPosition, padding = 16) => {
  if (arrowPosition === 'bottom') {
    return {
      left: arrowX != null ? arrowX : undefined,
      bottom: -padding,
      transform: `scaleY(-1)`
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
      transform: `rotate(-90deg)`
    };
  }
  if (arrowPosition === 'right') {
    return {
      top: arrowY != null ? arrowY : undefined,
      right: -16,
      transform: `rotate(90deg)`
    };
  }
  return {};
};
const Tooltip = props => {
  const {
      title,
      theme,
      noDefaultStyles: noBackground,
      children,
      arrow: drawArrow = true,
      open,
      place,
      interactive = false,
      activateOnHover = true,
      activateOnClick = false,
      noThemeChange = false,
      zIndex,
      onOpenChange
    } = props,
    cardProps = _objectWithoutPropertiesLoose(props, _excluded$a);
  const [isOpen, setIsOpen] = useState(false);
  const renderTooltip = typeof open === 'boolean' ? open : isOpen;
  const arrowRef = useRef(null);
  const handleOpenChange = open => {
    setIsOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  const {
    x,
    y,
    refs,
    strategy,
    context,
    placement,
    middlewareData: {
      arrow: {
        x: arrowX,
        y: arrowY
      } = {}
    }
  } = useFloating({
    placement: place,
    strategy: 'fixed',
    open: isOpen,
    onOpenChange: handleOpenChange,
    middleware: [offset(16), shift({
      padding: 16
    }), flip(), arrow({
      element: arrowRef
    })],
    whileElementsMounted: (reference, floating, update) => autoUpdate(reference, floating, update, {
      animationFrame: true
    })
  });
  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([useHover(context, {
    enabled: activateOnHover,
    delay: 200,
    move: true,
    handleClose: safePolygon({
      buffer: 1
    })
  }), useClick(context, {
    enabled: activateOnClick
  }), useDismiss(context, {
    enabled: activateOnClick
  })]);
  const RenderComponent = noBackground ? motion.div : TooltipContainer;
  const ThemeProviderComponent = useMemo(() => noThemeChange || noBackground ? React.Fragment : ({
    children
  }) =>
  // eslint-disable-next-line react/jsx-indent
  React.createElement(ThemeProvider, {
    theme: theme || solvedThemes.dark
  }, children), [noThemeChange, noBackground, theme]);
  const arrowPosition = renderSide[placement.split('-')[0]];
  return React.createElement(React.Fragment, null, React.createElement(TooltipWrapper, _extends$1({
    ref: refs.setReference
  }, getReferenceProps()), children), React.createElement(FloatingPortal, null, React.createElement(ThemeProviderComponent, null, React.createElement(AnimatePresence, null, renderTooltip && React.createElement(React.Fragment, null, React.createElement(RenderComponent, _extends$1({
    ref: refs.setFloating
  }, getFloatingProps(_extends$1({}, cardProps || {}, {
    style: _extends$1({}, 'style' in cardProps ? cardProps.style || {} : {}, {
      position: strategy,
      top: y || 0,
      left: x || 0,
      pointerEvents: interactive ? 'auto' : 'none',
      zIndex
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
  }), title, drawArrow && React.createElement(Arrow, {
    ref: arrowRef,
    style: resolveArrowStyles(arrowX, arrowY, arrowPosition)
  })))))));
};

const _excluded$9 = ["interactive", "activateOnHover", "activateOnClick", "noThemeChange"];
const Dropdown = props => {
  const {
      interactive = true,
      activateOnHover = false,
      activateOnClick = true,
      noThemeChange = true
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$9);
  return React.createElement(Tooltip, _extends$1({
    interactive: interactive,
    activateOnHover: activateOnHover,
    activateOnClick: activateOnClick,
    noThemeChange: noThemeChange
  }, rest));
};

const _excluded$8 = ["padding", "fullHeight", "as"];
let _$8 = t => t,
  _t$8;
const paddingMap$1 = {
  none: 'padding: 0;',
  normal: 'padding: 32px 0;',
  wide: 'padding: 64px 0;'
};
const EmptyStatePlaceholderContainer = styled.div(_t$8 || (_t$8 = _$8`
  ${0}
  ${0}
  ${0}
  width: 100%;
  color: ${0};
  text-align: center;
`), cssCentering, ({
  fullHeight
}) => fullHeight && 'height: 100%;', ({
  padding
}) => paddingMap$1[padding || 'normal'], ({
  theme
}) => theme.color.text.secondary.main);
const EmptyStatePlaceholder = React.forwardRef((props, ref) => {
  const {
      padding,
      fullHeight,
      as = 'div'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$8);
  return React.createElement(EmptyStatePlaceholderContainer, _extends$1({
    as: as,
    ref: ref,
    fullHeight: fullHeight,
    padding: padding
  }, rest));
});

const _excluded$7 = ["backgroundColor", "padding", "style", "as"];
let _$7 = t => t,
  _t$7;
const {
  vars: vars$3,
  v: v$4,
  styles: styles$2
} = cssVariables({
  backgroundColor: theme => theme.color.background.footer,
  textColor: theme => theme.color.text.secondary.main
}, 'footer');
const paddingMap = {
  none: 'padding: 0;',
  normal: 'padding: 16px 0;',
  wide: 'padding: 32px 0;'
};
const FooterContainer = styled.nav(_t$7 || (_t$7 = _$7`
  ${0}
  background: ${0};
  color: ${0};
  ${0}
  font-size: small;
`), ({
  theme
}) => styles$2(theme), v$4.backgroundColor, v$4.textColor, ({
  padding
}) => paddingMap[padding]);
const Footer = React.forwardRef((props, ref) => {
  const {
      backgroundColor,
      padding = 'normal',
      style,
      as = 'footer'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$7);
  return React.createElement(FooterContainer, _extends$1({
    ref: ref,
    as: as,
    padding: padding,
    style: _extends$1({
      [vars$3.backgroundColor]: backgroundColor
    }, style)
  }, rest));
});

const _excluded$6 = ["backgroundColor", "style", "as"];
let _$6 = t => t,
  _t$6;
const navBarVariables = cssVariables({
  backgroundColor: theme => theme.color.background.page,
  textColor: theme => theme.color.text.primary.main
}, 'navBar');
const {
  vars: vars$2,
  v: v$3
} = navBarVariables;
const NavbarContainer = styled.header(_t$6 || (_t$6 = _$6`
  width: 100%;
  height: 72px;
  background-color: ${0};
  color: ${0};
  border-bottom: ${0};
`), v$3.backgroundColor, v$3.textColor, ({
  theme
}) => theme.styles.border());
const NavBar = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const {
      backgroundColor,
      style,
      as = 'header'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$6);
  return React.createElement(NavbarContainer, _extends$1({
    ref: ref,
    as: as,
    style: _extends$1({
      [vars$2.backgroundColor]: backgroundColor,
      [vars$2.textColor]: backgroundColor && readableColor(backgroundColor, theme)
    }, style)
  }, rest));
});

const _excluded$5 = ["current", "disabled", "backgroundColor", "hoverColor", "activeColor", "style", "as"];
let _$5 = t => t,
  _t$5,
  _t2$3;
const {
  vars: vars$1,
  v: v$2,
  styles: styles$1
} = cssVariables(_extends$1({}, transparentHoverTemplate, {
  activeBackgroundColor: theme => computeHoverColor(theme.color.text.primary.main),
  activeTextColor: theme => theme.color.text.primary.inverted
}), 'pagination-item');
const whenCurrent = css(_t$5 || (_t$5 = _$5`
  font-weight: bold;
  background: ${0};
  color: ${0};
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${0};
    color: ${0};
  }
`), v$2.activeBackgroundColor, v$2.activeTextColor, v$2.activeBackgroundColor, v$2.activeTextColor);
const PaginationItemContainer = styled.button(_t2$3 || (_t2$3 = _$5`
  ${0}
  ${0}
  ${0}
  flex: 1 0 0;
  display: inline-block;
  transition: background-color 0.2s;
  min-width: 64px;
  padding: 16px 8px;
  text-decoration: none;
  text-align: center;
  background: ${0};
  color: ${0};
  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${0};
    color: ${0};
  }
  ${0}
`), ({
  theme
}) => styles$1(theme), ellipsis(), cssClickable, v$2.backgroundColor, v$2.textColor, v$2.hoverBackgroundColor, v$2.hoverTextColor, ({
  current
}) => current && whenCurrent);
const PaginationItem = React.forwardRef((props, ref) => {
  const solvedTheme = useTheme();
  const {
      current = false,
      disabled = false,
      backgroundColor,
      hoverColor,
      activeColor,
      style,
      as = 'a'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$5);
  const computedHoverColor = hoverColor || backgroundColor && computeHoverColor(backgroundColor);
  const computedActiveColor = activeColor || backgroundColor && computeHoverColor(backgroundColor);
  return React.createElement(PaginationItemContainer, _extends$1({
    ref: ref,
    as: as,
    role: "button",
    tabIndex: 0,
    current: current,
    disabled: disabled,
    style: _extends$1({
      [vars$1.backgroundColor]: backgroundColor,
      [vars$1.hoverBackgroundColor]: computedHoverColor,
      [vars$1.activeBackgroundColor]: computedActiveColor,
      [vars$1.textColor]: backgroundColor && readableColor(backgroundColor, solvedTheme),
      [vars$1.hoverTextColor]: computedHoverColor && readableColor(computedHoverColor, solvedTheme),
      [vars$1.activeTextColor]: computedActiveColor && readableColor(computedActiveColor, solvedTheme)
    }, style)
  }, rest));
});

const _excluded$4 = ["margin", "as"];
let _$4 = t => t,
  _t$4;
const marginMap = {
  none: '0',
  normal: '1em',
  wide: '2em'
};
const ParagraphContainer = styled.p(_t$4 || (_t$4 = _$4`
  margin-block-start: ${0};
  margin-block-end: ${0};
  margin-inline-start: 0;
  margin-inline-end: 0;
`), ({
  margin
}) => marginMap[margin], ({
  margin
}) => marginMap[margin]);
const Paragraph = React.forwardRef((props, ref) => {
  const {
      margin = 'normal',
      as = 'p'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$4);
  return React.createElement(ParagraphContainer, _extends$1({
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
  const Component = forwardRef(
    (_a, ref) => {
      var _b = _a, { color = "currentColor", size = 24, stroke = 2, children } = _b, rest = __objRest(_b, ["color", "size", "stroke", "children"]);
      return createElement(
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
        [...iconNode.map(([tag, attrs]) => createElement(tag, attrs)), ...children || []]
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

const _excluded$3 = ["fullWidth", "disableEllipsis", "items", "value", "zIndex", "onChange", "render", "ListItemProps"];
let _$3 = t => t,
  _t$3,
  _t2$2,
  _t3$1;
// TODO add style variables
const SelectDisplay = styled.div(_t$3 || (_t$3 = _$3`
  ${0}
  ${0}
  ${0}
  position: relative;
  display: inline-block;
  font-family: inherit;
  height: auto;
  line-height: normal;
  font-size: 1rem;
  padding: 0.8em 0.5em;
  padding-right: 48px;
  max-width: 100%;
  min-width: 74px;
  background: ${0};
  color: ${0};
  border: ${0};
  border-radius: 8px;
  width: ${0};
`), cssDisablable, cssClickable, ({
  ellipsis: enableEllipsis
}) => enableEllipsis && ellipsis(), ({
  theme
}) => theme.color.background.footer, ({
  theme
}) => theme.color.text.primary.main, ({
  theme
}) => theme.styles.border(), ({
  fullWidth
}) => fullWidth ? '100%' : 'auto');
const SelectItemsWrapper = styled(motion.div)(_t2$2 || (_t2$2 = _$3`
  background: ${0};
  border: ${0};
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: ${0};
  max-width: 100vw;
`), ({
  theme
}) => theme.color.background.page, ({
  theme
}) => theme.styles.border(), ({
  theme
}) => theme.styles.shadow(undefined, 16));
const SelectInputAdornment = styled(Centering)(_t3$1 || (_t3$1 = _$3`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 48px;
  color: ${0};
`), ({
  theme
}) => theme.color.text.secondary.main);
const Select = React.forwardRef((props, ref) => {
  const {
      fullWidth = false,
      disableEllipsis = false,
      items = [],
      value,
      zIndex,
      onChange,
      render = e => typeof e === 'string' ? e : e.value,
      ListItemProps
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$3);
  const theme = useTheme();
  const listRef = useRef([]);
  const listContentRef = useRef([]);
  const allowSelectRef = useRef(false);
  const allowMouseUpRef = useRef(true);
  const selectTimeoutRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [controlledScrolling, setControlledScrolling] = useState(false);
  const [touch, setTouch] = useState(false);
  const handleCommit = index => {
    setSelectedIndex(index);
    if (onChange) {
      onChange(items[index]);
    }
    setOpen(false);
  };
  useEffect(() => {
    const idx = items.findIndex(it => typeof it === 'string' ? it === value : it.value === value);
    if (idx !== -1) {
      setSelectedIndex(idx);
    }
  }, [value]);
  const {
    x,
    y,
    refs,
    strategy,
    context
  } = useFloating({
    placement: 'bottom',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (reference, floating, update) => autoUpdate(reference, floating, update, {
      animationFrame: true
    }),
    middleware: [offset(8), ...[touch ? shift({
      crossAxis: true,
      padding: 8
    }) : flip({
      padding: 8
    })], size({
      apply({
        elements,
        availableHeight,
        availableWidth,
        rects
      }) {
        Object.assign(elements.floating.style, {
          maxHeight: `${availableHeight}px`,
          minWidth: `${rects.reference.width}px`,
          maxWidth: `${availableWidth}px`
        });
      },
      padding: 8
    })]
  });
  const {
    reference
  } = refs;
  useImperativeHandle(ref, () => reference);
  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([useClick(context), useDismiss(context), useRole(context, {
    role: 'listbox'
  }), useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex
  }), useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    onMatch: open ? setActiveIndex : handleCommit
  })]);
  useLayoutEffect(() => {
    if (open) {
      selectTimeoutRef.current = setTimeout(() => {
        allowSelectRef.current = true;
      }, 300);
      return () => {
        clearTimeout(selectTimeoutRef.current);
      };
    }
    allowSelectRef.current = false;
    allowMouseUpRef.current = true;
    return undefined;
  }, [open]);
  useLayoutEffect(() => {
    const onPointerDown = e => {
      var _refs$floating$curren;
      const target = e.target;
      if (!((_refs$floating$curren = refs.floating.current) != null && _refs$floating$curren.contains(target))) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('pointerdown', onPointerDown);
      return () => {
        document.removeEventListener('pointerdown', onPointerDown);
      };
    }
    return undefined;
  }, [open, refs]);
  useLayoutEffect(() => {
    if (open && controlledScrolling) {
      requestAnimationFrame(() => {
        if (activeIndex != null) {
          var _listRef$current$acti;
          (_listRef$current$acti = listRef.current[activeIndex]) == null || _listRef$current$acti.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    }
  }, [open, refs, controlledScrolling, activeIndex]);
  useLayoutEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        if (selectedIndex != null) {
          var _listRef$current$sele;
          (_listRef$current$sele = listRef.current[selectedIndex]) == null || _listRef$current$sele.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    }
  }, [open, selectedIndex]);
  useLayoutEffect(() => {
    if (refs.floating.current) {
      refs.floating.current.style.maxHeight = '';
    }
  }, [refs]);
  const selected = selectedIndex < items.length ? items[selectedIndex] : null;
  return React.createElement(React.Fragment, null, React.createElement(SelectDisplay, _extends$1({
    ref: refs.setReference,
    fullWidth: fullWidth,
    ellipsis: !disableEllipsis,
    role: "button",
    tabIndex: 0
  }, getReferenceProps({
    onTouchStart() {
      setTouch(true);
    },
    onPointerMove({
      pointerType
    }) {
      if (pointerType === 'mouse') {
        setTouch(false);
      }
    }
  }), rest), selected ? render(selected) : null, React.createElement(SelectInputAdornment, null, React.createElement(IconChevronDown, null))), React.createElement(FloatingPortal, null, React.createElement(AnimatePresence, null, open && React.createElement(FloatingOverlay, {
    lockScroll: !touch,
    style: {
      zIndex: typeof zIndex === 'number' ? zIndex : 1
    }
  }, React.createElement(FloatingFocusManager, {
    context: context
  }, React.createElement(SelectItemsWrapper, _extends$1({
    style: {
      position: strategy,
      top: y != null ? y : 0,
      left: x != null ? x : 0,
      originX: 0.5,
      originY: 0
    },
    ref: refs.setFloating
  }, getFloatingProps({
    onKeyDown() {
      setControlledScrolling(true);
    },
    onPointerMove() {
      setControlledScrolling(false);
    },
    onContextMenu(e) {
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
  }), items.map((item, i) => {
    return React.createElement(ListItem, _extends$1({
      clickable: true,
      key: typeof item === 'string' ? item : item.value,
      role: "option",
      tabIndex: 0,
      "aria-selected": selectedIndex === i,
      backgroundColor: i === selectedIndex ? theme.color.background.card.main : undefined,
      ref: node => {
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
      onTouchStart() {
        allowSelectRef.current = true;
        allowMouseUpRef.current = false;
      },
      onKeyDown(e) {
        allowSelectRef.current = true;
        if (e.key === 'Enter' && allowSelectRef.current) {
          handleCommit(i);
        }
      },
      onClick() {
        if (allowSelectRef.current) {
          handleCommit(i);
        }
      },
      onMouseUp() {
        if (!allowMouseUpRef.current) {
          return;
        }
        if (allowSelectRef.current) {
          handleCommit(i);
        }
        clearTimeout(selectTimeoutRef.current);
        selectTimeoutRef.current = setTimeout(() => {
          allowSelectRef.current = true;
        });
      }
    }))), render(item, i));
  })))))));
});

const _excluded$2 = ["value", "onChange", "backgroundColor", "backgroundActiveColor", "knobColor", "knobActiveColor"];
let _$2 = t => t,
  _t$2,
  _t2$1;
const {
  vars,
  v,
  styles
} = cssVariables({
  backgroundColor: theme => theme.color.background.page,
  backgroundActiveColor: theme => theme.color.solvedAc,
  knobColor: theme => theme.color.background.page,
  knobBorderColor: theme => theme.color.border,
  knobActiveColor: theme => theme.color.background.page,
  knobActiveBorderColor: theme => theme.color.border
}, 'button');
const SwitchBase = styled.div(_t$2 || (_t$2 = _$2`
  ${0}
  height: 30px;
  width: 56px;
  display: inline-block;
  background-color: ${0};
  border-radius: 30px;
  cursor: pointer;
  border: ${0};
  box-shadow: inset 1px 1px 9px -3px rgba(4, 4, 4, 0.08),
    1px 2px 6px -2px rgba(0, 0, 0, 0.01);
  transition: background-color 0.2s ease-in;
`), ({
  theme
}) => styles(theme), ({
  active
}) => active ? v.backgroundActiveColor : v.backgroundColor, ({
  theme
}) => theme.styles.border());
const SwitchKnob = styled.div(_t2$1 || (_t2$1 = _$2`
  width: 26px;
  height: 26px;
  display: inline-block;
  background-color: ${0};
  border: ${0};
  box-shadow: 0 1px 3px rgba(107, 106, 106, 0.26),
    0 5px 1px rgba(107, 106, 106, 0.13);
  border-radius: 26px;
  margin: 1px 1px;
  margin-left: 1px;
  transform: ${0};
  transition: transform 0.2s ease-in, background-color 0.2s ease-in,
    border-color 0.2s ease-in;
`), ({
  active
}) => active ? v.knobActiveColor : v.knobColor, ({
  active
}) => `1px solid ${active ? v.knobActiveBorderColor : v.knobBorderColor}`, ({
  active
}) => active ? 'translateX(26px)' : 'translateX(0)');
const computeKnobBorderColor = props => {
  const {
    knobColor,
    knobBorderColor
  } = props;
  if (knobBorderColor) return knobBorderColor;
  if (knobColor) return computeHoverColor(knobColor);
  return undefined;
};
const computeKnobActiveBorderColor = props => {
  const {
    knobColor,
    knobActiveColor = knobColor,
    knobBorderColor,
    knobActiveBorderColor = knobBorderColor
  } = props;
  if (knobActiveBorderColor) return knobActiveBorderColor;
  if (knobActiveColor) return computeHoverColor(knobActiveColor);
  return undefined;
};
const Switch = React.forwardRef((props, ref) => {
  const {
      value,
      onChange,
      backgroundColor,
      backgroundActiveColor,
      knobColor,
      knobActiveColor = knobColor
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$2);
  const computedKnobBorderColor = computeKnobBorderColor(props);
  const computedKnobActiveBorderColor = computeKnobActiveBorderColor(props);
  return React.createElement(SwitchBase, _extends$1({
    ref: ref,
    active: value,
    onClick: () => onChange && onChange(!value),
    style: {
      [vars.backgroundColor]: backgroundColor,
      [vars.backgroundActiveColor]: backgroundActiveColor
    }
  }, rest), React.createElement(SwitchKnob, {
    active: value,
    style: {
      [vars.knobColor]: knobColor,
      [vars.knobActiveColor]: knobActiveColor,
      [vars.knobBorderColor]: computedKnobBorderColor,
      [vars.knobActiveBorderColor]: computedKnobActiveBorderColor
    }
  }));
});

const _excluded$1 = ["fullWidth", "multiline", "disabled", "resizable", "as"];
let _$1 = t => t,
  _t$1;
const TextFieldContainer = styled.input(_t$1 || (_t$1 = _$1`
  ${0}
  font-family: inherit;
  height: auto;
  line-height: normal;
  font-size: 1rem;
  padding: 0.8em 0.5em;
  background: ${0};
  color: ${0};
  border: ${0};
  border-radius: 8px;
  width: ${0};
  resize: ${0};
`), cssDisablable, ({
  theme
}) => theme.color.background.footer, ({
  theme
}) => theme.color.text.primary.main, ({
  theme
}) => theme.styles.border(), ({
  fullWidth
}) => fullWidth ? '100%' : 'auto', ({
  resizable
}) => resizable);
const getResizable = resizable => {
  if (typeof resizable === 'boolean') {
    return resizable ? 'both' : 'none';
  }
  if (!resizable) {
    return 'none';
  }
  return resizable;
};
const TextField = React.forwardRef((props, ref) => {
  const {
      fullWidth = false,
      multiline = false,
      disabled = false,
      resizable = false,
      // TODO types are wrong when `as` is inferred by variant
      as = multiline ? 'textarea' : 'input'
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded$1);
  return React.createElement(TextFieldContainer, _extends$1({
    fullWidth: fullWidth,
    disabled: disabled,
    resizable: getResizable(resizable),
    ref: ref,
    as: as
  }, rest));
});

const _excluded = ["variant", "as"];
let _ = t => t,
  _t,
  _t2,
  _t3,
  _t4,
  _t5,
  _t6,
  _t7,
  _t8,
  _t9,
  _t0,
  _t1,
  _t10,
  _t11,
  _t12,
  _t13,
  _t14,
  _t15,
  _t16,
  _t17,
  _t18,
  _t19;
const variants = theme => ({
  default: css(_t || (_t = _``)),
  description: css(_t2 || (_t2 = _`
      color: ${0};
    `), theme.color.text.secondary.main),
  error: css(_t3 || (_t3 = _`
      color: ${0};
    `), theme.color.status.error),
  info: css(_t4 || (_t4 = _`
      color: ${0};
    `), theme.color.status.info),
  progress: css(_t5 || (_t5 = _`
      color: ${0};
    `), theme.color.status.progress),
  success: css(_t6 || (_t6 = _`
      color: ${0};
    `), theme.color.status.success),
  warn: css(_t7 || (_t7 = _`
      color: ${0};
    `), theme.color.status.warn),
  h1: css(_t8 || (_t8 = _`
      display: block;
      word-break: keep-all;
      font-weight: 800;
      font-size: 2em;
      letter-spacing: -0.04ch;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `)),
  h2: css(_t9 || (_t9 = _`
      display: block;
      word-break: keep-all;
      font-weight: 800;
      font-size: 1.5em;
      letter-spacing: -0.02ch;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `)),
  h3: css(_t0 || (_t0 = _`
      display: block;
      word-break: keep-all;
      font-weight: 800;
      font-size: 1.2em;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `)),
  h4: css(_t1 || (_t1 = _`
      display: block;
      font-weight: 800;
      font-size: 1em;
      letter-spacing: 0.02ch;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `)),
  h5: css(_t10 || (_t10 = _`
      display: block;
      font-weight: 700;
      font-size: 1em;
      letter-spacing: 0.02ch;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `)),
  h6: css(_t11 || (_t11 = _`
      display: block;
      font-weight: 600;
      font-size: 1em;
      letter-spacing: 0.02ch;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    `)),
  small: css(_t12 || (_t12 = _`
      font-size: 75%;
    `)),
  smaller: css(_t13 || (_t13 = _`
      font-size: 65%;
    `)),
  tabular: css(_t14 || (_t14 = _`
      font-feature-settings: 'tnum';
    `)),
  readable: css(_t15 || (_t15 = _`
      font-feature-settings: 'ss06', 'zero';
    `)),
  'no-ligatures': css(_t16 || (_t16 = _`
      font-variant-ligatures: none;
    `)),
  'no-margin': css(_t17 || (_t17 = _`
      margin: 0;
    `)),
  ellipsis: css(_t18 || (_t18 = _`
      ${0}
    `), ellipsis())
});
const variantKeys = Object.keys(variants(solvedThemes.light));
const asMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  small: 'small',
  smaller: 'small'
};
const TypoContainer = styled.span(_t19 || (_t19 = _`
  ${0}
`), ({
  theme,
  variant
}) => variant.map(v => variants(theme)[v]));
const firstVariant = variant => {
  if (typeof variant === 'string') return variant;
  if (Array.isArray(variant) && variant.length > 0) return variant[0];
  return undefined;
};
const Typo = React.forwardRef((props, ref) => {
  var _firstVariant;
  const {
      variant = [],
      as
    } = props,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  const calculatedVariants = [...(typeof variant === 'string' ? [variant] : variant), ...Object.entries(rest).filter(([k, v]) => variantKeys.includes(k) && typeof v === 'boolean' && v).map(([k]) => k)];
  // TODO types are wrong when `as` is inferred by variant
  const calculatedAs = as || asMap[(_firstVariant = firstVariant(calculatedVariants)) != null ? _firstVariant : 'default'] || 'span';
  const filteredRest = Object.fromEntries(Object.entries(rest).filter(([k]) => !variantKeys.includes(k)));
  return React.createElement(TypoContainer, _extends$1({
    ref: ref,
    as: calculatedAs,
    variant: calculatedVariants
  }, filteredRest));
});

export { Button, Card, Cell, Centering, Chip, Collapse, Container, Divider, Dropdown, EmptyStatePlaceholder, Enumerate, Footer, Item, Itemize, List, ListItem, NavBar, PaginationItem, Paragraph, Row, Select, SolvedGlobalStyles, Space, Switch, Tab, Table, TableBody, TableContainer, TableFoot, TableHead, Tabs, TextField, Tooltip, Typo, navBarVariables, solvedThemes };
//# sourceMappingURL=index.modern.mjs.map
