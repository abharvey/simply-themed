import * as emotion from 'emotion';
import { createSerializer, getStyles } from 'jest-emotion';
import 'jest-styled-components';
import eStyled, { css as eCSS } from 'react-emotion';
import renderer from 'react-test-renderer';
import scStyled, { css as scCSS } from 'styled-components';

// expect.extend(createMatchers(emotion));

import { cleanCSS } from './testUtils';
import themedQuery from '../src/themedQuery';

const theme = {
    small: {
        break: { max: 1024 },
        spacing: {
            extraSmall: 4,
            small: 8,
            medium: 16,
            large: 20,
            extraLarge: 24,
        },
        font: {
            small: '1.25rem',
            normal: '1.5rem',
            strong: '2rem',
        },
    },
    medium: {
        break: { min: 1023, max: 1366 },
        spacing: {
            extraSmall: 4,
            small: 8,
            medium: 12,
            large: 16,
            extraLarge: 20,
        },
        font: {
            small: '1rem',
            normal: '1.25rem',
            strong: '1.5rem',
        },
    },
    large: {
        break: { min: 1367 },
        spacing: {
            extraSmall: 4,
            small: 8,
            medium: 10,
            large: 12,
            extraLarge: 16,
        },
        font: {
            small: '.8125rem',
            normal: '1rem',
            strong: '1.25rem',
        },
    },
};

describe('Themed Media Query Function with styled-components', () => {
    let spacingQueries;
    beforeEach(() => {
        spacingQueries = themedQuery(scCSS)(theme, 'spacing');
    });

    it('should create a query function', () => {
        expect(typeof spacingQueries).toBe('function');
    });

    it('function should create multiple media queries', () => {
        const mediaQueries = spacingQueries`
                padding: ${'extraSmall'}px ${'large'}px;
            `;

        const mq = cleanCSS(mediaQueries.join('\n'));

        const expected = `
            @media (max-width:1024px) {
                padding: 4px 20px;
            }
            @media all and (max-width: 1366px) and (min-width: 1023px) {
                padding: 4px 16px;
            }
            @media (min-width: 1367px) {
                padding: 4px 12px;
            }
        `;

        expect(mq).toEqual(cleanCSS(expected));
    });

    it('should works for different subThemes', () => {
        const fontQueries = themedQuery(scCSS)(theme, 'font');

        const mediaQueries = fontQueries`
                font-size: ${'normal'};
            `;

        const mq = cleanCSS(mediaQueries.join('\n'));

        const expected = `
            @media (max-width:1024px) {
                font-size: 1.5rem;
            }
            @media all and (max-width: 1366px) and (min-width: 1023px) {
                font-size: 1.25rem;
            }
            @media (min-width: 1367px) {
                font-size: 1rem;
            }
        `;

        expect(mq).toEqual(cleanCSS(expected));
    });

    it('should work to create a react component with styled-components', () => {
        const React = require('react');
        const Test = scStyled.div`
            ${spacingQueries`
                margin: ${'large'}px ${'medium'}px;
            `}
        `;

        const tree = renderer.create(<Test />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Themed Media Query Function works with emotion', () => {
    expect.addSnapshotSerializer(createSerializer(emotion));

    let spacingQueries;
    beforeEach(() => {
        spacingQueries = themedQuery(eCSS)(theme, 'spacing');
    });

    it('should create a query function', () => {
        expect(typeof spacingQueries).toBe('function');
    });

    it('should work to create a css class with emotion', () => {
        const mediaQueries = spacingQueries`
                padding: ${'extraSmall'}px ${'large'}px;
                margin: ${'small'}px ${'extraLarge'}px;
                width: calc(${'large'}px * 2);
            `;

        const mq = cleanCSS(mediaQueries);

        expect(getStyles(emotion)).toMatchSnapshot();
    });

    it('should work to create a react component with emotion components', () => {
        const React = require('react');
        const Test = eStyled('div')`
            ${spacingQueries`
                margin: ${'large'}px ${'medium'}px;
            `}
        `;

        const tree = renderer.create(<Test />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
