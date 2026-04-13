import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface ContainerProps extends PropsWithChildren {
    w?: string | number;
    padding?: 'none' | 'normal' | 'wide';
    topBarPadding?: boolean;
}
export declare const Container: PolymorphicComponent<'div', ContainerProps>;
