import { create } from "zustand";
import { State, Action } from "./types";

const initialUserState: State = {
  id: "",
  ownerUserId: "",
  hideVotes: true,
  users: [],
  currentTaskId: "",
  tasks: [],
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

  addTask: (data) =>
    set((state) => {
      return { ...state, tasks: [...state.tasks, data] };
    }),

  removeTask: (id) =>
    set((state) => {
      return { ...state, tasks: state.tasks.filter((user) => user.id !== id) };
    }),
}));
