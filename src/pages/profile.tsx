import {Box, Text, Input, Select, Button, useToast} from "@chakra-ui/react";
import Layout from "@/layout";
import {Auth, DataStore, withSSRContext} from "aws-amplify";
import {Stock, User, UserStock} from "@/models";
import {serializeModel} from "@aws-amplify/datastore/ssr";
import {useState} from "react";

export default function Profile({user, stocks}: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [gender, setgender] = useState(user.gender);
    const [username, setusername] = useState(user.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const toast = useToast();

    const handleUpdateUserInfo = async () => {
        setIsLoading(true);
        // Vérification des champs
        console.log(email, gender, username);

        try {
            const user = await Auth.currentAuthenticatedUser();
            // Modification de l'utilisateur pour la connexion
            await Auth.updateUserAttributes(user, {
                email: email,
            });
            console.log("user updated");
            // Modification de l'utilisateur pour la base de données
            const userDb = await DataStore.query(User, (u: any) => u.sub?.eq(user.attributes.sub));
            await DataStore.save(
                User.copyOf(userDb[0], (updated) => {
                    updated.email = email;
                    updated.gender = gender;
                    updated.username = username;
                }));
            console.log("userDb updated");
            setIsLoading(false);
            toast({
                title: "Informations modifiées.",
                description: "Vos informations ont bien été modifiées.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            setIsEditing(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast({
                title: "Erreur lors de la modification des informations.",
                description: "Une erreur est survenue lors de la modification de vos informations.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    const handleUpdateUserPassword = async () => {
        // Vérification des champs

        try {
            await Auth.changePassword(user, oldPassword, newPassword);
            toast({
                title: "Mot de passe modifié.",
                description: "Votre mot de passe a bien été modifié.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (e) {
            console.log(e);
            toast({
                title: "Erreur lors de la modification du mot de passe.",
                description: "Une erreur est survenue lors de la modification de votre mot de passe.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Layout stocks={stocks}>
            {/* Informations */}
            <Box>
                <Input margin={"10px 0"} disabled={!isEditing} name="email" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <Select onChange={(e) => setgender(e.target.value)} margin={"10px 0"} disabled={!isEditing}
                        name="gender" value={gender}>
                    <option></option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                </Select>
                <Input onChange={(e) => setusername(e.target.value)} margin={"10px 0"} disabled={!isEditing}
                       name="username" value={username}/>
                <Button
                    margin={"10px 0"}
                    colorScheme={isEditing ? "green" : "yellow"}
                    onClick={isEditing ? handleUpdateUserInfo : () => setIsEditing(true)}
                    isLoading={isLoading}
                    loadingText={"Modification en cours"}
                >
                    {isEditing ? "Valider les modifications" : "Modifier mes informations"}</Button>
            </Box>
            {/* Mot de passe */}
            <Box>
                <Input onChange={(e) => setOldPassword(e.target.value)}
                       placeholder="Ancien mot de passe"
                       margin={"10px 0"}
                />
                <Input
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    margin={"10px 0"}
                />
                <Input
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirmer le nouveau mot de passe"
                    margin={"10px 0"}
                />
                <Button
                    isLoading={isLoadingPassword}
                    loadingText={"Modification en cours"}
                    onClick={handleUpdateUserPassword}
                    margin={"10px 0"}
                    colorScheme={"green"}
                >
                    Modifier mon mot de passe
                </Button>
            </Box>
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
    return {
        props: {
            user: serializeModel(userDb[0]),
            stocks: serializeModel(stocks)
        }
    };
}