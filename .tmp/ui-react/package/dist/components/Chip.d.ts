import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface ChipProps extends PropsWithChildren {
    backgroundColor?: string;
}
export declare const Chip: PolymorphicComponent<'div', ChipProps>;
