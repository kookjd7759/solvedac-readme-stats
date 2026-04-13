import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface TableProps extends PropsWithChildren {
    fullWidth?: boolean;
    sticky?: boolean | number | string;
    padding?: 'none' | 'dense' | 'normal' | 'wide';
    verticalAlign?: 'top' | 'middle' | 'bottom';
}
export declare const Table: PolymorphicComponent<'table', TableProps>;
