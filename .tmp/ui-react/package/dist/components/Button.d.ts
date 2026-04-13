import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface ButtonProps extends PropsWithChildren {
    backgroundColor?: string;
    hoverColor?: string;
    primary?: boolean;
    transparent?: boolean;
    disabled?: boolean;
    circle?: boolean;
    fullWidth?: boolean;
    padding?: 'none' | 'normal';
}
export declare const Button: PolymorphicComponent<'button', ButtonProps>;
