'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    ', ' {\n        ', '\n    }\n'], ['\n    ', ' {\n        ', '\n    }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
        return '@media all and (max-width: ' + max + 'px) and (min-width: ' + min + 'px)';
    }

    if (max) {
        return '@media (max-width: ' + max + 'px)';
    }

    if (min) {
        return '@media (min-width: ' + min + 'px)';
    }

    return '';
};

var buildQueryFunction = function buildQueryFunction(cssFunc) {
    return function (_ref2) {
        var min = _ref2.min,
            max = _ref2.max;
        return function () {
            return cssFunc(_templateObject, buildQuery({ min: min, max: max }), cssFunc.apply(undefined, arguments));
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

exports.default = mediaQueryMixin;