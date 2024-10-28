/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listenToDocument } from "../firebaseConfig";
import { FirestoreplayerContext } from "./FirestoreContext";
import { useAuth } from "./hooks";

const PlayerDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [documentData, setDocumentData] = useState<Record<string, any>>({});
  const { id } = useAuth();
  useEffect(() => {
    console.log(id);
    // const unsubscribeTeam = listenToDocument(
    //   "allTeams",
    //   id,
    //   ["players", "teamName"],
    //   (data) => {
    //     setDocumentData((prev) => ({ ...prev, team: data }));
    //   }
    // );
    if (id) {
      const unsubscribePlayer = listenToDocument(
        "allTeams",
        id,
        ["teamName", "players", "gameStatus", "huntId", "startTime"],
        (data) => {
          setDocumentData((prev) => ({ ...prev, team: data }));
          console.log("player data fond");
        }
      );
      const unsubscribeProgress = listenToDocument(
        "gameProgress",
        id,
        ["numberOfSolvedQuestions", "questionSet", "numberOfQuestions"],
        (data) => {
          setDocumentData((prev) => ({ ...prev, progress: data }));
          console.log("player data fond");
        }
      );
      return () => {
        unsubscribePlayer();
        unsubscribeProgress();
      };
    }

    // Add more collections as needed
  }, [id]);

  return (
    <FirestoreplayerContext.Provider value={{ documentData }}>
      {children}
    </FirestoreplayerContext.Provider>
  );
};

export default PlayerDataProvider;
