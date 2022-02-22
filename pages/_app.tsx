import React from 'react';
import Head from "next/head";
import type {AppContext, AppProps} from 'next/app'
import {END} from "redux-saga";
import App from "next/app";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "../themes/theme";
import Header from "../components/Header/index"
import {SagaStore, wrapper} from "../redux/store";

import '../styles/globals.sass'
import {Store} from "redux";
import Api from "../utils/api";
import {setUserAction} from "../redux/actions/user";


function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store: Store) => async (context) => {
    try {
        const response = await Api(context.ctx).user.getMe()

        store.dispatch(setUserAction(response.data))
    } catch (e) {
        console.log("error in getinitialprops")
        console.log(e)
    }

    const pageProps = {
        ...(await App.getInitialProps(context)).pageProps,
    };

    //store.dispatch(initializationApp(context.ctx))

    if (context.ctx.req) {
        store.dispatch(END);
        await (store as SagaStore).sagaTask!.toPromise();
    }

    return {pageProps};

})

export default wrapper.withRedux(MyApp)

