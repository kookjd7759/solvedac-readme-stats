import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface FooterProps extends PropsWithChildren {
    backgroundColor?: string;
    padding?: 'none' | 'normal' | 'wide';
}
export declare const Footer: PolymorphicComponent<'footer', FooterProps>;
