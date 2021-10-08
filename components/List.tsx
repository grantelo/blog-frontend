import React from 'react';
import {Box} from "@mui/material";

interface ListProps<T> {
    items: any[],
    renderItem: (item: any) => T
}

export default function List<T>({items, renderItem}: ListProps<T>) {
    return (
        <Box>
            {items.map(renderItem)}
        </Box>
    );
};
