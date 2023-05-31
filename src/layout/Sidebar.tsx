import React, { ReactNode, ReactText, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUsers,
  FiList,
  FiPackage,
  FiTruck,
} from "react-icons/fi";
import { IconType } from "react-icons";
import StockDisplay from "@/components/StockDisplay";
import { CustomDivider } from "@/components/CustomDivider";
import { Amplify, Auth, DataStore } from "aws-amplify";
import { User } from "@/models";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link?: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Accueil", icon: FiHome, link: "/" },
  { name: "Agents", icon: FiUsers, link: "/agents" },
  { name: "Produits", icon: FiPackage, link: "/produits" },
  { name: "Tailles", icon: FiPackage, link: "/tailles" },
  { name: "Remise EPI", icon: FiUsers, link: "/remise-epi" },
  { name: "Commandes", icon: FiList, link: "/commandes" },
  { name: "Fournisseurs", icon: FiTruck, link: "/fournisseurs" },
];

export default function SidebarWithHeader({
  children,
  stocks,
}: {
  children: ReactNode;
  stocks: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("bgLight", "bgDark")}>
      <SidebarContent
        stocks={stocks}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} stocks={stocks} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  stocks: any;
}

const SidebarContent = ({ onClose, stocks, ...rest }: SidebarProps) => {
  const [activeStock, setActiveStock] = React.useState<string | null>(null);

  useEffect(() => {
    setActiveStock(localStorage.getItem("activeStockId"));
  }, []);
  const handleStockChange = async (id: string) => {
    try {
      // Je mets à jour mon stock actif en fonction de mon utilisateur
      const user = await Amplify.Auth.currentAuthenticatedUser();
      const userDB = await DataStore.query(User, (u: any) =>
        u.sub.eq(user.attributes.sub)
      );
      const currentUser = userDB[0];
      await DataStore.save(
        User.copyOf(currentUser, (updated) => {
          updated.activeStockID = id;
        })
      );
      // Je mets mon stock au niveau de mon context
      setActiveStock(id);
      // Je l'enregistre  dans mon localStorage
      localStorage.setItem("activeStockId", id);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("primary", "secondary")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Gestion Stock
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <CustomDivider />
      {/*Stocks */}
      {stocks?.map((stock: any, index: number) => (
        <StockDisplay
          onClick={() => {
            handleStockChange(stock.id);
          }}
          key={index}
          name={stock.name}
          isActive={activeStock === stock.id}
        />
      ))}
      {/*End stocks*/}
      <CustomDivider />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link?: string;
}

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <Link
      href={link ?? "#"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Gestion Stock
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <Link
                  href={"/profile"}
                  style={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={async () => {
                  await Auth.signOut();
                  window.location.reload();
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
