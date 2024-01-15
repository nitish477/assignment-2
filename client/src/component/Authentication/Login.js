import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

    useEffect(() => {
      const getUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (getUser.email) {
        window.location.href = "/";
      }
    }, []);

  const Login = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      toast({
        title: "Please Enter all feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const responce = await axios.post("/api/v1/login", {
        email,
        password,
      });
      if (responce?.data?.success) {
        toast({
          title: "Login Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("user", JSON.stringify(responce?.data?.data));
        localStorage.setItem("token", JSON.stringify(responce?.data?.token));
       navigate('/')
        setLoading(false);
      } else {
        toast({
          title: "Invalid Email And Password",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Login Fail",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="Password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            type={show ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement w={"4.5rem"}>
            <Button
              onClick={() => {
                setShow(!show);
              }}
              h={"1.75rem"}
              size={"sm"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={Login}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
}

export default Login;
