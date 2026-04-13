import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface CellProps extends PropsWithChildren {
    padding?: 'none' | 'dense' | 'normal' | 'wide';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    header?: boolean;
    numeric?: boolean;
}
export declare const Cell: PolymorphicComponent<'td', CellProps>;
