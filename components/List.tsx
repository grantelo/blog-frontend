import React from 'react';
import {ResponsiveStyleValue} from '@mui/system';
import {Stack  } from "@mui/material";

interface ListProps<T> {
    items: any[],
    renderItem: (item: any, i?: number) => T,
    direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>,
    justifyContent?: ResponsiveStyleValue<'flex-start' | 'flex-end' | 'center' | 'space-between' | "space-around" | "space-evenly">
    alignItems?: ResponsiveStyleValue<'flex-start' | 'flex-end' | 'center' | 'strech' | "baseline">,
    spacing?: number,
}


export default function List<T>({items, renderItem, direction, justifyContent, alignItems, spacing}: ListProps<T>) {
    return (
        <Stack
            direction={direction ?? "column"}
            justifyContent={justifyContent ?? "flex-start"}
            alignItems={alignItems ?? "stretch"}
            spacing={spacing}
        >
            {items.map(renderItem)}
        </Stack>
    );
};
