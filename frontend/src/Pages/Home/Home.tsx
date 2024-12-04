import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function handleLogin(){
    
    navigate("/team/login");
  }
  return (
    <div>
      About the game, intresting background Game rules Link to Whatsapp Group
      Link to Register Play Game
      
    <Button onClick={handleLogin}>Player Login</Button>
    </div>
  );
}

export default Home;
