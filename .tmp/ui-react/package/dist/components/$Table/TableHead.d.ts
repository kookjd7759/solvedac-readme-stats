import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface TableHeadContainerProps {
    sticky: boolean | number | string;
}
export interface TableHeadProps extends PropsWithChildren {
    sticky?: boolean | number | string;
    verticalAlign?: 'top' | 'middle' | 'bottom';
}
export declare const TableHead: PolymorphicComponent<'thead', TableHeadProps>;
