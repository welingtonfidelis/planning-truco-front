import { Room } from "../../domains/room";
import { Task } from "../../domains/task";
import { User } from "../../domains/user";

export type State = & Room;

export type Action = {
  updateRoom: (data: Partial<Room>) => void;
  addUser: (data: User) => void;
  removeUser: (id: string) => void;
  resetVotes: () => void;
  addTask: (data: Task) => void;
  removeTask: (id: string) => void;
  userVoteTask: (userId: string, vote: number) => void;
  updateUserProfile: (userId: string, data: Partial<User>) => void;
};
