export interface IQuestion {
  customId: string;
  difficulty: string;
  questionText: string;
  hint: string;
}

export interface ITeamDetails {
  huntId: String;
  teamName: string;
  players: string;
  questions: string;
}
export interface TeamData {
  hash: string;
  teamId: string;
}
