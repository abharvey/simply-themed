## Code Responsibly, Theme Responsively.

I built this out of dissatisfaction with other responsive design styled libraries.

The single letter shorthand that's common in many of today's libraries tend to require library syntax understanding
and do not read declaritvely enough to grasp all the important css in a instance.

Styled-Components (SC), and Emotion, both do a great job using template literals to improve the readability of auto generated
css classes while writing CSS-in-JS. I wanted to maintain that readability while simultaniously implementing a common
responsive design system. Using similar techniques to the template literal processing to generate the classes in SC & Emotion I
decided to use a JSON structure to define the system of responsive CSS allowing a developer to only understand their own Theme
definition and standard CSS-in-JS without extra mental mapping of array variable short hands used in other responsive libraries

### Example:

In the example below there are strings used for selecting subsets of the theme. It's recommended that you use a enum when working at scale for better application maintainability.

```javascript
import React from 'react';
import { css } from 'styled-components';
import { themed } from 'styled-breakpoints';

const sizeTheme = {
    small: {
        break: { max: 1024 },
        spacing: {
            small: 8,
            medium: 16,
            large: 20,
        },
        fontSize: {
            small: 'font-size: 1.25rem',
            normal: 'font-size: 1.5rem',
        },
    },
    medium: {
        break: { min: 1023, max: 1366 },
        spacing: {
            small: 8,
            medium: 12,
            large: 16,
        },
        fontSize: {
            small: 'font-size: 1rem',
            normal: 'font-size: 1.25rem',
        },
    },
    large: {
        break: { min: 1367 },
        spacing: {
            small: 8,
            medium: 10,
            large: 12,
        },
        fontSize: {
            small: 'font-size: 0.8125rem',
            normal: 'font-size: 1rem',
        },
    },
};

const space = themed(css)(sizeTheme, 'spacing');
const fontSize = themed(css)(sizeTheme, 'fontSize');

const ResponsiveDiv = styled.div`
    ${space`
        padding: ${'small'}px ${'medium'}px;
        margin: ${'large'}px ${'extraLarge'}px;
    `}

    ${fontSize`${'normal'}`};
`;

// Or add to your theme provider:

const myTheme = {
    colors: myColorfulObject,
    sizing: themed(css)(theme, 'spacing'),
    font: themed(css)(theme, 'font'),
};

const ResponsiveButton = styled.button`
    ${({ theme: { sizing, colors } }) => css`
        color: ${colors.fontColor};
        background-color: ${colors.buttonColor};

        ${sizing`
            padding: ${'small'}px ${'medium'}px;
            margin: ${'large'}px ${'extraLarge'}px;
        `}
    `}
`;

const MyThemeProvider = (props) => <ThemeProvider {...props} theme={myTheme} />;

const App = () => (
    <MyThemeProvider>
        <ResponsiveButton />
    </MyThemeProvider>
);
```
