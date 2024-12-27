import ListAllTeams from "../../Components/ListAllTeams";
import RegisterTeam from "./RegisterTeam";

export default function TeamsTab() {
  return (
    <div>
      <ListAllTeams />
      <div className="mt-4"></div>
      <RegisterTeam />
    </div>
  );
}
