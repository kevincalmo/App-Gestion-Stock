import Layout from "@/layout";
import { DataStore, withSSRContext } from "aws-amplify";
import {
  CategoriesProduct,
  Product,
  ProductSizeQuantity,
  Size,
  Stock,
  User,
  UserStock,
} from "@/models";
import { serializeModel } from "@aws-amplify/datastore/ssr";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  useDisclosure,
  Text,
  Icon,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import CustomModal from "@/components/CustomModal";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { ProductInterface } from "@/interfaces/productInterface";
import ProductComponent from "@/components/ProductComponent";
import ProductViews from "@/components/ProductView";
import Link from "next/link";

export default function Products({
  user,
  stocks,
  products,
  categories,
  sizes,
}: {
  user: any;
  stocks: any;
  products: any;
  categories: any;
  sizes: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listSizes, setListSizes] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [product, setProduct] = useState<ProductInterface>({
    id: "",
    label: "",
    categoriesproductID: "",
    stockID: user.activeStockID,
    sizes: [
      {
        id: "",
        quantity: 0,
      },
    ],
  });
  const toast = useToast();

  useEffect(() => {
    setListSizes(sizes);
    setProductsList(products);
  }, [products, sizes]);

  const handleAddSize = () => {
    const row: any = { ...product };
    row.sizes.push({
      id: "",
      quantity: 0,
    });
    setProduct(row);
  };

  const handleRemoveSize = (index: number) => {
    const row = { ...product };
    row.sizes!.splice(index, 1);
    setProduct(row);
  };

  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Vérification des champs

    // Création du produit
    try {
      const newProduct = await DataStore.save(
        new Product({
          label: product.label,
          // @ts-ignore
          categoriesproductID: product.categoriesproductID,
          stockID: product.stockID,
        })
      );
      const productID = newProduct.id;
      const newproductSizes = [];
      // Création des tailles
      for (const size of product.sizes!) {
        const sizeDb = await DataStore.save(
          new ProductSizeQuantity({
            productID: productID,
            sizeID: size.id,
            quantity: Number(size.quantity),
          })
        );
        newproductSizes.push(sizeDb);
      }
      const newProductWithSizes = { ...newProduct, sizes: newproductSizes };
      // @ts-ignore
      setProductsList([...productsList, newProductWithSizes]);
      setIsLoading(false);
      onClose();
      toast({
        title: "Produit créé",
        description: "Le produit a bien été créé",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (e: any) {
      toast({
        title: "Erreur lors de la création du produit",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = async (e: any, index?: number) => {
    const row: any = { ...product };
    if (index !== undefined) {
      row.sizes[index][e.target.name] = e.target.value;
    } else {
      row[e.target.name] = e.target.value;
    }
    setProduct(row);
    if (e.target.name === "categoryProductID") {
      setActiveCategory(e.target.value);
      handleFilterSize(e.target.value);
    }
  };

  const handleFilterSize = (category:string) => {
    const sizesTab = [...sizes];
    const newSizeTab: any = sizesTab.filter(
      (size: any) => size.categoriesproductID === category ?? activeCategory
    );

    setListSizes(newSizeTab);
  };

  return (
    <Layout stocks={stocks}>
      <Box>
        <Button onClick={onOpen} colorScheme={"blue"}>
          Ajouter un produit
        </Button>
      </Box>
      <Box>
        {productsList &&
          productsList.length > 0 &&
          productsList.map((product: ProductInterface, index: number) => (
            <>
            <ProductViews
              key={index}
              id={product.id}
              label={product.label}
              picture={product.picture}
            />
            </>
            
          ))}
      </Box>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Création d'un nouveau produit"}
      >
        <form onSubmit={handleCreateProduct}>
          <Box padding={2}>
            <Input
              onChange={handleChange}
              margin="10px 0"
              name="label"
              placeholder={"Nom du produit"}
            />
            <Select
              onChange={(e) => {
                handleChange(e);
              }}
              margin="10px 0"
              name="categoryProductID"
              placeholder={"Choisir une catégorie"}
            >
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </Select>
            <Box padding={4}>
              <Text>Choix des tailles :</Text>
              {product.sizes!.map((size, index) => (
                <Flex key={index} margin={"10px 0"}>
                  <Select
                    onChange={(e: any) => handleChange(e, index)}
                    name="id"
                    placeholder="Choisir une taille"
                  >
                    {listSizes &&
                      listSizes.map((size: any) => (
                        <option key={size.id} value={size.id}>
                          {size.label}
                        </option>
                      ))}
                  </Select>
                  <Input
                    name="quantity"
                    onChange={(e: any) => handleChange(e, index)}
                    placeholder={"Quantité"}
                  />
                  {index > 0 && (
                    <Button colorScheme="red" marginLeft={"10px"}>
                      <IconButton
                        bg="transparent"
                        name="delete"
                        icon={<FiTrash />}
                        aria-label="delete"
                        onClick={() => handleRemoveSize(index)}
                      />
                    </Button>
                  )}
                </Flex>
              ))}
            </Box>
            <Button onClick={handleAddSize} colorScheme="gray">
              Ajouter une taille
            </Button>
          </Box>
          <Flex margin={"20px 0"}>
            <Button
              onClick={() => {
                setIsLoading(false);
                onClose();
              }}
              variant="link"
              marginRight={"20px"}
              colorScheme="gray"
            >
              Annuler
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={"Création du produit en cours"}
              type="submit"
              colorScheme="green"
            >
              Créer mon produit
            </Button>
          </Flex>
        </form>
      </CustomModal>
    </Layout>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
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
  const stocksByUser = await DataStore.query(UserStock, (us: any) =>
    us.userId.eq(userDb[0].id)
  );
  const stocks: any[] = [];
  for (const stock of stocksByUser) {
    let data = await DataStore.query(Stock, (s: any) => s.id.eq(stock.stockId));
    stocks.push(data[0]);
  }

  const products = await DataStore.query(Product, (p: any) =>
    p.stockID.eq(userDb[0].activeStockID)
  );

  const categories = await DataStore.query(CategoriesProduct);
  const sizes = await DataStore.query(Size);
  console.log(sizes);

  return {
    props: {
      user: serializeModel(userDb[0]),
      stocks: serializeModel(stocks),
      products: serializeModel(products),
      categories: serializeModel(categories),
      sizes: serializeModel(sizes),
    },
  };
}
