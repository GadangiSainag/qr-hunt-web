import { Label } from "@radix-ui/react-label";
import { Separator } from "./ui/separator";


const PlayerList = ({ players }: { players: string[] | undefined }) => {
  if (!players || players.length === 0) return null;

  return (
    <div className="flex flex-row justify-evenly">
      {players.flatMap((player, index) => [
        <Label key={`player-${index}`} className="">
          {player}
        </Label>,
        index < players.length - 1 && (
          <Separator
            key={`separator-${index}`}
            orientation="vertical"
            className="mx-2"
           
          />
        ),
      ])}
    </div>
  );
};

export default PlayerList;
