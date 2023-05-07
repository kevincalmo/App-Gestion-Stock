import "@/styles/globals.css";
import {Amplify, withSSRContext, DataStore, AuthModeStrategyType} from "aws-amplify";
import awsExports from "../aws-exports";
import type {AppProps} from "next/app";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import {useEffect, useState} from "react";
import {User} from "@/models";
import {Center, ChakraProvider, Spinner} from "@chakra-ui/react";

Amplify.configure({
    ...awsExports,
    ssr: true,
});

function App({Component, pageProps}: AppProps) {
    const [isLoading, setIsLoading] = useState(false);
    let n = 0;
    useEffect(() => {
        if (n === 0) {
            (async function () {
                setIsLoading(true);
                try {

                    const auth = await Amplify.Auth.currentAuthenticatedUser();
                    const userDb = await DataStore.query(User, (u) => u.sub.eq(auth.attributes.sub));
                    if (userDb.length === 0) {
                        await DataStore.save(
                            new User({
                                // @ts-ignore
                                name: auth.attributes.name,
                                email: auth.attributes.email,
                                isAdmin: false,
                                sub: auth.attributes.sub
                            })
                        );
                        console.log("User create !");
                        setIsLoading(false);
                    } else {
                        console.log("User already exist !");
                        setIsLoading(false);
                    }
                } catch (e) {
                    setIsLoading(false);
                    console.log("ERROR : " + e);
                }
            })();
            n++;
        }

    }, [n]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        console.log(value);
    };
    if (isLoading) return (<Center h={"100%"}>
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
    </Center>);

    // @ts-ignore
    return <ChakraProvider><Component {...pageProps} /></ChakraProvider>;
}

export default withAuthenticator(App);

