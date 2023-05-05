import "@/styles/globals.css";
import {Amplify} from "aws-amplify";
import awsExports from "../aws-exports";
import type {AppProps} from "next/app";

Amplify.configure({...awsExports, ssr: true});

export default function App({Component, pageProps}: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />
}
