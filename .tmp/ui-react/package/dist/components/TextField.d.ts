import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface TextFieldProps extends PropsWithChildren {
    fullWidth?: boolean;
    multiline?: boolean;
    disabled?: boolean;
    resizable?: 'none' | 'both' | 'horizontal' | 'vertical' | boolean;
}
export declare const TextField: PolymorphicComponent<'input', TextFieldProps>;
