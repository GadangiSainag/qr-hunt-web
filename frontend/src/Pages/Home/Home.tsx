import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import MarkDownComponent from "@/Components/Markdown/MarkDownComponent";
import aboutText from "../../content/about.md";
import instructionsText from "../../content/instructions.md";
import registerText from "../../content/register.md";


// Add custom type declarations here


function Home() {
  const navigate = useNavigate();
  
  function handleLogin(){
    
    navigate("/team/login");
  }
  return (
    <div>
      About the game, intresting background Game rules Link to Whatsapp Group
      Link to Register Play Game
      <section className="mb-12">
        <MarkDownComponent content={aboutText} />
      </section>
      <section className="mb-12">
        <MarkDownComponent content={instructionsText} />
      </section>
      <section className="mb-12">
        <MarkDownComponent content={registerText} />
      </section>

    <Button onClick={handleLogin}>Player Login</Button>
    </div>
  );
}

export default Home;
