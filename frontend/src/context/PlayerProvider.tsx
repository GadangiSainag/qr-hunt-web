/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listenToDocument } from "../firebaseConfig";
import { FirestoreplayerContext } from "./FirestoreContext";
import { useAuth } from "./hooks";

const PlayerDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [documentData, setDocumentData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [playerDataLoading, setPlayerDataLoading] = useState(true);
  const [progressDataLoading, setProgressDataLoading] = useState(true);


  const { id } = useAuth();
  useEffect(() => {
    console.log(id);
    
    if (id) {
      const unsubscribePlayer = listenToDocument(
        "allTeams",
        id,
        ["teamName", "players", "gameStatus", "huntId", "startTime"],
        (data) => {
          console.log(data)
          setDocumentData((prev) => ({ ...prev, team: data }));
          setPlayerDataLoading(false); // Indicate player data has loaded
          console.log("player data fond");
        }
      );
      return () => {
        unsubscribePlayer();
      };
    }
    //  more collections Here
  }, [id]);

  useEffect(() => {
    if (id) {
      const unsubscribeProgress = listenToDocument(
        "gameProgress",
        id,
        ["numberOfSolvedQuestions", "questionSet", "numberOfQuestions"],
        (data) => {
          setDocumentData((prev) => ({ ...prev, progress: data }));
          setProgressDataLoading(false); // Indicate progress data has loaded
          console.log("player data fond");
        }
      );
      return () => {
        unsubscribeProgress();
      };
    }
    //  more collections Here
  }, [id]);

  useEffect(() => {
    
    if (!playerDataLoading && !progressDataLoading) {
      setLoading(false);
    }
  }, [playerDataLoading, progressDataLoading]);


  return (
    <FirestoreplayerContext.Provider value={{ documentData, loading }}>
      {children}
    </FirestoreplayerContext.Provider>
  );
};

export default PlayerDataProvider;
