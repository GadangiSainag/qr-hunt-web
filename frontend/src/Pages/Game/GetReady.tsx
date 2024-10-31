import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth, usePlayerData } from "../../context/hooks";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
export interface ITeamVisibleData {
  id: string;
  teamName: string;
  players: string[];
  huntId: string;
  gameStatus: string;

  // duration:number;
  // endTime: number | null;
  // hash:string;
  // lastSeenAt: string | null;
  // registeredTime: number;
  // startTime: number | null;
}
function GetReady() {
  const navigate = useNavigate();
  function handleButtonClick() {
    // after some transition like 3,2,1. and logo animation

    navigate("/game/play");
  }

  const { documentData } = usePlayerData();
  console.log(documentData.team);

  return (
    <div>
      Important instructions and rules. about game.
      <h1>{documentData.team?.teamName}</h1>
      <br />
      <h2>Players</h2>
      {documentData.team?.players.map((player: string, index: number) => (
        <div key={index}>
          <Label>{player}</Label>
        </div>
      ))}
      {JSON.stringify(documentData.team)}
      <br />
      <br />
      <div>
        {documentData.team?.gameStatus === "IN_GAME" && <p className="text-lime-400">Continue to game</p>}
      </div>
      <Button variant="secondary" onClick={handleButtonClick}>
        Lets Hunt 🗡️🗺️
      </Button>
    </div>
  );
}
export default GetReady;
