import { Button } from "@/Components/ui/button";
import { useAuth } from "@/context/hooks";

export default function Dashboard() {
  const { logout } = useAuth();
  function handleLogout() {
    logout();
  }
  return (
    <div>
      Admin dashboard - Edit Teams , add, edit teams - Leaderboard - Questions ,
      add edit questions, create all qrs questions
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
