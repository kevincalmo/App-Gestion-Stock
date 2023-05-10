import {DataStore, withSSRContext} from "aws-amplify";
import {Agent, Stock, User, UserStock} from "@/models";
import {serializeModel} from "@aws-amplify/datastore/ssr";
import Layout from "@/layout";
import {
    Table,
    Tbody,
    Thead,
    Tr,
    Td,
    Th,
    Flex,
    Icon,
    Link,
    Text,
    Box, Button, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Input, useToast, FormControl,
} from "@chakra-ui/react";
import {FiPhoneCall} from "react-icons/fi";
import {Suspense, useState} from "react";
import {formatName} from "@/utils/formatName";
import CustomModal from "@/components/CustomModal";

export default function Agents({user, stocks, agents}: { user: any, stocks: any, agents: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [telephone, setTelephone] = useState("");
    const [listAgents, setListAgents] = useState(agents);
    const [errors, setErrors] = useState<string[]>([]);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();

    const handleCreateAgent = async () => {
        setIsLoading(true);
        const tabErrors: string[] = [];
        // Vérifier que le nom et le prénom sont non vides
        if (!firstname.trim() || !lastname.trim()) {
            tabErrors.push("Le nom et le prénom sont obligatoires.");
        }

        // Vérifier que le numéro de téléphone est au bon format (exemple : format international)
        const phoneRegex = /^\+[1-9]\d{1,14}$/;

        if (!telephone.match(phoneRegex)) {
            tabErrors.push("Le numéro de téléphone doit être au format international (ex: +33123456789).");
        }

        if (tabErrors.length > 0) {
            setErrors(tabErrors);
            setIsLoading(false);
            return;
        }

        // Créer l'agent
        try {
            const agent = await DataStore.save(
                new Agent({
                    first_name: firstname,
                    last_name: lastname,
                    telephon_number: telephone,
                    stockID: user.activeStockID
                })
            );
            setIsLoading(false);
            setIsCreate(false);
            setListAgents([...listAgents, agent]);
            onClose();
            toast({
                title: "Succès",
                description: "L'agent a bien été créé",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (e) {
            console.log(e);
            setIsLoading(false);
            setIsCreate(false);
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la création de l'agent",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Layout stocks={stocks}>
            <Box
                margin={{base: "30px 0"}}
            >
                <Button
                    colorScheme="blue"
                    size={"lg"}
                    onClick={onOpen}
                >
                    Ajouter un agent
                </Button>
            </Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Numéro de téléphone</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {listAgents.map((agent: any) => (
                        <Tr key={agent.id}>
                            <Td>
                                <Link href={"/agents/" + agent.id}>
                                    <Text>{formatName(agent.first_name)} {agent.last_name.toUpperCase()}</Text>
                                </Link>

                            </Td>
                            <Td>
                                <Link href={"tel:" + agent.telephon_number}>
                                    <Flex alignItems="center">
                                        <Icon marginRight="10px" as={FiPhoneCall}/>
                                        <Text>{agent.telephon_number}</Text>
                                    </Flex>
                                </Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <CustomModal isOpen={isOpen} onClose={onClose} title={"Création d'un nouvel agent"}>
                {errors.length > 0 &&
                    (
                        <Box
                            margin={"10px 0"}
                        >
                            {errors.map((error: string) => (
                                <Text color="red" key={error}>- {error}</Text>))}
                        </Box>
                    )
                }
                <FormControl>
                    <Input
                        onChange={(e) => setLastname(e.target.value)}
                        margin={"10px 0"}
                        name="lastname"
                        placeholder="Nom"
                    />
                </FormControl>
                <Input
                    onChange={(e) => setFirstname(e.target.value)}
                    margin={"10px 0"}
                    name="firstname"
                    placeholder="Prénom"
                />
                <Input
                    onChange={(e) => setTelephone(e.target.value)}
                    margin={"10px 0"}
                    name="phone"
                    placeholder="Numéro de téléphone"
                />
                <Button
                    onClick={handleCreateAgent}
                    isLoading={isLoading}
                    loadingText="Création de l'agent en cours"
                    colorScheme="green"
                    size={"lg"}
                >
                    Ajouter un agent
                </Button>
            </CustomModal>
        </Layout>

    );
}

export async function getServerSideProps({req}: { req: any }) {
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
    const agents = await DataStore.query(Agent, (a: any) => a.stockID.eq(userDb[0].activeStockID));
    return {
        props: {
            user: serializeModel(userDb[0]),
            stocks: serializeModel(stocks),
            agents: serializeModel(agents)
        }
    };
}