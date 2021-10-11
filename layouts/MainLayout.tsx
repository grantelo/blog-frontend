import {Box} from "@mui/material";
import LeftMenu from "../components/LeftMenu";
import React from "react";

interface MainLayoutProps {

}

const MainLayout: React.FC<MainLayoutProps> = ({
    children
}) => {
    return (
        <Box className={"wrapper"}>
            <Box className={"leftSide"}>
                <LeftMenu/>
            </Box>
            <Box className={"content"}>{children}</Box>
        </Box>
    )
}

export default MainLayout