import mediaQueryMixin from './breakpoints';

const breaks = {
    small: { max: 1024 },
    medium: { min: 1023, max: 1366 },
    large: { min: 1367 }
};

describe('mediaQueryMixin', () => {
    it('generates a function for each breakpoint object', () => {
        const bps = mediaQueryMixin(breaks);

        expect(typeof bps.small).toBe('function');
    })
})
