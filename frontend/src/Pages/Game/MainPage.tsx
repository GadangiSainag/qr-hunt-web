import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import {  usePlayerData } from "../../context/hooks";
import axios from "axios";
import { ITeamVisibleData } from "./GetReady";

function MainPage() {
  // const { id } = useAuth();
  const [teamData, setTeamData] = useState<ITeamVisibleData | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const {documentData} = usePlayerData();
  
  useEffect(()=> {

    console.log(documentData.team);
    if(documentData.team !=null){
      
      setStartTime(documentData.team.startTime)
    }
  },[documentData.team])
    
    
    useEffect(() => {
      const updateStartTime = async () => {

        const mountedTime = Date.now();
        try {
          const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        axios.defaults.withCredentials = true;
        const data = { startAt: mountedTime };
        axios
        .post("/api/game/start", data, config)
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.error(error);
        });
      } catch (error) {
        console.error("Error fetching document:", error);
      };
    }
    updateStartTime();
 
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      Main game page where a player spends most of the time <br /> Questions,
      timer, Score, TeamName
      <br />

      <Timer initialTimestamp={startTime} />
     
    </div>
  );
}
export default MainPage;
