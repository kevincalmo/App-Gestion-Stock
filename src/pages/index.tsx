import React, {useContext, useEffect} from "react";
import Layout from "@/layout";
import {Amplify, withSSRContext} from "aws-amplify";
import {serializeModel} from "@aws-amplify/datastore/ssr";
import {Stock, User, UserStock} from "@/models";
import HomeHeading from "@/components/HomeHeading";
import {addAndUpdateActiveStock} from "@/services/AddandUpdateActiveStock";
import {StockContext} from "@/context/StockContext";

export default function Home({user, stocks}: any) {
    let n = 0;
    const {setActiveStockId} = useContext(StockContext);
    return (
        <Layout stocks={stocks}>
            <HomeHeading
                title={"Listes de produits"}
                content={<>0</>}
            />
            <HomeHeading
                title={"Les dernières remises d'EPI"}
                content={<>0</>}
            />
            <HomeHeading
                title={"Listes de agents"}
                content={<>0</>}
            />
            <HomeHeading
                title={"Les dernières commandes"}
                content={<>0</>}
            />
        </Layout>
    );
}

export async function getServerSideProps({req}: { req: any }) {
    const {Auth, DataStore} = withSSRContext({req});
    let user:any;
    try {
        user = await Auth.currentAuthenticatedUser();
    } catch (err) {}

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
    const stocks: any[] = [];
    for (const stock of stocksByUser) {
        let data = await DataStore.query(Stock, (s: any) => s.id.eq(stock.stockId));
        stocks.push(data[0]);
    }
    return {
        props: {
            user: serializeModel(userDb[0]),
            stocks: serializeModel(stocks)
        }
    }
}