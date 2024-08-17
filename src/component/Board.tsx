import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Input,Flex,Avatar,Box,Text,Badge } from '@chakra-ui/react';

interface Question {
  id: number;
  subject: string;
  authorUsername: string;
  createDate: [number, number, number, number, number, number, number]; // [year, month, day, hour, minute, second, nanosecond] format
}

interface ApiResponse {
  content: Question[];
  totalPages: number;
  totalElements: number;
  number: number; // Current page number (0-based)
  size: number; // Size of the page
}

// Date 변환 함수
const formatCreateDate = (createDate: [number, number, number, number, number, number, number]) => {
  const [year, month, day, hour, minute, second] = createDate;
  return new Date(year, month - 1, day, hour, minute, second).toLocaleDateString();
};

export function Board() {
  const { page } = useParams<{ page: string }>(); // URL의 페이지 파라미터를 읽어옴
  const [searchParameter, setSearchParameter] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10); // Assuming 10 items per page by default
  const currentPage = parseInt(page || '0');
  const navigate = useNavigate();

  useEffect(() => {
    // API 요청 보내기
    axios.get<ApiResponse>(`${process.env.REACT_APP_API_URL}/questions/?kw=${searchParameter}&page=${page}`,{withCredentials: true})
      .then(response => {
        const data = response.data;
        setQuestions(data.content); // 질문 목록 설정
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
        setTotalElements(data.totalElements); // 전체 항목 수 설정
        setPageSize(data.size); // 페이지 크기 설정
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [page, searchParameter]);

  return (
    <>
    <Flex>
  <Avatar src='https://frodobluegreen.s3.ap-northeast-2.amazonaws.com/frodo3.png' />
  <Box ml='3'>
    <Text fontWeight='bold'>
      Segun Adebayo
      <Badge ml='1' colorScheme='green'>
        New
      </Badge>
    </Text>
    <Text fontSize='sm'>UI Engineer</Text>
  </Box>
</Flex>
      <Input 
        placeholder='질문을 검색해주세요' 
        value={searchParameter}
        onChange={(e) => setSearchParameter(e.target.value)}
      />
      <Button onClick={() => navigate(`/board/0`)}>검색</Button>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Number</Th>
              <Th>Question</Th>
              <Th>Author</Th>
              <Th isNumeric>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map((question, index) => (
              <Tr key={question.id}>
                <Td>
                  {totalElements - (currentPage * pageSize) - index}
                </Td>
                <Td>
                  <a href={`/question/${question.id}`}>{question.subject}</a>
                </Td>
                <Td>{question.authorUsername}</Td>
                <Td isNumeric>
                  {formatCreateDate(question.createDate)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button 
        onClick={() => navigate(`/create`)}
      >
        질문 등록하기
      </Button>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button 
            key={i}
            onClick={() => navigate(`/board/${i}`)}
            disabled={i === currentPage}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
}
