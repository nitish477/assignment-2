import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from 'axios';
function Model({children}) {
   const [content,setContent]=useState('')
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast= useToast()

   const handelSubmit = async()=>{
    if(!content){
      toast({
        title: "Enter Message",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return
    }
     const token = JSON.parse(localStorage.getItem("token"));
     if(!token){
      return
     }
     try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const responce = await axios.post("api/v1/secrets", { content },config);
      alert(responce?.data?.message)
      if(responce?.data?.success){
       toast({
         title: "Post SuccessFully",
         status: "success",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
       setContent('');
       window.location.reload()
      }
     
     } catch (error) {
      console.log(error.message)
     }
   }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            fontFamily={"Poppins, sans - serif"}
            fontSize={"35px"}
            justifyContent={"center"}
          >
            Create Secret Post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <FormControl>
              <Input
                placeholder="Secret Message"
                mb={3}
                onChange={(e) => {
                  setContent(e.target.value)
                }}
              />
            </FormControl>
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handelSubmit}>
              Post Secret
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

}

export default Model