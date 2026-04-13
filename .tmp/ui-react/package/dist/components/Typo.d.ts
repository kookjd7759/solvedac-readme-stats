import { PropsWithChildren } from 'react';
import { SolvedTheme } from '../styles';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
declare const variants: (theme: SolvedTheme) => {
    readonly default: import("@emotion/react").SerializedStyles;
    readonly description: import("@emotion/react").SerializedStyles;
    readonly error: import("@emotion/react").SerializedStyles;
    readonly info: import("@emotion/react").SerializedStyles;
    readonly progress: import("@emotion/react").SerializedStyles;
    readonly success: import("@emotion/react").SerializedStyles;
    readonly warn: import("@emotion/react").SerializedStyles;
    readonly h1: import("@emotion/react").SerializedStyles;
    readonly h2: import("@emotion/react").SerializedStyles;
    readonly h3: import("@emotion/react").SerializedStyles;
    readonly h4: import("@emotion/react").SerializedStyles;
    readonly h5: import("@emotion/react").SerializedStyles;
    readonly h6: import("@emotion/react").SerializedStyles;
    readonly small: import("@emotion/react").SerializedStyles;
    readonly smaller: import("@emotion/react").SerializedStyles;
    readonly tabular: import("@emotion/react").SerializedStyles;
    readonly readable: import("@emotion/react").SerializedStyles;
    readonly 'no-ligatures': import("@emotion/react").SerializedStyles;
    readonly 'no-margin': import("@emotion/react").SerializedStyles;
    readonly ellipsis: import("@emotion/react").SerializedStyles;
};
type VariantsObject = ReturnType<typeof variants>;
type OptionalVariables = {
    [key in keyof VariantsObject]: boolean;
};
export type TypoVariant = keyof VariantsObject;
export type TypoProps = {
    variant?: TypoVariant | TypoVariant[];
} & Partial<OptionalVariables> & PropsWithChildren;
export declare const Typo: PolymorphicComponent<'span', TypoProps>;
export {};
