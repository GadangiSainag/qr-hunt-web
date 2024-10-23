import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { useAuth } from "../../context/util";
const TeamLogin = () => {
  const [showScanner, setShowScanner] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scanning, setScanning] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const [isInvalid, setInvalidStatus] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Do a quick Scan practice.");

  const { login } = useAuth();

  const navigate = useNavigate();

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };
  function onSuccessScan(result: IDetectedBarcode[]) {
    try {
      console.log(result[0].rawValue);
      const scannedData = JSON.parse(result[0].rawValue);

      const data = {
        teamId: scannedData.id,
        hash: scannedData.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios.defaults.withCredentials = true;

      axios
        .post("/api/team/login", data, config)
        .then((response) => {
          if (response.status === 200) {
            setWarningMessage("Scan Successful.");
            setInvalidStatus(false);
            setScanning(false);
            setRedirecting(true);
            // team will get a token from server,
            login(response.data.accessToken);
            // redirect to ready page

            setTimeout(() => {
              navigate("/game/ready");
            }, 2000);
          }
          console.log(response);
        })
        .catch((error) => {
          setInvalidStatus(true);
          setWarningMessage(
            "Only scan QR Code that is provided for your team."
          );
          console.error(error);
        });
    } catch {
      setInvalidStatus(true);
      setWarningMessage(
        "Wrong QR, contact GAME Organizer in case of an issue."
      );
    }
  }

  return (
    <div>
      <div className={classes["qr-scanner-container"]}>
        {redirecting ? (
          <div className={classes["redirect-message"]}>
            Redirecting to the main page...
          </div>
        ) : (
          <>
            {showScanner && (
              <Scanner
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
            )}
            <button
              className={classes["toggle-button"]}
              onClick={toggleScanner}
            >
              {showScanner ? "Hide Camera" : "Open Camera"}
            </button>
          </>
        )}
      </div>
      
        <div className={classes.warning} style={{ color: isInvalid ? "red": "green" }}>
          {warningMessage}
        </div>
      
    </div>
  );
};

export default TeamLogin;
