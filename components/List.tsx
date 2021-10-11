import React from 'react';
import {Stack} from "@mui/material";

interface ListProps<T> {
    items: any[],
    renderItem: (item: any) => T,
}


export default function List<T>({items, renderItem}: ListProps<T>) {
    return (
        <Stack>
            {items.map(renderItem)}
        </Stack>
    );
};
