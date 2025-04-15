import { useEffect, useState } from "react";
import Timer from "../../Components/Timer/Timer";
import { useAuth, usePlayerData } from "../../context/hooks";
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
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "@/lib/axiosAuthApi";

function MainPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [focusId, setFocus] = useState("");
  const [startTime, setStartTime] = useState<number>(Date.now());
  const { documentData } = usePlayerData();
  const [dialogOpen, setOpenDialog] = useState(false);
  const [clueText, setClueText] = useState("Clue");
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

          // Make API call to backend with user's location
          await authApi.post("/api/team/update-location", data);
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
        const data = { startAt: mountedTime };
        authApi
          .post("/api/game/start", data)
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
    console.log("sjdhbf");
    if (
      documentData.team?.gameStatus === "COMPLETED" ||
      documentData.team?.gameStatus === "STOPPED"
    ) {
      // add some loggout animation or transition
      logout();
      navigate(`/leaderboard/${documentData.team?.huntId}`);
    }
  }, [
    documentData.team?.gameStatus,
    documentData.team?.huntId,
    logout,
    navigate,
  ]);

  function handleQr(id: string) {
    const particularQuestion = documentData.progress?.questionSet.find(
      (question) => question.id === id
    );
    if (particularQuestion.status === "PENDING") {
      console.log(particularQuestion.status);
      setFocus(id);
      setClueText(particularQuestion.text);
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

    // loading circle
    authApi
      .post("/api/team/validate", data)
      .then((response) => {
        if (response.status === 200) {
          //  Show a tost for correct answer and close scanner
          setOpenDialog(false); //close scanner
          // Show a success toast message
          toast.success("Correct Answer", {
            className: "w-[20rem]",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      })
      .catch((error) => {
        console.error("wrong answer", error.response.data);
        // Handle errors gracefully (e.g., display error message to user)
        setOpenDialog(false); //close scanner
        toast.error("Incorrect Answer! Try again.", {
          className: "w-[20rem]",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[380px]">
          <DialogHeader>
            <DialogTitle>{clueText}</DialogTitle>
            <DialogDescription>Scan to Validate.</DialogDescription>
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
      <h1>
        <TruncateText text={documentData.team?.teamName} maxLength={26} />
      </h1>
      <Label className="text-right">
        Remaining Challanges:{" "}
        {documentData.progress?.numberOfQuestions -
          documentData.progress?.numberOfSolvedQuestions}
      </Label>
      <br />
      <ToastContainer />
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
