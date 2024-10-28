import { useFirestoreData } from "../context/hooks";
import QuestionCard from "./Question/QuestionCard";

export interface IQuestion {
  id: string;
  customId: string;
  difficulty: string;
  hash: string;
  hint: string;
  questionText: string;
}

export default function ListAllQuestions() {
  const { collectionData  } = useFirestoreData();

  return (
    <div>
      Heres a list of all questions in database
      {collectionData.questions?.map((question, index) => (
        <div key={index}>
          <QuestionCard question={question.questionText} difficulty={question.difficulty} id={question.customId} />
        </div>
      ))}
    </div>
  );
}
