import { create } from "zustand";
import { State, Action } from "./types";

const initialUserState: State = {
  socket: null,
};

export const socketStore = create<State & Action>((set) => ({
  ...initialUserState,

  createSocketConnection: (data) =>
    set((state) => {
      return { ...state, socket: data };
    }),

  destroySocketConnection: () =>
    set((state) => {
      state.socket?.disconnect();

      return { ...state, socket: null };
    }),
}));
