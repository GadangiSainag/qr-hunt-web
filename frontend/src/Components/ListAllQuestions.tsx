// Import necessary Firebase modules
import { useEffect, useState } from "react";
import { collection, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface IQuestionsProgress {
  id: string;
  difficulty: string;
  hash: string;
  hint: string;
  questionText: string;
  progress: number;
}

export default function ListAllQuestions() {
  const [progress, setProgress] = useState<IQuestionsProgress[] | null>(null);

  useEffect(() => {
    const questionsCollectionRef = collection(db, "allQuestions");

    const unsubscribe = onSnapshot(
      questionsCollectionRef,
      (snapshot: QuerySnapshot) => {
        const updatedQuestions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IQuestionsProgress[];

        setProgress(updatedQuestions);
        console.log(updatedQuestions);
      }
    );

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  return (
    <div>
      Heres a list of all questions in database
      <h2>{JSON.stringify(progress)}</h2>
    </div>
  );
}
