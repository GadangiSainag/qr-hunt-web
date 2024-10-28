import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth, usePlayerData } from "../../context/hooks";
export interface ITeamVisibleData {
  id: string;
  teamName: string;
  players: string[];
  huntId: string;
  gameStatus: string;

  // duration:number;
  // endTime: number | null;
  // hash:string;
  // lastSeenAt: string | null;
  // registeredTime: number;
  // startTime: number | null;
}
function GetReady() {
  const navigate = useNavigate();
  function handleButtonClick() {
    // after some transition like 3,2,1. and logo animation

    navigate("/game/play");
   
  }
  const [teamData, setTeamData] = useState<ITeamVisibleData | null>(null);
const {documentData} = usePlayerData()
  // useEffect(() => {
  //   const fetchTeamData = async () => {
  //     try {
  //       const docRef = doc(db, "allTeams", id); // Specify collection and document ID
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const docData = docSnap.data();
  //         // Document data exists
  //         const documentData = {
  //           id: docSnap.id,
  //           teamName: docData.teamName,
  //           players: docData.players,
  //           huntId: docData.huntId,
  //           gameStatus: docData.gameStatus,
  //         } as ITeamVisibleData;

  //         setTeamData(documentData);
  //         //console.log(documentData); // Log the data for debugging
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document:", error);
  //     }
  //   };
  //   fetchTeamData();
  // }, []); // Empty dependency array ensures it runs only once on mount
  console.log(documentData.team)
  return (
    <div>
      <h3>{teamData?.teamName}</h3>
      Important instructions and rules. about game.
      <br />
      {JSON.stringify(documentData.team)}

      
      
      <button onClick={handleButtonClick}>Start Game </button>
    </div>
  );
}
export default GetReady;
