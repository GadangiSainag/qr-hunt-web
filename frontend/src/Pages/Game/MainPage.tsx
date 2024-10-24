import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import { useAuth } from "../../context/util";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import axios from "axios";

function MainPage() {
  const { id } = useAuth();
  // const [teamData, setTeamData] = useState<ITeamVisibleData | null>(null);
  const [fetchAvailable, setFetch] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  if (fetchAvailable) {
    const fetchTime = async () => {
      try {
        const docRef = doc(db, "allTeams", id); // Specify collection and document ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          // Document data exists
          setStartTime(docData.startTime);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchTime();
    setFetch(false);
  }

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
        }
      };
      updateStartTime();
      setFetch(true);
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
