import React from 'react';
import {InputBase} from "@mui/material";
import Editor from "../../components/Editor";
import WriteForm from "../../components/WriteForm";
import MainLayout from "../../layouts/MainLayout";

const Write = () => {
    return (
        <MainLayout className={"main-layout--white"} hideLeftMenu>
            <WriteForm/>
        </MainLayout>
    );
};

export default Write;
