export const cleanCSS = (cssString: any) => {
    const normalized = cssString
        .trim()
        .replace(/\s+{/g, '{')
        .replace(/:\s+/g, ':')
        .replace(/:\s+;/g, ':;')
        .replace(/([;{}])/g, '$1  ')
        .replace(/\s+/g, ' ');

    return normalized;
};
