import React from 'react';
export interface ItemizeContextProps {
    level: number;
    marker: string;
    usesCounter: boolean;
}
export declare const ItemizeContext: React.Context<ItemizeContextProps>;
