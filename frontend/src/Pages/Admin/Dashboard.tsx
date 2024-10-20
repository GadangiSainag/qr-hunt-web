import { Link } from "react-router-dom";

export default function Dashboard() {
  return <div>
    Admin dashboard
    - Edit Teams , add, edit teams
    - Leaderboard 
    - Questions , add edit questions, create all qrs questions
    <Link to={'/information'}/>

    </div>;
}
