/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listenToCollection } from "../firebaseConfig";
import { FirestoreAdminContext } from "./FirestoreContext";


const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collectionData, setCollectionData] = useState<Record<string, any[]>>({});
  
    useEffect(() => {
      const unsubscribeTeams = listenToCollection('allTeams', ["players", "teamName", "hash"], (data) => {
        setCollectionData((prev) => ({ ...prev, teams: data }));
      });
  
      const unsubscribeQuestions = listenToCollection('allQuestions', ["customId", "questionText", "difficulty", "hint"], (data) => {
        setCollectionData((prev) => ({ ...prev, questions: data }));
      });
      
      const unsubscribeTeamProgress = listenToCollection('gameProgress', ["numberOfQuestions", "questionSet", "numberOfSolvedQuestions"], (data) => {
        setCollectionData((prev) => ({ ...prev, progress: data }));
      });
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
  
  