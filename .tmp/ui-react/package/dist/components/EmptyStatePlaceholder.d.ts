import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface EmptyStatePlaceholderProps extends PropsWithChildren {
    padding?: 'none' | 'normal' | 'wide';
}
export declare const EmptyStatePlaceholder: PolymorphicComponent<'div', EmptyStatePlaceholderProps>;
