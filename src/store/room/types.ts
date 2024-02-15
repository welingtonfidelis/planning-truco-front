import { Room } from "../../domains/room";
import { User } from "../../domains/user";

export type State = & Room;

export type Action = {
  updateRoom: (data: Partial<Room>) => void;
  addUser: (data: User) => void;
  removeUser: (id: string) => void;
  resetVotes: () => void;
};
