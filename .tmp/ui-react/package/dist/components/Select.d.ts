import React, { ElementType, PropsWithChildren, ReactNode } from 'react';
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from '../types/PolymorphicElementProps';
import { ListItemProps } from './$List';
type SelectItemNode = string | {
    value: string;
};
export interface SelectProps<T extends SelectItemNode> extends PropsWithChildren {
    fullWidth?: boolean;
    disableEllipsis?: boolean;
    items?: T[];
    value?: string | null;
    zIndex?: number;
    onChange?: (value: T) => void;
    render?: (value: T, index?: number) => ReactNode;
    ListItemProps?: Partial<PolymorphicComponentPropsWithRef<'div', ListItemProps>>;
}
export declare const Select: <C extends ElementType = "div", E extends SelectItemNode = SelectItemNode>(props: SelectProps<E> & {
    as?: C | undefined;
} & Omit<React.PropsWithoutRef<React.ComponentProps<C>>, "as" | keyof SelectProps<E>> & {
    ref?: PolymorphicRef<C> | undefined;
} & React.RefAttributes<unknown>) => React.ReactElement | null;
export {};
