import { Box, Container } from "@mui/material";
import LeftMenu from "../components/LeftMenu";
import React from "react";
import classNames from "classnames";

interface MainLayoutProps {
  fullWidth?: boolean;
  className?: string;
  hideLeftMenu?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  fullWidth,
  hideLeftMenu,
  className,
  children,
}) => {
  return (
    <Box className={classNames("wrapper", className)}>
      {!hideLeftMenu && (
        <Box className={"leftSide"}>
          <LeftMenu />
        </Box>
      )}
      <Container>
        <Box className={classNames("content", { "content--full": fullWidth })}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
