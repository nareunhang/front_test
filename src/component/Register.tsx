import {useState} from 'react'
import { Heading,Box,CardBody,Card,Image,Stack,Text,Divider,CardFooter,Button,ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export function Register(){
const [id,setId]=useState("")
const [pw,setPw]=useState("")
const [email,setEmail]=useState("")

interface Userinfo {
username:string,
email:string,
password1:string,
password2:string

}
const info={
  username:id,
  email:email,
  password1:pw,
  password2:pw
}

const navigate = useNavigate()

const register=(info:Userinfo)=>{
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/signup`,
      data: {
        username: info.username,
        password1: info.password1,
        password2: info.password2,
        email: info.email
      }})
      .then(response => {

        console.log('Register Success');
        alert("환영합니다!");
        navigate("/");
      } )
      .catch(error => {
        console.error('Register failed:', );
      });
  
  }

    return(<>
    <Box display="flex" alignItems="center" justifyContent="center" >
      <Card maxW='sm'>
    <CardBody>
      <Image
        src='https://frodobluegreen.s3.ap-northeast-2.amazonaws.com/frodo.png'
        alt='Green double couch with wooden legs'
        borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>회원가입</Heading>
        <Text>ID
        </Text>
        <input type="text" value={id} onChange={(e)=>setId(e.target.value)}  />
        <Text>
          PW
        </Text>
        <input type="password" value={pw} onChange={(e)=>setPw(e.target.value)}  />
        <Text>Email</Text>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        
        <Button variant='ghost' colorScheme='blue' onClick={()=>navigate('/')} >
          회원이세요?
        </Button>
        <Button variant='solid' colorScheme='blue' onClick={()=>register(info)}  >
          회원가입
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
      </Box>
    </>)
}