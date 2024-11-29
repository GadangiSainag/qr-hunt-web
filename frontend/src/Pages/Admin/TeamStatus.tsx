import { MapLink } from "@/Components/Map/MapLink";
import { IProgress, ITeam } from "@/context/AdminProvider";
import { useFirestoreData } from "@/context/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toggle } from "@/Components/ui/toggle";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import GameStatusBadge from "@/Components/GameStatusBadge";

export default function TeamStatus() {
  const { teamId } = useParams();
  const { collectionData } = useFirestoreData();
  const [teamData, setData] = useState<ITeam>();
  const [teamprogress, setProgress] = useState<IProgress>();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setProgress(
      collectionData.progress?.find(
        (teamProgress: IProgress) => teamProgress.id === teamId
      )
    );
    setData(collectionData.teams?.find((team: ITeam) => team.id === teamId));
  }, [collectionData.progress, collectionData.teams, teamData, teamId]);

  function finishGame( mode: "STOP" | "FINISH") {
    const data = {
      teamId: teamId,
      mode: mode,
      hash : 'kashdgkufH'
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    axios.defaults.withCredentials = true;
    // loading circle
    axios
      .post("/api/admin/team-end", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
 
  return (
    <div className="w-full">
      <h1>{teamData?.teamName}</h1>
      <div className="mt-8 mb-8 flex justify-evenly">
        {teamData?.players.map((player) => (
          <label>{player} </label>
        ))}
      </div>
      <div>
      < GameStatusBadge gameStatus={teamData?.gameStatus} />
      </div>

      <p className="bg-inherit">Questions</p>

      <div className="p-4">
        {teamprogress?.questionSet.map((question) => (
          <div className="bg-slate-800-0 mt-4 pb-4 pt-4 rounded-sm flex flex-col items-start w-full">
            <div className="flex flex-col items-start ml-4 ">
              <h5 className="">{question.text}</h5>

              <div className="flex flex-row items-center">
                {question.status === "SOLVED" ? (
                  <span className="w-2 h-2 ml-1 mr-1 bg-green-500 rounded-md"></span>
                ) : (
                  <span className="w-2 h-2 ml-1 mr-1 bg-red-700 rounded-md"></span>
                )}

                <label className="text-sm text-gray-500">
                  {question.status}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-evenly mt-8">
        <div className="">
          <MapLink
            latitude={teamprogress?.lastSeenAt._lat}
            longitude={teamprogress?.lastSeenAt._long}
          />
        </div>

        <div>
          <Button variant="ghost" className="bg-lime-700" onClick={()=> finishGame("FINISH")}>
            Validate
          </Button>
        </div>

        <div className="">
          <Button variant="ghost" onClick={()=> finishGame("STOP")}>End</Button>
        </div>
      </div>

      <div className="mt-4">
        <Toggle
          size="lg"
          aria-label="Toggle Help"
          onPressedChange={() => {
            setIsEnabled(!isEnabled);
          }}
        >
          <strong className="text-red-600">HELP Team?</strong>
        </Toggle>
        {isEnabled && "truw"}
      </div>
    </div>
  );
}
