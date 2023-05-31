import "@/styles/globals.css";
import {Amplify, withSSRContext, DataStore, AuthModeStrategyType} from "aws-amplify";
import awsExports from "../aws-exports";
import type {AppProps} from "next/app";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {useEffect, useState} from "react";
import {User} from "@/models";
import {Center, ChakraProvider, extendTheme, Spinner} from "@chakra-ui/react";
import {StockActiveProvider} from "@/context/StockActiveProvider";

Amplify.configure({
    ...awsExports,
    ssr: true,
});

const theme = extendTheme({
    colors: {
        primary: "#02A4FF",
        secondary: "#0081CC",
        accent: "#FFA602",
        bgLight: "#F0F0F0",
        bgDark: "#2B2B2B",
    }
});

function App({Component, pageProps}: AppProps) {

    

// @ts-ignore
    return <ChakraProvider theme={theme}><StockActiveProvider><Component {...pageProps} /></StockActiveProvider></ChakraProvider>;
}

export default App;

