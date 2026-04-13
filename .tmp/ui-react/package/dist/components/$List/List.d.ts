import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface ListProps extends PropsWithChildren {
    padding?: 'none' | 'normal' | 'wide';
}
export declare const List: PolymorphicComponent<'ul', ListProps>;
