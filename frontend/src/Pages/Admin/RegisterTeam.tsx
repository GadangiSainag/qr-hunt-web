import axios from "axios";
import React, { useState } from "react";
import Qr from "../../Components/Qr";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/Components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

// import style from './login.module.css'
const RegisterTeam = () => {
  const [dialogOpen, setOpenDialog] = useState(false);
  const [drawerOpen, setOpenDrawer] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState("");
  const [huntId, setHuntId] = useState("Game");
  const [questions, setQuestions] = useState("");
  const [qrData, setQrData] = useState(""); // State for QR code data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      players: players.trim(),
      teamName: teamName.trim(),
      huntId: huntId.trim(),
      questions: questions.trim(),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    axios.defaults.withCredentials = true;
    setOpenDrawer(false);
    axios
      .post("/api/admin/team", data, config)
      // .post("/api/admin/dummy", data, config)
      .then((response) => {
        console.log(response.data);

        // Update QR code data only if the response is successful (e.g., status code 200)
        if (response.status === 200) {
          const qrString = JSON.stringify(response.data); // Consider including relevant data from response
          setQrData(qrString);
          setOpenDialog(true);
        } else {
          console.error("Error registering team:", response.data);
          // Handle errors gracefully (e.g., display error message to user)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // useEffect hook to update QR code data on successful response (optional)

  return (
    <div>
      <Drawer open={drawerOpen} onOpenChange={setOpenDrawer}>
        <DrawerTrigger>Join a Team 🏴‍☠️</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Register Team Here</DrawerTitle>
            <DrawerDescription>(Only for admin)</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="items-center p-8 pt-0">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Team Name</Label>
              <Input
                placeholder="Try something creative"
                required={true}
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <br />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>PLayers</Label>
              <Input
                placeholder="John, Sena"
                required={true}
                type="text"
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
              />
            </div>
            <br />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Hunt Id</Label>
              <Input
                required={true}
                type="text"
                value={huntId}
                onChange={(e) => setHuntId(e.target.value)}
              />
            </div>
            <br />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Questions</Label>
              <Input
                placeholder="a1,a2,a3,a4,a5"
                required={true}
                type="text"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              />
            </div>
            <br />
            <DrawerFooter>
              <Button type="submit" variant="secondary">Add Pirates ☠️</Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>

      <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[380px]">
          <DialogHeader>
            <DialogTitle>Team Name</DialogTitle>
            <DialogDescription>Scan to login.</DialogDescription>
          </DialogHeader>
          <div>{qrData && <Qr qrData={qrData} qrSize={280} />}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterTeam;
