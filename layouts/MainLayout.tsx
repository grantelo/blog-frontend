import {Box, Container} from "@mui/material";
import LeftMenu from "../components/LeftMenu";
import React from "react";
import classNames from "classnames";

interface MainLayoutProps {
    fullWidth?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({fullWidth, children}) => {
    return (
        <Box className={"wrapper"}>
            <Box className={"leftSide"}>
                <LeftMenu/>
            </Box>
            <Container>
                <Box className={classNames("content", {"content--full": fullWidth})}>{children}</Box>
            </Container>
        </Box>
    )
}

export default MainLayout