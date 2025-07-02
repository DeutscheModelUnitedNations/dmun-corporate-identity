export declare function loadColors(): {
    shades: Record<string, Record<string, string>>;
    themes: Record<string, any>;
};
export declare function getColorPalette(theme?: string): Record<string, string>;
export declare function getTheme(themeName?: string): any;
export declare function getAllThemes(): Record<string, any>;
export declare const cssFiles: {
    shades: string;
    light: string;
    dark: string;
};
declare const _default: {
    loadColors: typeof loadColors;
    getColorPalette: typeof getColorPalette;
    getTheme: typeof getTheme;
    getAllThemes: typeof getAllThemes;
    cssFiles: {
        shades: string;
        light: string;
        dark: string;
    };
};
export default _default;
