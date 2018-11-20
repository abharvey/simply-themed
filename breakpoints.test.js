import mediaQueryMixin from './breakpoints';
import { css } from 'styled-components';

// Test utility to let you write css readably in tests
const cleanCSS = (cssString) => {
    const normalized = cssString
        .trim()
        .replace(/\s+{/g, '{')
        .replace(/:\s+/g, ':')
        .replace(/:\s+;/g, ':;')
        .replace(/([;\{\}])/g, '$1  ')
        .replace(/\s+/g, ' ');

    return normalized;
}

describe('mediaQueryMixin works with styled-components', () => {
    let breakPoints, mediaQueries;

    beforeEach(() => {
        breakPoints = {
            small: { max: 1024 },
            medium: { min: 1023, max: 1366 },
            large: { min: 1367 },
            fake: {}
        };

        mediaQueries = mediaQueryMixin(css)(breakPoints);
    });

    it('generates a function for each breakpoint object', () => {
        expect(Object.keys(mediaQueries).length).toBe(4);
        expect(typeof mediaQueries.small).toBe('function');
        expect(typeof mediaQueries.medium).toBe('function');
        expect(typeof mediaQueries.large).toBe('function');
        expect(typeof mediaQueries.fake).toBe('function');
    });

    it('creates valid css with max-width query when passed to css function', () => {
        const mediaQuery = css`
            ${mediaQueries.small`
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            `}
        `;

        const mq = cleanCSS(mediaQuery.join('\n'));

        const expected = `
            @media (max-width:1024px) {
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            }
        `;

        expect(mq).toEqual(cleanCSS(expected));
    });

    it('creates valid css with min-width query when passed to css function', () => {
        const mediaQuery = css`
            ${mediaQueries.large`
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            `}
        `;

        const mq = cleanCSS(mediaQuery.join('\n'));

        const expected = `
            @media (min-width: 1367px) {
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            }
        `;

        expect(mq).toEqual(cleanCSS(expected));
    });

    it('creates valid css with both max & min width query when passed to css function', () => {
        const mediaQuery = css`
            ${mediaQueries.medium`
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            `}
        `;

        const mq = cleanCSS(mediaQuery.join('\n'));

        const expected = `
            @media all and (max-width: 1366px) and (min-width: 1023px) {
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            }
        `;

        expect(mq).toEqual(cleanCSS(expected));
    });

    it('creates a function that returns an empty string fall back if min/max are not provided', () => {
        const mediaQuery = css`
            ${mediaQueries.fake`
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            `}
        `;

        const mq = cleanCSS(mediaQuery.join('\n'));

        const expected = `
            {
                color: green;
                font-size: 12px;
                width: 50%;
                padding: 10px 20px;
            }
        `;

        expect(mq).toEqual(cleanCSS(expected));
    })
})
