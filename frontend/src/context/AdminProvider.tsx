/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listenToCollection } from "../firebaseConfig";
import { FirestoreAdminContext } from "./FirestoreContext";
export interface ITeam {
  id: string;
  teamName: string;
  hash: string;
  players:string[];
  gameStatus: "IN_GAME" | "COMPLETED" | "STOPPED";

}
export interface IQuestion{
  id: string;
  text: string;
  difficulty: string;
  status: string;
}
export interface IProgress {
  id: string;
  numberOfSolvedQuestions: number;
  questionSet: IQuestion[];
  numberOfQuestions:number;
  lastSeenAt?: any;
}
const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collectionData, setCollectionData] = useState<Record<string, any[]>>(
    {}
  );

  useEffect(() => {
    const unsubscribeTeams = listenToCollection(
      "allTeams",
      ["players", "teamName", "hash", "gameStatus","duration", "huntId", "endTime", "registeredTime", "startTime"],
      (data) => {
        setCollectionData((prev) => ({ ...prev, teams: data }));
      }
    );

    const unsubscribeQuestions = listenToCollection(
      "allQuestions",
      ["customId", "hash", "questionText", "difficulty", "hint"],
      (data) => {
        setCollectionData((prev) => ({ ...prev, questions: data }));
      }
    );


    const unsubscribeTeamProgress = listenToCollection(
      "gameProgress",
      ["numberOfQuestions", "questionSet", "numberOfSolvedQuestions", "lastSeenAt"],
      (data) => {
        setCollectionData((prev) => ({ ...prev, progress: data }));
      }
    );
    // Add more collections as needed

    return () => {
      unsubscribeTeams();
      unsubscribeQuestions();
      unsubscribeTeamProgress();
    };
  }, []);

  return (
    <FirestoreAdminContext.Provider value={{ collectionData }}>
      {children}
    </FirestoreAdminContext.Provider>
  );
};

export default AdminDataProvider;
