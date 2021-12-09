import React from 'react';
import Head from "next/head";
import type {AppContext, AppProps} from 'next/app'
import { CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "../themes/theme";
import Header from "../components/Header/index"
import {wrapper} from "../redux/store";

import '../styles/globals.sass'



function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

export default wrapper.withRedux(MyApp)
