import { create } from "zustand";
import { State, Action } from "./types";

const initialUserState: State = {
  id: "",
  ownerUserId: "",
  hideVotes: true,
  users: [],
  currentTask: { id: '', name: '', points: 0 },
  votedTasks: []
};

export const roomStore = create<State & Action>((set) => ({
  ...initialUserState,

  updateRoom: (data) =>
    set((state) => {
      return { ...state, ...data };
    }),
  resetVotes: () =>
    set((state) => {
      return {
        ...state,
        hideVotes: true,
        users: state.users.map((user) => ({ ...user, vote: null })),
      };
    }),
  addUser: (data) =>
    set((state) => {
      return { ...state, users: [...state.users, { ...data, vote: null }] };
    }),
  removeUser: (id) =>
    set((state) => {
      return { ...state, users: state.users.filter((user) => user.id !== id) };
    }),
}));
