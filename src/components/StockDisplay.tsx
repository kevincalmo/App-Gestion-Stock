import {Avatar, Flex, Icon, Text} from "@chakra-ui/react";
import {FiCheckSquare} from "react-icons/fi";

interface StockDisplayProps {
    picture?: string;
    name: string;
    isActive: boolean;
    onClick: () => void;
}

const StockDisplay = ({picture, name, isActive,onClick}: StockDisplayProps) => {
    return (
        <Flex
            onClick={onClick}
            alignItems="center"
            paddingInline="4"
            padding={'10px 0'}
            mx="4"
        >
            <Avatar marginRight="10px" name={name} src={picture} width={"50px"} height={"50px"}/>

            <Flex
                alignItems={"start"}
                direction={"column"}

            >
                <Text
                    marginRight={"20px"}
                    fontSize={{base: "20px"}}
                    fontWeight={{base: 500}}
                    color={'whiteAlpha.900'}
                >{name}
                </Text>
                {isActive && <Flex
                    alignItems={"center"}
                >
                    <Text color={'blackAlpha.800'} marginRight={'10px'} fontWeight={200}>Stock actif</Text>
                    <Icon
                    mr="4"
                    fontSize="16"
                    color="blackAlpha.900"
                    _groupHover={{
                        color: "white",
                    }}
                    as={FiCheckSquare}/></Flex>}
            </Flex>
        </Flex>
    );
};

export default StockDisplay;