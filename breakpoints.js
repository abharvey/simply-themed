import { css } from 'styled-components';

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
const buildQuery = ({ min, max }) => {
    if (min && max) {
        return `@media all and (max-width: ${max}px) and (min-width: ${min}px)`
    }

    if (max) {
        return `@media (max-width: ${max}px)`;
    }

    if (min) {
        return `@media (min-width: ${min}px)`;
    }

    return '';
};

const buildQueryFunction = ({ min, max }) => (...args) => css`
    ${buildQuery({ min, max })} {
        ${css(...args)}
    }
`;

const mediaQueryMixin = (breakpointObject) => Object.keys(breakpointObject).reduce((mixin, bp) => {
    mixin[bp] = buildQueryFunction(breakpointObject[bp]);
    return mixin;
}, {});

export default mediaQueryMixin;
