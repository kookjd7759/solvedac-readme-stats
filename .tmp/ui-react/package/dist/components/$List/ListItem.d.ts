import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface ListItemProps extends PropsWithChildren {
    backgroundColor?: string;
    hoverColor?: string;
    clickable?: boolean;
    disabled?: boolean;
    padding?: 'none' | 'normal' | 'wide';
}
export declare const ListItem: PolymorphicComponent<'div', ListItemProps>;
