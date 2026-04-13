import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface TabsProps extends PropsWithChildren {
    fullWidth?: boolean;
    multiline?: boolean;
}
export declare const Tabs: PolymorphicComponent<'nav', TabsProps>;
