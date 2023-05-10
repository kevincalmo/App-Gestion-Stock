import {Center, Divider} from "@chakra-ui/react";
import React from "react";

export const CustomDivider = () => {
    return (
        <Center
        margin={{base:'10px 0'}}
        >
            <Divider width={"75%"}/>
        </Center>
    );
};