import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface CardProps extends PropsWithChildren {
    backgroundColor?: string;
    hoverColor?: string;
    clickable?: boolean;
    disabled?: boolean;
    padding?: 'none' | 'normal' | 'wide';
}
export declare const Card: PolymorphicComponent<'div', CardProps>;
