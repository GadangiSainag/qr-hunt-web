import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import { usePlayerData } from "../../context/hooks";
import axios from "axios";
import { ITeamVisibleData } from "./GetReady";
import { Label } from "@/Components/ui/label";
import { Card, CardHeader } from "@/Components/ui/card";
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
function MainPage() {
  // const { id } = useAuth();
  const [teamData, setTeamData] = useState<ITeamVisibleData | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const { documentData } = usePlayerData();
  const [dialogOpen, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(documentData.team);
    if (documentData.team != null) {
      setStartTime(documentData.team.startTime);
    }
  }, [documentData.team]);

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

  function handleQr(id: string) {
    const particularQuestion = documentData.progress?.questionSet.find(
      (question) => question.id === id
    );
    if (particularQuestion.status === "PENDING") {
      console.log(particularQuestion.status);
      setOpenDialog(true)
    }
  }
  function onSuccessScan(result: IDetectedBarcode[]){
    console.log("scanned")
    console.log(result[0].rawValue);
    
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[380px]">
          <DialogHeader>
            <DialogTitle>Team Name</DialogTitle>
            <DialogDescription>Scan to login.</DialogDescription>
          </DialogHeader>
          <Scanner
          allowMultiple={true}
                onScan={onSuccessScan}
                scanDelay={2000}
                styles={{
                  video: { width: "100%", height: "100%", objectFit: "cover" },
                }} // Full-screen video
                constraints={{
                  aspectRatio: 1, // You can manipulate this aspect ratio
                  facingMode: "environment",
                }}
              />
        </DialogContent>
      </Dialog>

      <Timer initialTimestamp={startTime} />
      <h1>{documentData.team?.teamName}</h1>
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
