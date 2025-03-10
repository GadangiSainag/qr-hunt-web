import { useNavigate } from "react-router-dom";
import {  usePlayerData } from "../../context/hooks";
import { Button } from "@/Components/ui/button";
import TruncateText from "@/Components/TruncateText";
import PlayerList from "@/Components/PlayerList";
import MarkDownComponent from "@/Components/Markdown/MarkDownComponent";
import instructionsText from "../../content/instructions.md";
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
      <h1><TruncateText text={documentData.team?.teamName} maxLength={26} /> </h1>
      <p>Hunt Id : <label className="font-thin">{documentData.team?.huntId}</label></p>
      <br />
      <PlayerList players={documentData.team?.players} />
      <br />
     
      <section className="mb-6">
        <MarkDownComponent content={instructionsText} />
      </section>
      {/* {JSON.stringify(documentData.team)} */}
      <br />
      <br />
      <p>Your timer starts after you click the button.</p>
      <br />
      <Button variant="secondary" onClick={handleButtonClick}>
        Lets Hunt 🗡️🗺️
      </Button>
      <br />
      <div>
        {documentData.team?.gameStatus === "IN_GAME" && <p className="text-lime-400">Continue to game</p>}
      </div>
    </div>
  );
}
export default GetReady;
