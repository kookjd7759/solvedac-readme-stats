import React from 'react';
export interface TableRowGroupContextProps {
    header: boolean;
    verticalAlign: 'top' | 'middle' | 'bottom';
}
export declare const TableRowGroupContext: React.Context<TableRowGroupContextProps>;
