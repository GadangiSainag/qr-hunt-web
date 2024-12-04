import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  interface Team {
      teamName: string;
      duration: number;
      durationString:string;
      startTime: string;
      endTime: string;
      gameStatus: string;
      batchId: string;
      players: string[];
    }
  export function GlobalLeaderboard() {
      const {batchId} = useParams();
    
    const [teamArre, setTeamArre] = useState<Team[]>();
   const [notFoundStatus, setNotFound] = useState(false);
    
  
    useEffect(()=>{
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      axios.defaults.withCredentials = true;
    
      axios
      .get(`/api/leaderboard/global` , config)
      .then((response) => {
        console.log(response.data);
        setTeamArre(response.data.leaderboard)
      })
      .catch((error) => {
        console.log(error)
        setNotFound(true);
      });
    },[batchId]);
  if(notFoundStatus){
    return(
      <div>NOT FOUND</div>
    )
  }
    return (
      <div>
          <h1>{batchId}</h1>
        <Table>
          <TableCaption>Congratulations to all the Teams 🎉</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Rank</TableHead>
              <TableHead className="text-center">Team</TableHead>
              
              <TableHead className="min-w-12">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamArre?.map((eachTeam, index:number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell className="text-left">{eachTeam.teamName}</TableCell>
                
                <TableCell className="text-right">
                  {eachTeam.durationString}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">hello</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
  