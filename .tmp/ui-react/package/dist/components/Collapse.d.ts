import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface CollapseProps extends PropsWithChildren {
    shown: boolean;
}
export declare const Collapse: PolymorphicComponent<'div', CollapseProps>;
