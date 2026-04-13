import React, { PropsWithChildren, ReactNode } from 'react';
import { SolvedTheme } from '../styles';
import { CardProps } from './Card';
type TooltipPlacementBasic = 'top' | 'right' | 'bottom' | 'left';
type TooltipPlacementRelative = 'start' | 'end';
export type TooltipPlacement = `${TooltipPlacementBasic}-${TooltipPlacementRelative}` | TooltipPlacementBasic;
export type TooltipProps = {
    title?: ReactNode;
    theme?: SolvedTheme;
    children?: ReactNode;
    arrow?: boolean;
    open?: boolean;
    place?: TooltipPlacement;
    interactive?: boolean;
    activateOnHover?: boolean;
    activateOnClick?: boolean;
    noThemeChange?: boolean;
    zIndex?: number;
    onOpenChange?: (open: boolean) => void;
} & ({
    noDefaultStyles: false;
} | (CardProps & {
    noDefaultStyles?: true;
})) & PropsWithChildren;
export declare const Tooltip: React.FC<TooltipProps>;
export {};
