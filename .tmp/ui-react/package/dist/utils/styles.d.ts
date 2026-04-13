import { SolvedTheme } from '../styles';
export type MakeKebabCase<S extends string, ReturnQueue extends string = ''> = S extends `${infer T}${infer U}` ? ReturnQueue extends '' ? MakeKebabCase<U, Lowercase<T>> : T extends Uppercase<T> ? MakeKebabCase<U, `${ReturnQueue}-${Lowercase<T>}`> : MakeKebabCase<U, `${ReturnQueue}${T}`> : `${ReturnQueue}${S}`;
export declare const toCssName: <S extends string>(name: S) => MakeKebabCase<S>;
export type VariableName<Prefix extends string, Name> = `--solvedac-${MakeKebabCase<Prefix>}-${MakeKebabCase<Name extends string ? Name : string>}`;
export declare const cssVariables: <T extends {
    readonly [key: string]: string | ((theme: SolvedTheme) => string);
}, P extends string>(defaults: T, prefix: P) => {
    vars: { [K in keyof T]: VariableName<P, K>; };
    v: { [K in keyof T]: `var(${VariableName<P, K>})`; };
    styles: (theme: SolvedTheme) => string;
};
export declare const cssCentering: import("@emotion/react").SerializedStyles;
export declare const cssDisablable: import("@emotion/react").SerializedStyles;
export declare const cssClickable: import("@emotion/react").SerializedStyles;
