import { useNavigate } from "react-router-dom";

function GetReady() {
  const navigate = useNavigate();
  function handleButtonClick() {
    // after some transition like 3,2,1. and logo animation
    navigate("/game/play");
  }
  return (
    <div>
      Important instructions and rules. about game.
      <br />
      <button onClick={handleButtonClick}>Start Game </button>
    </div>
  );
}
export default GetReady;
