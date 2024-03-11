import { Room } from "../../domains/room";
import { Task } from "../../domains/task";
import { User } from "../../domains/user";

export type State = & Room;

export type Action = {
  updateRoom: (data: Partial<Room>) => void;
  addUser: (data: User) => void;
  removeUser: (userId: string) => void;
  showUserVotes: (taskPoints: number) => void;
  resetVotes: () => void;
  addTask: (data: Task) => void;
  updateCurrentTask: (taskId: string) => void; 
  removeTask: (taskId: string) => void;
  userVoteTask: (userId: string, vote: string) => void;
  updateUserProfile: (userId: string, data: Partial<User>) => void;
};
