type CSSFunc = any; //BaseThemedCssFunction<any>;

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

interface BreakpointQuery {
    min: string;
    max: string;
}

// TODO: clean up string duplication?
const buildQuery = ({ min, max }: BreakpointQuery) => {
    if (min && max) {
        return `@media all and (max-width: ${max}px) and (min-width: ${min}px)`;
    }

    if (max) {
        return `@media (max-width: ${max}px)`;
    }

    if (min) {
        return `@media (min-width: ${min}px)`;
    }

    return '';
};

const buildQueryFunction = (cssFunc: CSSFunc) => ({ min, max }: BreakpointQuery) => (
    args: string[]
) => cssFunc`
    ${buildQuery({ min, max })} {
        ${cssFunc`${args}`}
    }
`;

/**
 *  cssFunc is the css function provided by styled-components or emotion
 * to generate css classes
 * TODO: Type css function properly from library types
 */
const mediaQueryMixin = (cssFunc: CSSFunc) => (breakpointObject: any) =>
    Object.keys(breakpointObject).reduce((mixin: { [key: string]: any }, bp: string) => {
        mixin[bp] = buildQueryFunction(cssFunc)(breakpointObject[bp]);
        return mixin;
    }, {});

export default mediaQueryMixin;
