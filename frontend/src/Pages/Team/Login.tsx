import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { useAuth } from "../../context/util";

const TeamLogin = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [isInvalid, setInvalidStatus] = useState(false);
  const [warningMessage, setWarningMessage] = useState("Do a quick Scan practice.");

  const { login } = useAuth();
  const navigate = useNavigate();

  // Function to toggle the QR scanner
  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  // Function to handle scan success
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
            setInvalidStatus(false); // Valid scan, so green color
            setScanning(false);

            // Team will get a token from the server
            login(response.data.accessToken);

            // Redirect to ready page
            setRedirecting(true);
            setTimeout(() => {
              navigate("/game/ready");
            }, 2000);
          }
          console.log(response);
        })
        .catch((error) => {
          setInvalidStatus(true); // Invalid scan, so red color
          setWarningMessage("Invalid Scan, try again.");
          console.error(error);
        });
    } catch {
      setInvalidStatus(true); // If an error occurs, it's an invalid scan
      setWarningMessage("Invalid Scan.");
    }
  }

  // Update stroke color to white when the scanner is opened
  useEffect(() => {
    if (showScanner) {
      // Select all <path> elements inside the SVG
      const paths = document.querySelectorAll("svg path");

      // Set the stroke color to white when the scanner is opened
      paths.forEach((path) => {
        path.setAttribute("stroke", "rgba(255, 255, 255, 1)");
      });
    }
  }, [showScanner]); // Runs when the scanner is toggled

  // Update stroke color based on scan validity (green for valid, red for invalid)
  useEffect(() => {
    const paths = document.querySelectorAll("svg path");

    paths.forEach((path) => {
      path.setAttribute(
        "stroke",
        isInvalid ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 0, 1)"
      );
    });
  }, [isInvalid]); // Runs when isInvalid changes

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
                  container: { stroke: "green" },
                  video: { width: "100%", height: "100%", objectFit: "cover" },
                }} // Full-screen video
                constraints={{
                  aspectRatio: 1, // You can manipulate this aspect ratio
                  facingMode: "environment",
                }}
              />
            )}
            <button className={classes["toggle-button"]} onClick={toggleScanner}>
              {showScanner ? "Hide Camera" : "Open Camera"}
            </button>
          </>
        )}
      </div>

      <div className={classes.warning} style={{ color: isInvalid ? "red" : "green" }}>
        {warningMessage}
      </div>
    </div>
  );
};

export default TeamLogin;