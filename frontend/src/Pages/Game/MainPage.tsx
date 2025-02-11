import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import { useAuth, usePlayerData } from "../../context/hooks";
import axios from "axios";
import { Label } from "@/Components/ui/label";
import { Card, CardHeader } from "@/Components/ui/card";
import classes from "./main.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { BiScan } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import TruncateText from "@/Components/TruncateText";

function MainPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [focusId, setFocus] = useState("");
  const [startTime, setStartTime] = useState<number>(Date.now());
  const { documentData } = usePlayerData();
  const [dialogOpen, setOpenDialog] = useState(false);
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>({});
  useEffect(() => {
    console.log(documentData.team);
    if (documentData.team != null) {
      setStartTime(documentData.team.startTime);
    }
  }, [documentData.team]);

  useEffect(() => {
    const updateLocation = async () => {
      try {
        // Get current position
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          const data = {
            location: { latitude, longitude },
          };
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming token is stored in localStorage
            },
          };
          // Make API call to backend with user's location
          await axios.post(
            "/api/team/update-location", // Your backend endpoint
            data,
            config
          );
        });
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    // Initial call to update location immediately
    updateLocation();

    // Set interval for every 5 minutes (300,000 ms)
    const intervalId = setInterval(updateLocation, 300000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
  }, []); // Empty dependency array ensures it runs only once on mount
  useEffect(() => {
    // log them out and divert to other page if team has completed their game 
    console.log("sjdhbf")
    if(documentData.team?.gameStatus === "COMPLETED" || documentData.team?.gameStatus === "STOPPED"){
      // add some loggout animation or transition
      logout();
      navigate(`/leaderboard/${documentData.team?.huntId}`);
    }

  }, [documentData.team?.gameStatus, documentData.team?.huntId, logout, navigate]);

  function handleQr(id: string) {
    const particularQuestion = documentData.progress?.questionSet.find(
      (question) => question.id === id
    );
    if (particularQuestion.status === "PENDING") {
      console.log(particularQuestion.status);
      setFocus(id);
      setOpenDialog(true);
    }
  }

  function onSuccessScan(result: IDetectedBarcode[]) {
    console.log("scanned");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
    const data = {
      location: location,
      questionId: focusId,
      hash: result[0].rawValue,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    axios.defaults.withCredentials = true;
    // loading circle
    axios
      .post("/api/team/validate", data, config)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          //  Show a tost for correct answer and close scanner
          setOpenDialog(false); //close scanner
        } else {
          console.error("Error registering team:", response.data);
          // Handle errors gracefully (e.g., display error message to user)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[380px]">
          <DialogHeader>
            <DialogTitle>Team Name</DialogTitle>
            <DialogDescription>Scan to login.</DialogDescription>
          </DialogHeader>
          <div className={classes["qr-scanner-container"]}>
            <>
              <Scanner
                onScan={onSuccessScan}
                scanDelay={2000}
                components={{ onOff: true }}
                styles={{
                  video: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                }} // Full-screen video
                constraints={{
                  aspectRatio: 1, // You can manipulate this aspect ratio
                  facingMode: "environment",
                }}
              />
            </>
          </div>
        </DialogContent>
      </Dialog>
      <Timer initialTimestamp={startTime} />
      <h1><TruncateText text={documentData.team?.teamName} maxLength={26} /></h1>
      <Label>
        Remaining Challanges:{" "}
        {documentData.progress?.numberOfQuestions -
          documentData.progress?.numberOfSolvedQuestions}
      </Label>
      <br />
      Main game page where a player spends most of the time <br /> Questions,
      timer, Score, TeamName
      <br />
      <br />
      {documentData.progress?.questionSet.map((eachQuestion, index: number) => (
        <div key={index} className="mt-4">
          <Card>
            <CardHeader className="">
              <div className="flex justify-between mt-0">
                <h2 className="">{eachQuestion.text}</h2>
                <div
                  onClick={() => {
                    handleQr(eachQuestion.id);
                  }}
                >
                  {eachQuestion.status === "PENDING" ? (
                    <BiScan size="2em" />
                  ) : (
                    <SiTicktick size="1.7em" color="lime" />
                  )}
                </div>
              </div>
            </CardHeader>
            {/* <CardContent className="pb-2"></CardContent> */}
          </Card>
        </div>
      ))}
    </div>
  );
}
export default MainPage;
