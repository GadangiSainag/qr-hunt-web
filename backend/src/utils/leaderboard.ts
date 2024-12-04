import { db } from "../config/db";

interface Team {
  teamName: string;
  duration: number;
  durationString: string;
  startTime: string;
  endTime: string;
  gameStatus: string;
  batchId: string;
  players: string[];
}

export const getBatchLeaderboard = async (gameId: string): Promise<Team[]> => {
  const teamsRef = db.collection("allTeams");
  const snapshot = await teamsRef.where("huntId", "==", gameId).get();

  if (snapshot.empty) {
    throw new Error("No teams found for this hunt.");
  }

  const teams: Team[] = [];

  const extractTeam = (data: any): Team => ({
    teamName: data.teamName,
    duration: data.duration,
    durationString: data.durationString,
    startTime: data.startTime,
    endTime: data.endTime,
    gameStatus: data.gameStatus,
    batchId: data.huntId,
    players: data.players,
  });

  snapshot.forEach((doc) => {
    teams.push(extractTeam(doc.data()));
  });

  // Sort teams: Completed first by duration (ascending), then playing teams at the bottom
  return teams.sort((a, b) => {
    if (a.gameStatus === "COMPLETED" && b.gameStatus === "COMPLETED") {
      return a.duration - b.duration; // Ascending order of duration
    } else if (a.gameStatus === "COMPLETED") {
      return -1; // Completed teams come first
    } else if (b.gameStatus === "COMPLETED") {
      return 1;
    }
    return 0; // Keep playing teams in their order
  });
};
export const getGlobalLeaderboard = async (): Promise<Team[]> => {
  const teamsRef = db.collection("allTeams");
  const snapshot = await teamsRef.where("gameStatus", "==", "COMPLETED").get();

  if (snapshot.empty) {
    throw new Error("No teams found for this hunt.");
  }

  const teams: Team[] = [];

  const extractTeam = (data: any): Team => ({
    teamName: data.teamName,
    duration: data.duration,
    durationString: data.durationString,
    startTime: data.startTime,
    endTime: data.endTime,
    gameStatus: data.gameStatus,
    batchId: data.huntId,
    players: data.players,
  });

  snapshot.forEach((doc) => {
    teams.push(extractTeam(doc.data()));
  });

  // Sort teams: Completed first by duration (ascending), then playing teams at the bottom
  return teams.sort((a, b) => {
    if (a.gameStatus === "COMPLETED" && b.gameStatus === "COMPLETED") {
      return a.duration - b.duration; // Ascending order of duration
    } 
    return 0; // Keep playing teams in their order
  });
};

