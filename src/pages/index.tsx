import React, {useEffect} from "react";
import Layout from "@/layout";
import {Amplify, withSSRContext} from "aws-amplify";
import {serializeModel} from "@aws-amplify/datastore/ssr";
import {Stock, User, UserStock} from "@/models";

export default function Home({user,stocks}:any) {
  console.log(user);
  console.log(stocks);
    return (
        <Layout>
          {user.sub}
        </Layout>
    );
}

export async function getServerSideProps({req}: { req: any }) {
    const SSR = withSSRContext({req});
    const userAuth = await SSR.Auth.currentAuthenticatedUser();
    const userDb = await SSR.DataStore.query(User, (u:any) => u.sub.eq(userAuth.attributes.sub));
    const stocksByUser = await SSR.DataStore.query(UserStock, (us:any) => us.userId.eq(userDb[0].id));
    const stocks:any[] = [];
    for (const stock of stocksByUser) {
      let data = await SSR.DataStore.query(Stock, (s:any) => s.id.eq(stock.stockId));
      stocks.push(data[0]);
    }
    return {
        props: {
            user: serializeModel(userDb[0]),
          stocks: serializeModel(stocks)
        }
    }
}