function _templateObject3() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * usage:
 * 
 * 
 *  const sizeTheme = {
 *      small: {
 *         break: { max: 1024 },
 *         spacing: {
 *              extraSmall: 4,
 *              small: 8,
 *              medium: 16,
 *              large: 20,
 *              extraLarge: 24
 *         },
 *          font: {
 *              small: 1.25rem,
 *              normal: 1.5rem,
 *              strong: 2rem,
 *          }
 *      },
 *      medium: {
 *          break: { min: 1023, max: 1366 },
 *          spacing: {
 *               extraSmall: 4,
 *               small: 8,
 *               medium: 12,
 *               large: 16,
 *               extraLarge: 20
 *          },
 *          font: {
 *              small: 1rem,
 *              normal: 1.25rem,
 *              strong: 1.5rem,
 *          }
 *      },
 *      large: {
 *          break: { min: 1367 },
 *          spacing: {
 *              extraSmall: 4,
 *              small: 8,
 *              medium: 10,
 *              large: 12,
 *              extraLarge: 16
 *          },
 *          font: {
 *              small: .8125rem,
 *              normal: 1rem,
 *              strong: 1.25rem,
 *          }
 *      }
 *  };
 * 
 * const sizing = themedBreaks(sizeTheme);
 * 
 * const StyledDiv = styled.div`
 *      ${theme`
 *          padding: ${spacing.small}px ${spacing.medium}px;
 *          margin: ${spacing.large}px ${spacing.extraLarge}px;
 *          font-size: ${font.normal};
 *      `}
 * `;
 * 
 */
import mediaQueryMixin from './breakpoints'; // TODO: work on the naming

var weaveCSS = function weaveCSS(cssStrings, cssArgs) {
  var result = [cssStrings[0]];

  for (var i = 0, len = cssArgs.length; i < len; i += 1) {
    result.push(cssArgs[i], cssStrings[i + 1]);
  } // single css rule string ie 'padding: 4px 12px;'


  return result.reduce(function (str, arg) {
    return "".concat(str).concat(arg);
  }, '');
};

var buildBreakPointThemeMap = function buildBreakPointThemeMap(theme, subThemeKey, cssArgs) {
  var themeSizes = Object.keys(theme);
  var subTheme = themeSizes.reduce(function (subThemeMap, sizeKey) {
    subThemeMap[sizeKey] = theme[sizeKey][subThemeKey];
    return subThemeMap; //{ small: {'spacing': { small, medium, large } }}
  }, {});
  return themeSizes.reduce(function (breakPointSizeMap, size) {
    breakPointSizeMap[size] = cssArgs.map(function (cssArg) {
      return subTheme[size][cssArg];
    });
    return breakPointSizeMap;
  }, {});
}; // SubTheme reduction should be done in another function at the same time
//  as the theme size reduction


export default (function (cssFunc) {
  return function (theme, subThemeKey) {
    return function (cssStrings) {
      // create the breakpoint media queries from the theme (pull out the break object)    
      // format should be theme = { key: { break: { min, max } } }
      var themeSizes = Object.keys(theme);
      var breakpoints = mediaQueryMixin(cssFunc)(themeSizes.reduce(function (bpm, sizeKey) {
        bpm[sizeKey] = theme[sizeKey]["break"];
        return bpm; //{ small: {max}, medium: {min, max}, large: {min}}}
      }, {})); //{ small: func, medium: func, large: func}
      // converts the arguments to the sub theme style, ie: ${'small'} might map to 8 on a medium

      for (var _len = arguments.length, cssArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cssArgs[_key - 1] = arguments[_key];
      }

      var breakPointTheme = buildBreakPointThemeMap(theme, subThemeKey, cssArgs);
      var css = themeSizes.map(function (size) {
        return cssFunc(_templateObject(), breakpoints[size](_templateObject2(), weaveCSS(cssStrings, breakPointTheme[size])));
      });
      return cssFunc(_templateObject3(), css);
    };
  };
});