export interface Question {
  id: string;
  questionText: String;
  hint: String;
}

export interface TeamAuthInput {
  huntId : String;
  teamId: string;
  teamName: string;
  questionSet: String[];
  
}
export interface TeamData extends TeamAuthInput{
  hash : String;
}
