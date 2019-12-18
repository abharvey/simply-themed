function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    ", " {\n        ", "\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * usage:
 * 
 * const breaks = {
 *    small: { max: 1024 },
 *    medium: { min: 1023, max: 1366 },
 *    large: { min: 1367 }
 *};
 * 
 * const mediaQueries = mediaQueryMixin(breaks);
 * 
 * const StyledDiv = styled.div`
 *      ${mediaQueries.small`
 *          width: 100%;
 *      `}
 *      ${mediaQueries.medium`
 *          width: 75%;
 *      `}
 * `;
 * 
 */
// TODO: Work on the naming
// TODO: clean up string duplication
var buildQuery = function buildQuery(_ref) {
  var min = _ref.min,
      max = _ref.max;

  if (min && max) {
    return "@media all and (max-width: ".concat(max, "px) and (min-width: ").concat(min, "px)");
  }

  if (max) {
    return "@media (max-width: ".concat(max, "px)");
  }

  if (min) {
    return "@media (min-width: ".concat(min, "px)");
  }

  return '';
};

var buildQueryFunction = function buildQueryFunction(cssFunc) {
  return function (_ref2) {
    var min = _ref2.min,
        max = _ref2.max;
    return function () {
      return cssFunc(_templateObject(), buildQuery({
        min: min,
        max: max
      }), cssFunc.apply(void 0, arguments));
    };
  };
};

var mediaQueryMixin = function mediaQueryMixin(cssFunc) {
  return function (breakpointObject) {
    return Object.keys(breakpointObject).reduce(function (mixin, bp) {
      mixin[bp] = buildQueryFunction(cssFunc)(breakpointObject[bp]);
      return mixin;
    }, {});
  };
};

export default mediaQueryMixin;