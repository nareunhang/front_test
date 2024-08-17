import { useState,createContext, ReactNode } from 'react';
import {Box,Card, CardBody, ChakraProvider,Image,Stack,Heading,Text,Divider,CardFooter,ButtonGroup,Button } from '@chakra-ui/react'
import { BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Login } from './component/Login';
import { Board } from './component/Board';
import { Question } from './component/Question';
import { QuesitonDetail } from './component/QuestionDetail';
import { Register } from './component/Register';

import User from "./model/User"
import { Create } from './component/Create';



function App() {

  return (
    
    <ChakraProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/board/:page" element={<Board/>}/>
        <Route path="/question/:id" element={<Question/>}/>
        <Route path='/questiondetail/:id' element={<QuesitonDetail/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}







export default App;
