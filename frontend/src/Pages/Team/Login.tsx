import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { useAuth } from "../../context/util";
const TeamLogin = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [isInvalid, setInvalidStatus] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Scan to Login");
  const { login } = useAuth();

  const navigate = useNavigate();

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };
  function onSuccessScan(result: IDetectedBarcode[]) {
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
        if (response.status != 200) {
          setInvalidStatus(true);
          setWarningMessage(
            "Wrong QR, contact GAME Organizer in case of an issue."
          );
        } else {
          setScanning(false);
          setRedirecting(true);
          // team will get a token from server,
          login(response.data.accessToken);
          // redirect to ready page
          navigate("/game/ready");
        }
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(result);
    // setScannerPasued(true);
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
      {isInvalid && (
        <div className={classes.warning} style={{ color: "red" }}>
          {warningMessage}
        </div>
      )}
    </div>
  );
};

export default TeamLogin;
