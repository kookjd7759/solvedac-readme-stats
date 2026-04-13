import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface TabProps extends PropsWithChildren {
    current?: boolean;
    disabled?: boolean;
    backgroundColor?: string;
    hoverColor?: string;
    accentColor?: string;
    accentHintColor?: string;
}
export declare const Tab: PolymorphicComponent<'a', TabProps>;
