import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export declare const navBarVariables: {
    vars: {
        backgroundColor: "--solvedac-nav-bar-background-color";
        textColor: "--solvedac-nav-bar-text-color";
    };
    v: {
        backgroundColor: "var(--solvedac-nav-bar-background-color)";
        textColor: "var(--solvedac-nav-bar-text-color)";
    };
    styles: (theme: import("..").SolvedTheme) => string;
};
export interface NavBarProps extends PropsWithChildren {
    backgroundColor?: string;
}
export declare const NavBar: PolymorphicComponent<'header', NavBarProps>;
