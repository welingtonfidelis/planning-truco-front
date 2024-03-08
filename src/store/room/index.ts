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
  scale: []
};

export const roomStore = create<State & Action>((set) => ({
  ...initialUserState,

  updateRoom: (data) =>
    set((state) => {
      return { ...state, ...data };
    }),

  showUserVotes: (taskPoints) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === state.currentTaskId) {
          return {
            ...task,
            points: taskPoints,
          };
        }

        return task;
      });

      return {
        ...state,
        showVotes: true,
        tasks: updatedTasks,
      };
    }),

  resetVotes: () =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === state.currentTaskId) {
          return {
            ...task,
            points: 0,
          };
        }

        return task;
      });

      const updatedUsers = state.users.map((user) => ({ ...user, vote: null }));

      return {
        ...state,
        showVotes: false,
        tasks: updatedTasks,
        users: updatedUsers,
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

  updateCurrentTask: (taskId) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => ({ ...user, vote: null }));

      return {
        ...state,
        showVotes: false,
        currentTaskId: taskId,
        users: updatedUsers,
      };
    }),
  removeTask: (taskId) =>
    set((state) => {
      let currentTaskId = state.currentTaskId;
      let users = state.users;

      if (state.currentTaskId === taskId) {
        currentTaskId = '';
        users = users.map((user) => ({ ...user, vote: null }));
      }

      return {
        ...state,
        currentTaskId,
        users,
        tasks: state.tasks.filter((task) => task.id !== taskId),
      };
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
