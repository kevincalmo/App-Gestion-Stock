import Layout from "@/layout";
import { Stock, User, UserStock } from "@/models";
import { serializeModel } from "@aws-amplify/datastore/lib-esm/ssr";
import { withSSRContext } from "aws-amplify";
import React from "react";

export default function Agent({ stocks }: { stocks: any }) {
  return <Layout stocks={stocks}>Agent</Layout>;
}

export async function getServerSideProps({req, params}: any){
    const {Auth, DataStore} = withSSRContext({req});
    let user: any;
    try {
        user = await Auth.currentAuthenticatedUser();
    } catch (err) {
    }

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: `/login`,
            },
        };
    }

    const userAuth = await Auth.currentAuthenticatedUser();
    const userDb = await DataStore.query(User, (u: any) => u.sub?.eq(userAuth.attributes.sub));
    const stocksByUser = await DataStore.query(UserStock, (us: any) => us.userId.eq(userDb[0].id));
    const stocks: Stock[] = [];
    for (const stock of stocksByUser) {
        let data = await DataStore.query(Stock, (s: any) => s.id.eq(stock.stockId));
        stocks.push(data[0]);
    }
    
    return{
        props: {
            stocks:[],
        }
    }
}
