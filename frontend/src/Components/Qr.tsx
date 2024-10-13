import { QRCode } from "react-qrcode-logo";
import logo from "../assets/huntlogo_white.svg";
import { QrData } from "../interfaces/types";



export default function Qr(props: QrData) {
  return (
    <div>
      <QRCode
        value={props.qrData}
        size={props.qrSize}
        logoImage={logo}
        removeQrCodeBehindLogo={true}
        logoWidth={props.qrSize * 0.25}
      />
    </div>
  );
}
