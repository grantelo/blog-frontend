import React from 'react';
import type {AppProps} from 'next/app'
import {Container, CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "../themes/theme";
import Header from "../components/Header/index"

import '../styles/globals.sass'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </ThemeProvider>
        </>
    )
}

export default MyApp
