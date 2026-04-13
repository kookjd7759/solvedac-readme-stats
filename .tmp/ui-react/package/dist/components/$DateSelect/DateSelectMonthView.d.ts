import React from 'react';
import { DateSelectCursor } from './DateSelect';
export interface DateSelectMonthView {
    cursorDate: Date;
    setCursorDate: (date: Date) => void;
    setModeToMonth: () => void;
    firstMonth: boolean;
    lastMonth: boolean;
    offset: number;
    selectState: DateSelectCursor;
    setSelectState: React.Dispatch<React.SetStateAction<DateSelectCursor>>;
}
export declare const DateSelectMonthView: (props: DateSelectMonthView) => React.JSX.Element;
