import { User } from "./user";

interface UserRoom extends User {
  vote?: number | null;
}

interface Task {
  name: string;
  points: number;
}

export interface Room {
  id: string;
  ownerUserId: string;
  users: UserRoom[];
  hideVotes: boolean;
  currentTask?: Task;
  votedTasks: Task[];
}
