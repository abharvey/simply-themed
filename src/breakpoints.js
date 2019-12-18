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

// TODO: clean up string duplication
const buildQuery = ({ min, max }) => {
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

const buildQueryFunction = cssFunc => ({ min, max }) => (...args) => cssFunc`
    ${buildQuery({ min, max })} {
        ${cssFunc(...args)}
    }
`;

const mediaQueryMixin = cssFunc => breakpointObject =>
    Object.keys(breakpointObject).reduce((mixin, bp) => {
        mixin[bp] = buildQueryFunction(cssFunc)(breakpointObject[bp]);
        return mixin;
    }, {});

export default mediaQueryMixin;
