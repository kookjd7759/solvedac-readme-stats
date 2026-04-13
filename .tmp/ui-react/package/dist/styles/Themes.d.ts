import { CSSLength } from '../types/length';
export interface SolvedTextColor {
    main: string;
    inverted: string;
    light: string;
    dark: string;
}
export interface SolvedTheme {
    name: string;
    color: {
        solvedAc: string;
        text: {
            primary: SolvedTextColor;
            secondary: SolvedTextColor;
        };
        background: {
            page: string;
            card: {
                main: string;
                dark: string;
            };
            table: {
                main: string;
                header: string;
            };
            footer: string;
            progress: string;
        };
        problem: {
            ac: string;
            wa: string;
            partial: string;
        };
        status: {
            info: string;
            warn: string;
            error: string;
            success: string;
            progress: string;
        };
        border: string;
    };
    typography: {
        paragraph: string;
        code: string;
    };
    styles: {
        border: (color?: string) => string;
        shadow: (color?: string, length?: CSSLength) => string;
    };
}
export declare const solvedThemes: {
    light: SolvedTheme;
    dark: SolvedTheme;
    black: SolvedTheme;
    palette: {
        white: string;
        gray: {
            0: string;
            50: string;
            100: string;
            150: string;
            200: string;
            250: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            750: string;
            800: string;
            850: string;
            900: string;
            950: string;
            1000: string;
        };
        black: string;
        ac: string;
        status: {
            info: string;
            warn: string;
            error: string;
            success: string;
            progress: string;
        };
        problemState: {
            ac: string;
            partial: string;
            wa: string;
        };
        class: {
            0: string[];
            1: string[];
            2: string[];
            3: string[];
            4: string[];
            5: string[];
            6: string[];
            7: string[];
            8: string[];
            9: string[];
            10: string[];
        };
    };
};
declare module '@emotion/react' {
    interface Theme extends SolvedTheme {
    }
}
