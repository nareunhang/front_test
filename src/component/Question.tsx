import { useState, useEffect } from "react";
import { Text, Divider, Card, CardBody, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

interface QuestionData {
  id: number;
  subject: string;
  content: string;
  createDate: [number, number, number, number, number, number, number]; // 날짜와 시간
  authorUsername: string;
  modifyDate: string | null;
  answerList: any[]; // 답변 목록을 위한 타입 (필요시 세부 타입 정의 가능)
}

export function Question() {
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터 읽어오기
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    // API에서 데이터 가져오기
    axios.get<QuestionData>(`${process.env.REACT_APP_API_URL}/questions/${id}`)
      .then(response => {
        setQuestion(response.data);
      })
      .catch(error => {
        console.error("Error fetching question:", error);
      });
  }, [id]);

  if (!question) {
    return <Text>Loading...</Text>; // 데이터가 로딩 중일 때 표시
  }

  const formatCreateDate = (createDate: [number, number, number, number, number, number, number]) => {
    const [year, month, day, hour, minute, second] = createDate;
    return new Date(year, month - 1, day, hour, minute, second).toLocaleDateString();
  };

  return (
    <>
      <Text>{question.subject}</Text>
      <Divider />
      <Card>
        <CardBody>
          <Text>{question.content}</Text>
          <Text>작성자: {question.authorUsername}</Text>
          <Text>작성 시간: {formatCreateDate(question.createDate)}</Text>
        </CardBody>
      </Card>
      <Spacer height={10} />
      <Text>답변이 여기 표시될 예정임.</Text>
      {question.answerList.map((answer, index) => (
        <Card key={index}>
          <CardBody>
            <Text>{answer.content}</Text>
            <Text>작성자: {answer.authorUsername}</Text>
            <Text>작성 시간: {new Date(answer.createDate).toLocaleString()}</Text>
            
          </CardBody>
        </Card>
      ))}
    </>
  );
}
