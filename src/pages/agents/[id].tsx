import {DataStore, withSSRContext} from "aws-amplify";
import {Stock, User, UserStock, Agent} from "@/models";
import {serializeModel} from "@aws-amplify/datastore/ssr";
import Layout from "@/layout";
import {Button, Flex, Input, useToast} from "@chakra-ui/react";
import {useState} from "react";

export default function SingleAgent({user, stocks, agent}: { user: any, stocks: any, agent: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [lastname, setLastname] = useState(agent.last_name);
    const [firstname, setFirstname] = useState(agent.first_name);
    const [telephone, setTelephone] = useState(agent.telephon_number);
    const toasts = useToast();

    const handleUpdateUser = async () => {
        setIsLoading(true);
        // vérifier que les champs sont remplis

        // update
        try {
            const agent: any = await DataStore.query(Agent, (a: any) => a.id.eq(agent.id));
            await DataStore.save(Agent.copyOf(agent, updated => {
                updated.last_name = lastname;
                updated.first_name = firstname;
                updated.telephon_number = telephone;
            }));
            setIsLoading(false);
            setIsEditing(false);
            toasts({
                title: "Succès",
                description: "L'agent a bien été modifié",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (e) {
            console.log(e);
            setIsLoading(false);
            setIsEditing(false);
            toasts({
                title: "Erreur",
                description: "Une erreur est survenue lors de la modification de l'agent",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleDeleteUser = async () => {
        setIsLoading(true);
        try {
            const agent: any = await DataStore.query(Agent, (a: any) => a.id.eq(agent.id));
            await DataStore.delete(agent);
            setIsLoading(false);
            setIsEditing(false);
            window.location.href = "/agents";
            toasts({
                title: "Succès",
                description: "L'agent a bien été supprimé",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (e) {
            console.log(e);
            setIsLoading(false);
            setIsEditing(false);
            toasts({
                title: "Erreur",
                description: "Une erreur est survenue lors de la suppression de l'agent",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <Layout stocks={stocks}>
            <Input
                margin="10px 0"
                onChange={(e) => setLastname(e.target.value)}
                disabled={!isEditing}
                value={lastname}/>
            <Input
                margin="10px 0"
                onChange={(e) => setFirstname(e.target.value)}
                disabled={!isEditing}
                value={firstname}/>
            <Input
                margin="10px 0"
                onChange={(e) => setTelephone(e.target.value)}
                disabled={!isEditing}
                value={telephone} type="number"/>
            <Flex>
                <Button
                    marginRight={4}
                    colorScheme={isEditing ? "green" : "yellow"}
                    onClick={isEditing ? handleUpdateUser : () => setIsEditing(true)}
                >
                    {isEditing ? "Enregistrer" : "Modifier"}
                </Button>
                <Button
                    colorScheme="red"
                    onClick={handleDeleteUser}
                >
                    Supprimer
                </Button>
            </Flex>

        </Layout>
    );
}

export async function getServerSideProps({req, params}: any) {
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
    const stocks: any[] = [];
    for (const stock of stocksByUser) {
        let data = await DataStore.query(Stock, (s: any) => s.id.eq(stock.stockId));
        stocks.push(data[0]);
    }
    const agent = await DataStore.query(Agent, (a: any) => a.id.eq(params.id));
    return {
        props: {
            user: serializeModel(userDb[0]),
            stocks: serializeModel(stocks),
            agent: serializeModel(agent[0])
        }
    };
}