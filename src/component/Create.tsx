import { useState } from "react";
import { Text, Divider, Spacer, Input, Button } from "@chakra-ui/react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // For navigation after successful submission

axios.defaults.withCredentials = true;

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

 const info:Info={
  subject:title,
  content:content
 }

  interface Info {
subject:string;
content:string
  }

 
  const handleSubmit=(data:Info)=>{
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/questions`,
      data:{subject: data.subject,
        content: data.content}
    , 
      withCredentials: true
    }
    
    )
      .then(response => {
        // 로그인 성공 시의 로직
        console.log('등록 성공');
        navigate("/board/0")
       
      } )
      .catch(error => {
        // 로그인 실패 시의 로직
        alert("뭔가 잘못되었습니다.")
      });
  
  }


  return (
    <>
      <Text>질문등록</Text>
      <Divider />
      <Spacer height={10} />
      <Text>제목</Text>
      <Input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title} 
        size="lg"  
        height="50px" 
      />
      <Text>내용</Text>
      <Input 
        type="text" 
        onChange={(e) => setContent(e.target.value)} 
        value={content} 
        size="lg"  
        height="300px" 
      />
      <Button onClick={()=>handleSubmit(info)}>질문 등록하기</Button>
    </>
  );
}
