import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface ItemizeProps extends PropsWithChildren {
    marker?: string;
    margin?: 'none' | 'normal' | 'wide';
}
export declare const Itemize: PolymorphicComponent<'ul', ItemizeProps>;
