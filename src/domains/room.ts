import { Task } from "./task";
import { User } from "./user";

interface UserRoom extends User {
  vote?: number | null;
}

export interface Room {
  id: string;
  ownerUserId: string;
  users: UserRoom[];
  hideVotes: boolean;
  currentTaskId: string;
  tasks: Task[];
}
