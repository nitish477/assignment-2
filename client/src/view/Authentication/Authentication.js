import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../../component/Authentication/Login";
import Signup from "../../component/Authentication/Signup";
function Authentication() {

  return (
    <div className="app">
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent={"center"}
          p={3}
          bg={"white"}
          w={"100%"}
          m={"40px 0 15px 0"}
          borderRadius={"lg"}
          borderWidth={"1px"}
        >
          <Text
            textAlign={"center"}
            fontSize={"4xl"}
            fontFamily={` font-family: 'Poppins', sans-serif'`}
            color={"black"}
          >
            Share Secret
          </Text>
        </Box>
        <Box
          w={"100%"}
          bg={"white"}
          p={4}
          borderRadius={"lg"}
          borderWidth={"1px"}
          color={"black"}
        >
          <Tabs variant="soft-rounded">
            <TabList mb={"1em"}>
              <Tab w={"50%"}>Login</Tab>
              <Tab w={"50%"}>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}

export default Authentication;
