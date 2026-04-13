import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface ParagraphProps extends PropsWithChildren {
    margin?: 'none' | 'normal' | 'wide';
}
export declare const Paragraph: PolymorphicComponent<'p', ParagraphProps>;
