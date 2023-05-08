import {Box, Center, Flex, Heading, Stack} from "@chakra-ui/react";

const HomeHeading = ({title = "Titre de rubrique", content = <>Hello</>}: { title: string, content: any }) => {
    return (
        <Box
            width={{base: "100%"}}
            height={{base: "155px"}}
            bg="white"
            boxShadow="lg"
            rounded="sm"
        >
            <Stack
                height='100%'
            >
                <Box
                    bg="primary"
                    width="100%"
                    height="100px"
                >
                    <Center
                        h="100%"
                    >
                        <Heading
                            textAlign="center"
                        >{title}</Heading>
                    </Center>
                </Box>
                <Box
                height='100%'
                >
                    <Center
                        h="100%"
                    >
                        {content}
                    </Center>
                </Box>
            </Stack>
        </Box>
    );
};
export default HomeHeading;