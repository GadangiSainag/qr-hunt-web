import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";

const QrScanner = () => {
    // const id = 'a3';
  function onSuccessScan(result: IDetectedBarcode[]) {
    // qr raw data as string

    console.log(result[0].rawValue);
    
    const scannedData =  JSON.parse(result[0].rawValue)
    
    
    const data = {
        "id": scannedData.id,
        "hash": scannedData.hash
    }
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    axios.defaults.withCredentials = true;
    axios.post('/api/validateScan', data, config)
  .then(response => {
    console.log(response);

  })
  .catch(error => {
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
      <Scanner onScan={onSuccessScan}  scanDelay={2000}styles={{finderBorder:30, container:{width:'100vw'}}} components={{onOff: true, finder:true, audio:true}}/>
    </div>
  );
};

export default QrScanner;
