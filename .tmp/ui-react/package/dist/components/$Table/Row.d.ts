import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface RowProps extends PropsWithChildren {
    header?: boolean;
    padding?: 'none' | 'dense' | 'normal' | 'wide';
    verticalAlign?: 'top' | 'middle' | 'bottom';
}
export declare const Row: PolymorphicComponent<'tr', RowProps>;
