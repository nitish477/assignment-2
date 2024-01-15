import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Modal from "./../../component/Modal/Model.js";
import ProfileModal from "../../component/ProfileModel/ProfileModel.js";
import axios from "axios";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [post, setPost] = useState();
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!getUser.email) {
     window.location.href='/login'
    }
     setUser(getUser);
  }, []);
  const logOut = () => {
    localStorage.removeItem("user")
    window.location.reload()
  };
  const fetchSecret = async () => {
    try {
      const responce = await axios.get("api/v1/fetchs");

      setPost(responce?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSecret();
  }, []);
  return (
    <div className="app">
      <Box
        d={{ base: "flex", md: "flex" }}
        alignItems="center"
        justifyContent={"center"}
        flexDir="column"
        p={3}
        w={"100%"}
        h={"100vh"}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          bg={"white"}
          w={"100%"}
          p={"5px 10px 5px 10px"}
          borderWidth={"5px"}
        >
          <Text fontSize={"2xl"} fontFamily={("Poppins", " sans - serif")}>
            Share Secret
          </Text>

          <div>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Avatar
                  size={"sm"}
                  cursor={"pointer"}
                  name={user?.username}
                  src={user?.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal
                  username={user?.username}
                  email={user?.email}
                  pic={user?.pic}
                />
                <MenuDivider />
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          fontFamily={"Poppins, sans-serif"}
          p={3}
          px={3}
          w={"100%"}
          fontSize={{ base: "28px", md: "30px" }}
        ></Box>
        <Box
          display={"flex"}
          bg={"wheat"}
          p={3}
          h={"80vh"}
          borderRadius={"lg"}
          overflowX={"hidden"}
          flexWrap={"wrap"}
          overflowY={"scroll"}
        >
          <Modal>
            <Button
              display={"block"}
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              mt={3}
              rightIcon={<AddIcon />}
            >
              Post Secret
            </Button>
          </Modal>
          <div className="contanier">
           
            {post?.map((post) => {
              return (
                <div className="card">
                  <p>{post.content}</p>
                </div>
              );
            })}
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
