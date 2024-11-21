import { useFirestoreData } from "../context/hooks";
import { IoQrCodeOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import Qr from "./Qr";
import { ITeam } from "@/context/AdminProvider";
import { useNavigate } from "react-router-dom";
import { Label } from "./ui/label";



export default function ListAllTeams() {
  const { collectionData } = useFirestoreData();
  const [dialogOpen, setOpenDialog] = useState(false);
  const [qrData, setQrData] = useState(""); // State for QR code data
  const navigate = useNavigate();
  const [currentName, setCurrentName] = useState(""); // State for QR code data
  
  function handleQr(id: string) {
    const team = collectionData.teams?.find(
      (team : ITeam) => team.id === id
    );

    const qrData = JSON.stringify({id:team.id,password:team.hash});
    setCurrentName(team.teamName)
    setQrData(qrData);
    setOpenDialog(true);
  }

  function navigateToStatusPage(teamId:string){
    navigate(`/admin/team-satus/${teamId}`);
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[380px]">
          <DialogHeader>
            <DialogTitle>{currentName}</DialogTitle>
            <DialogDescription>Scan to login.</DialogDescription>
          </DialogHeader>
          <div>{qrData && <Qr qrData={qrData} qrSize={280} />}</div>
        </DialogContent>
      </Dialog>
      Heres a list of all Teams in database
      {collectionData.teams?.map((team:ITeam, index) => (
        <div key={index} className="mt-4">
          <Card className="flex justify-between items-center w-80">
            <div className=" flex flex-col items-start flex-grow">
            <CardHeader className="pb-3  flex-grow">
              <CardTitle className="hover:cursor-pointer" onClick={() => navigateToStatusPage(team.id)}>{team.teamName} </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 flex flex-row">
              <p className="text-sm text-gray-400">
                {team.players.length} Players
              </p>
              <p>Active</p>
            </CardContent>
            </div>
            <div
              className="z-50 mr-4"
              onClick={() => {
                handleQr(team.id);
              }}
            >
              <IoQrCodeOutline size="1.5em" />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
