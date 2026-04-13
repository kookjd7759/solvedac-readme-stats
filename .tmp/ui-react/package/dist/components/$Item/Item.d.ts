import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface ItemProps extends PropsWithChildren {
    marker?: string;
}
export declare const Item: PolymorphicComponent<'li', ItemProps>;
