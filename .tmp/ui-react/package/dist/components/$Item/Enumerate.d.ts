import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface EnumerateProps extends PropsWithChildren {
    marker?: string;
    margin?: 'none' | 'normal' | 'wide';
}
export declare const Enumerate: PolymorphicComponent<'ol', EnumerateProps>;
