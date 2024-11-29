import { Badge } from "./ui/badge";

const GameStatusBadge = ({
  gameStatus,
}: {
  gameStatus: "IN_GAME" | "COMPLETED" | "STOPPED" | undefined;
}) => {
  const variantMap: Record<
    "IN_GAME" | "COMPLETED" | "STOPPED" | "undefined" | "READY",
    {
      varient: "online" | "secondary" | "destructive" | "default" | "outline";
      text: string;
    }
  > = {
    IN_GAME: { varient: "online", text: "ONLINE" }, // Example variant
    COMPLETED: { varient: "default", text: "DONE" }, // Example variant
    STOPPED: { varient: "destructive", text: "FINISHED" }, // Example variant
    READY: { varient: "secondary", text: "READY" },
    undefined: { varient: "default", text: "" },
  };

  return (
    <Badge variant={variantMap[gameStatus].varient}>
      {variantMap[gameStatus].text}
    </Badge>
  );
};

export default GameStatusBadge;
