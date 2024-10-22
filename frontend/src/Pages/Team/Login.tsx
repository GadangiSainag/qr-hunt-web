import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const TeamLogin = () => {
  const navigate = useNavigate();
  function onSuccessScan(result: IDetectedBarcode[]) {
    // qr raw data as string
    console.log(result[0].rawValue);

    // const scannedData = JSON.parse(result[0].rawValue);

    const data = {
      // teamId: scannedData.teamId,
      // hash: scannedData.teamHash,
      message: result[0].rawValue,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.defaults.withCredentials = true;
    axios
      .post("/api/team/test", data, config)
      .then((response) => {
        if (response.status === 200) {
          // team will get a token from server,

          // token will be stored here

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
    <div
      style={{
        width: "100vw",
        padding: "0px",
        margin: "0px",
        borderColor: "red",
        borderWidth: "10px",
      }}
    >
      <Scanner
        onScan={onSuccessScan}
        allowMultiple={true}
        scanDelay={2000}
        styles={{ finderBorder: 30 }}
        components={{ onOff: true, finder: true, audio: true }}
      />
    </div>
  );
};

export default TeamLogin;
