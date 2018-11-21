import themedQuery from './themedQuery';
import { css } from 'styled-components';

const sizeTheme = {
    small: {
        break: { max: 1024 },
        spacing: {
            extraSmall: 4,
            small: 8,
            medium: 16,
            large: 20,
            extraLarge: 24
        },
    },
    medium: {
        break: { min: 1023, max: 1366 },
        spacing: {
            extraSmall: 4,
            small: 8,
            medium: 12,
            large: 16,
            extraLarge: 20
        }
    },
    large: {
        break: { min: 1367 },
        spacing: {
            extraSmall: 4,
            small: 8,
            medium: 10,
            large: 12,
            extraLarge: 16
        },
        font: {
            small: .8125rem,
            normal: 1rem,
            strong: 1.25rem,
        }
    }
};


describe('Themed Media Query Function', () => {
    let
        beforeEach(() => {

        })
});