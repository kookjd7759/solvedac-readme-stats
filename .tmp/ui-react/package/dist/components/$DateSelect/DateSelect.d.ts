import { PropsWithChildren } from 'react';
import { PolymorphicComponent } from '../../types/PolymorphicElementProps';
export interface DateRange {
    start: string;
    end: string;
}
export type DateSelectValues = {
    type: 'date';
    value: string;
    onChange?: (value: string) => void;
} | {
    type: 'date-range';
    value: DateRange;
    onChange?: (value: DateRange) => void;
};
export interface DateSelectAnnotation extends DateRange {
    title?: string;
    color?: string;
}
export type DateSelectProps = DateSelectValues & {
    annotations?: DateSelectAnnotation[];
    maxAnnotationsPerDay?: number;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    locale?: string;
    chunks?: number;
} & PropsWithChildren;
export type DateSelectMode = 'year' | 'month' | 'date';
export type CursorMode = 'select' | 'selectStart' | 'selectEnd';
export type DateSelectCursor = {
    mode: 'select';
    hover: Date | null;
} | {
    mode: 'selectStart';
    hover: Date | null;
} | {
    mode: 'selectEnd';
    valueStart: Date;
    hover: Date | null;
};
export declare const DateSelect: PolymorphicComponent<'div', DateSelectProps>;
