import { useState,createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {Box,Card, CardBody,Image,Stack,Heading,Text,Divider,CardFooter,ButtonGroup,Button } from '@chakra-ui/react'

import User from "../model/User"

export function Login(){

    const [id,setId]=useState("")
    const [pw,setPw]=useState("")

    const navigate=useNavigate()
    
    const guest:User={id:id,pw:pw}

    const login=(guest:User)=>{
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/login`,
        data: {
          username: guest.id,
          password: guest.pw
        },
        withCredentials: true
      }
      
      )
        .then(response => {
          // 로그인 성공 시의 로직
          console.log('Login successful:');
          navigate("/board/0")
        } )
        .catch(error => {
          // 로그인 실패 시의 로직
          alert("ID와 패스워드를 확인해주세요")
        });
    
    }
    return (
      
      <Box display="flex" alignItems="center" justifyContent="center" >
      <Card maxW='sm'>
    <CardBody>
      <Image
        src='https://frodobluegreen.s3.ap-northeast-2.amazonaws.com/frodo2.png'
        alt='Green double couch with wooden legs'
        borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>어서오세요 ^^</Heading>
        <Text>ID
        </Text>
        <input type="text" onChange={(e)=>setId(e.target.value)} value={id}  />
        <Text>
          PW
        </Text>
        <input type="password" onChange={(e)=>setPw(e.target.value)} value={pw} />
        
        
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='blue'onClick={()=>{login(guest) }}  >
          로그인
        </Button>
        <Button variant='ghost' colorScheme='blue' onClick={()=>navigate('/register')} >
          회원가입
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
      </Box>
      
    );
}


  
