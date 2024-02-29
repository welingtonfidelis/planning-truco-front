import { create } from "zustand";
import { State, Action } from "./types";

const initialUserState: State = {
  id: "",
  ownerUserId: "",
  isLoggedUserOwnerRoom: false,
  showVotes: false,
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
        showVotes: false,
        users: state.users.map((user) => ({ ...user, vote: null })),
      };
    }),

  addUser: (data) => {
    set((state) => {
      const userExists = state.users.some((user) => user.id === data.id);
      if (userExists) return state;

      return { ...state, users: [...state.users, { ...data, vote: null }] };
    });
  },

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

  userVoteTask: (userId, vote) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            vote,
          };
        }

        return user;
      });

      return { ...state, users: updatedUsers };
    }),

  updateUserProfile: (userId, data) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            ...data,
          };
        }

        return user;
      });
      return { ...state, users: updatedUsers };
    }),
}));
