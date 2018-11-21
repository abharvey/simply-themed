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

import mediaQueryMixin from './breakpoints';

// TODO: work on the naming

const weaveCSS = (cssStrings, cssArgs) => {
    const result = [cssStrings[0]];

    for (let i = 0, len = cssArgs.length; i < len; i += 1) {
        result.push(cssArgs[i], cssStrings[i + 1]);
    }
    // single css rule string ie 'padding: 4px 12px;'
    return result.reduce((str, arg) => `${str}${arg}`, '');
};

const buildBreakPointThemeMap = (theme, subThemeKey, cssArgs) => {
    const themeSizes = Object.keys(theme);

    const subTheme = themeSizes.reduce((subThemeMap, sizeKey) => {
        subThemeMap[sizeKey] = theme[sizeKey][subThemeKey];
        return subThemeMap; //{ small: {'spacing': { small, medium, large } }}
    }, {})

    return themeSizes.reduce((breakPointSizeMap, size) => {
        breakPointSizeMap[size] = cssArgs.map((cssArg) => subTheme[size][cssArg]);
        return breakPointSizeMap;
    }, {});
};

// SubTheme reduction should be done in another function at the same time
//  as the theme size reduction

export default (cssFunc) => (theme, subThemeKey) => (cssStrings, ...cssArgs) => {
    // create the breakpoint media queries from the theme (pull out the break object)    
    // format should be theme = { key: { break: { min, max } } }
    const themeSizes = Object.keys(theme);

    const breakpoints = mediaQueryMixin(cssFunc)(themeSizes.reduce((bpm, sizeKey) => {
        bpm[sizeKey] = theme[sizeKey].break;
        return bpm; //{ small: {max}, medium: {min, max}, large: {min}}}
    }, {})); //{ small: func, medium: func, large: func}

    // converts the arguments to the sub theme style, ie: ${'small'} might map to 8 on a medium
    const breakPointTheme = buildBreakPointThemeMap(theme, subThemeKey, cssArgs);

    const css = themeSizes.map(size => {
        return cssFunc`${breakpoints[size]`
            ${weaveCSS(cssStrings, breakPointTheme[size])}
        `}`;
    });

    return cssFunc`${css}`;
};
