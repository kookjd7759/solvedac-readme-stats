import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface PaginationItemProps extends PropsWithChildren {
    current?: boolean;
    disabled?: boolean;
    backgroundColor?: string;
    hoverColor?: string;
    activeColor?: string;
}
export declare const PaginationItem: PolymorphicComponent<'a', PaginationItemProps>;
