import { PolymorphicComponent } from '../types/PolymorphicElementProps';
export interface SwitchProps {
    value: boolean;
    onChange?: (value: boolean) => void;
    backgroundColor?: string;
    backgroundActiveColor?: string;
    knobColor?: string;
    knobBorderColor?: string;
    knobActiveColor?: string;
    knobActiveBorderColor?: string;
}
export declare const Switch: PolymorphicComponent<'div', SwitchProps>;
export default Switch;
