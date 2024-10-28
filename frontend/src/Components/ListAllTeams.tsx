import { useFirestoreData } from "../context/hooks";

export interface IQuestion {
  id: string;
  customId: string;
  difficulty: string;
  hash: string;
  hint: string;
  questionText: string;
}

export default function ListAllTeams() {
  const { collectionData  } = useFirestoreData();

  return (
    <div>
      Heres a list of all questions in database
      {collectionData.teams?.map((team, index) => (
        <div key={index}>
            {team.teamName}
          {/* <TeamCard question={question.questionText} difficulty={question.difficulty} id={question.customId} /> */}
        </div>
      ))}
    </div>
  );
}
