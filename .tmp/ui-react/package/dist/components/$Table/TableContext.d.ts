import React from 'react';
export interface TableContextProps {
    padding: 'none' | 'dense' | 'normal' | 'wide';
    sticky: boolean | number | string;
    verticalAlign: 'top' | 'middle' | 'bottom';
}
export declare const TableContext: React.Context<TableContextProps>;
