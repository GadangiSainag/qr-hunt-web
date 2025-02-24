import { useNavigate } from "react-router-dom";
import {  usePlayerData } from "../../context/hooks";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import TruncateText from "@/Components/TruncateText";
export interface ITeamVisibleData {
  id: string;
  teamName: string;
  players: string[];
  huntId: string;
  gameStatus: string;


}
function GetReady() {
  const navigate = useNavigate();
  const { documentData ,loading} = usePlayerData();
  function handleButtonClick() {
    // after some transition like 3,2,1. and logo animation

    navigate("/game/play"); 
  }

  console.log(documentData.team);
  if (loading) {
    return (
      <div>
        <p>Anytime this game gets buggy, do a quick refresh.</p> <br/>
        <p>Now lets do a <strong>page refresh</strong> to get your details.</p>
      </div>
        
  ); // Render loading state until data is ready
  }

  return (
    <div>
      Important instructions and rules. about game.
      <h1><TruncateText text={documentData.team?.teamName} maxLength={26} /> </h1>
      <br />
      <h2>Players</h2>
      {documentData.team && documentData.team?.players.map((player: string, index: number) => (
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
