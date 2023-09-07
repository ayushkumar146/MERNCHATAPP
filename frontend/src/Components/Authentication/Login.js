// import React from 'react'
import React from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
// import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
 
  const [email, setEmail] = useState();
  const toast = useToast();

  const [password, setPassword] = useState();
  // const { setUser } = ChatState();
const navigate=useNavigate();
const [loading, setLoading] = useState(false);

const submitHandler = async () => {
  setLoading(true);
  if (!email || !password) {
    toast({
      title: "Please Fill all the Feilds",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    toast({
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    // setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate("/chats");
  } catch (error) {
    toast({
      title: "Error Occured!",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
};

  return (
    <VStack spacing='5px'>
      
      <FormControl id='email' isRequired>
        <FormLabel>EMAIL</FormLabel>
        <Input placeholder='Enter Ur Email' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id='first-name' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input   type={show ? "text" : "password"}
        placeholder='Enter Ur Password'
        value={password} 
        onChange={(e)=>setPassword(e.target.value)}/>
           <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>


   
      
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="green"
        width="100%"
        onClick={() => {
          setEmail("ayush@gmail.com");
          setPassword("ayush");
        }}
      >
        Autofill
      </Button>
    </VStack>
  )
}

export default Login
