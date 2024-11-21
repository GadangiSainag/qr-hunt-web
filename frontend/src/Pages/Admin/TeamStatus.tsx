import { MapLink } from "@/Components/Map/MapLink";
import { IProgress, ITeam } from "@/context/AdminProvider";
import { useFirestoreData } from "@/context/hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function TeamStatus() {
  const {teamId} = useParams();
  const { collectionData } = useFirestoreData();
  const [teamData, setData] = useState<ITeam>();
  const [teamprogress, setProgress] = useState<IProgress>();


   useEffect(()=> {
    setProgress(collectionData.progress?.find(
      (teamProgress : IProgress) => teamProgress.id === teamId
    ))
    setData(collectionData.teams?.find(
        (team : ITeam) => team.id === teamId
      ))
   },[collectionData.progress, collectionData.teams, teamData, teamId])

  return (
    <div>
      <h1>{teamData?.teamName}</h1>
      {teamData?.players.map((player)=>(
        <p>{player}</p>
      ))}
      {teamprogress?.questionSet.map((question)=>(
        <div>

        <p>{question.text}</p>
        
        </div>
      ))}
      <MapLink latitude={teamprogress?.lastSeenAt._lat} longitude={teamprogress?.lastSeenAt._long} />
      Delete
      
    </div>
  );
}
