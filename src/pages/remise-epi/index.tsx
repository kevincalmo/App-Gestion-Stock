import CustomModal from "@/components/CustomModal";
import { RemiseEpiInterface } from "@/interfaces/RemiseEpiInterface";
import Layout from "@/layout";
import {
  Agent,
  Product,
  User,
  RemisesEpi,
  Size,
  RemiseEpiItem,
} from "@/models";
import { serializeModel } from "@aws-amplify/datastore/ssr";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DataStore, withSSRContext } from "aws-amplify";
import Link from "next/link";
import React, { useState } from "react";
import { FiEye, FiTrash } from "react-icons/fi";
import Select from "react-select";

interface RemiseEpiProps {
  agents: Agent[];
  products: Product[];
  remisesEpi: RemiseEpiInterface[];
  activeStockID: string;
  sizes: Size[];
}

export default function RemiseEPI({
  agents,
  products,
  remisesEpi,
  activeStockID,
  sizes,
}: RemiseEpiProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const defaultRemiseEpi: RemiseEpiInterface = {
    date: "",
    agentID: "",
    stockID: activeStockID,
    items: [
      {
        productID: "",
        sizeID: "",
        quantity: 0,
        description: "",
      },
    ],
  };
  const [currentRemiseEpi, setCurrentRemiseEpi] = useState(defaultRemiseEpi);

  const handleAddField = () => {
    const current = { ...currentRemiseEpi };
    current.items!.push({
      productID: "",
      sizeID: "",
      quantity: 0,
      description: "",
    });
    setCurrentRemiseEpi(current);
  };

  const handleRemoveField = (index: number) => {
    const current = { ...currentRemiseEpi };
    current.items!.splice(index, 1);
    setCurrentRemiseEpi(current);
  };

  const handleChange = (
    event: any,
    isSelect = false,
    selectName = "",
    isItem = false,
    index: number | null
  ) => {
    const current: any = { ...currentRemiseEpi };
    // Check si cette réponse viens de mon tableau d'item
    if (isItem) {
      if (isSelect) {
        current.items[index!][selectName] = event.value;
      } else {
        current.items[index!][event.target.name] = event.target.value;
      }
    } else {
      if (isSelect) {
        current[selectName] = event.value;
      } else {
        current[event.target.name] = event.target.value;
      }
    }
    setCurrentRemiseEpi(current);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    /* Vérification des champs */

    /* Envoie des données */
    try {
      const createRemiseEpi = await DataStore.save(
        new RemisesEpi({
          date: currentRemiseEpi.date,
          agentID: currentRemiseEpi.agentID,
          stockID: currentRemiseEpi.stockID!,
        })
      );

      for (let index = 0; index < currentRemiseEpi.items!.length; index++) {
        const item = currentRemiseEpi.items![index];
        await DataStore.save(
          new RemiseEpiItem({
            quantity: Number(item.quantity),
            description: item.description,
            sizeID: item.sizeID,
            productID: item.productID,
            remisesepiID: createRemiseEpi.id,
          })
        );
      }

      /* Remise à zéro  */
      setCurrentRemiseEpi(defaultRemiseEpi);

      /* Fermeture de la modale */
      onClose();

      /* Affichge de la notification */
      toast({
        title: "Nouvelle remise epi enregistrer",
        description: "Félicitation ! Votre remise d'EPi est bien sauvegarder.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Oupss... Une erreur est survenue",
        description:
          "Veuillez essayer plus tard. Si le problème persiste, veuillez contacter votre administrateur.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.log(error);
    }
  };
  return (
    <Layout>
      <Box>
        <Button onClick={onOpen} variant="solid" colorScheme="blue">
          Effectuer une remise EPI
        </Button>
      </Box>
      {/* Tableau avec l'historique des différentes remises d'EPI */}
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Agent</Th>
              <Th>Quantité</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {remisesEpi.length > 0 &&
              remisesEpi.map((remiseEpi) => (
                <Tr key={remiseEpi.id}>
                  <Td>{remiseEpi.date}</Td>
                  <Td>{remiseEpi.agentID}</Td>
                  <Td>{remiseEpi.countItems}</Td>
                  <Td>
                    <Flex>
                      <Link href={`/remise-epi/${remiseEpi.id}`}>
                        <Button colorScheme="blue">
                          <FiEye />
                        </Button>
                      </Link>
                      <Button colorScheme="red">
                        <FiTrash />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Nouvelle Remise EPI"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => handleChange(e, false, "", false, null)}
            type="date"
            name="date"
            value={currentRemiseEpi.date}
          />
          <Select
            placeholder="Choissiez un agent"
            onChange={(e) => handleChange(e, true, "agentID", false, null)}
            options={agents}
          />
          <Box padding={4}>
            <Text marginBottom="20px">Listes des produits à remettre</Text>
            {currentRemiseEpi.items!.map((current, index) => (
              <Stack margin="30px 0" key={index}>
                <Select
                  onChange={(e) =>
                    handleChange(e, true, "productID", true, index)
                  }
                  placeholder="Choissiez le produit"
                  options={products}
                />
                <Select
                  onChange={(e) => handleChange(e, true, "sizeID", true, index)}
                  placeholder="Choissiez la taille"
                  options={sizes}
                />
                <Input
                  onChange={(e) => handleChange(e, false, "", true, index)}
                  type="number"
                  placeholder="Entrez une quantité"
                  name="quantity"
                />
                <Textarea
                  onChange={(e) => handleChange(e, false, "", true, index)}
                  placeholder="Entrez une description ( optionnel )"
                  name="description"
                />
                {index > 0 && (
                  <Button
                    onClick={() => handleRemoveField(index)}
                    colorScheme="red"
                    width="100%"
                  >
                    Supprimer
                  </Button>
                )}
              </Stack>
            ))}
            <Box margin="20px 0">
              <Button onClick={handleAddField} size="lg">
                Ajouter une ligne
              </Button>
            </Box>
            <Flex gap={10} alignItems="center" justifyContent="flex-end">
              <Button onClick={onClose} variant="link" size="lg">
                Annuler
              </Button>
              <Button
                type="submit"
                variant="outline"
                colorScheme="green"
                size="lg"
              >
                Valider
              </Button>
            </Flex>
          </Box>
        </form>
      </CustomModal>
    </Layout>
  );
}

export async function getServerSideProps({ req, params }: any) {
  const { Auth, DataStore } = withSSRContext({ req });
  let user: any;
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
  const userDb = await DataStore.query(User, (u: any) =>
    u.sub?.eq(userAuth.attributes.sub)
  );
  const activeStockID = userDb[0].activeStockID;
  /* les produits */
  const products = await DataStore.query(Product, (p: any) =>
    p.stockID.eq(activeStockID)
  );
  const productsForSelectOption = products.map((product: any) => {
    return { value: product.id, label: product.label };
  });
  /* Les agents */
  const agents = await DataStore.query(Agent, (a: any) =>
    a.stockID.eq(activeStockID)
  );
  const agentsForSelectOptions: any = agents.map((agent: Agent) => {
    return { value: agent.id, label: agent.first_name + " " + agent.last_name };
  });
  /* Les tailles */
  const sizes = await DataStore.query(Size);
  const sizesForSelectOption = sizes.map((size: Size) => {
    return { value: size.id, label: size.label };
  });
  /* Les remises EPI */
  const remisesEPI = await DataStore.query(RemisesEpi, (r: any) =>
    r.stockID.eq(activeStockID)
  );

  const remiseEpiArray: RemiseEpiInterface[] = [];

  for (let index = 0; index < remisesEPI.length; index++) {
    const current = remisesEPI[index];

    let fetchAgent = agents.filter(
      (agent: Agent) => agent.id === current.agentID
    );

    let fetchItemsCount = await DataStore.query(RemiseEpiItem, (r: any) =>
      r.remisesepiID.eq(current.id)
    );

    const data: RemiseEpiInterface = {
      id: current.id,
      date: current.date,
      agentID: fetchAgent[0].first_name + " " + fetchAgent[0].last_name,
      countItems: fetchItemsCount.length,
    };

    remiseEpiArray.push(data);
  }

  return {
    props: {
      products: serializeModel(productsForSelectOption),
      agents: serializeModel(agentsForSelectOptions),
      remisesEpi: serializeModel(remiseEpiArray),
      sizes: serializeModel(sizesForSelectOption),
      activeStockID,
    },
  };
}
