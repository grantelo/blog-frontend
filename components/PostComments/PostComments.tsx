import React from 'react';
import {Box, Paper, Tab, Tabs, Typography} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const PostComments = () => {
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Paper>
                <Typography variant={"h5"}>42 комментария</Typography>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label="Item One"/>
                    <Tab label="Item Two"/>
                    <Tab label="Item Three"/>
                </Tabs>
            </Paper>
            <TabPanel
                value={value}
                index={0}
            >
                Item One
            </TabPanel>
            <TabPanel
                value={value}
                index={1}
            >
                Item Two
            </TabPanel>
            <TabPanel
                value={value}
                index={2}
            >
                Item Three
            </TabPanel>
        </>
    );
};

export default PostComments;