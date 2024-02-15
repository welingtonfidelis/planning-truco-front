import { create } from "zustand";
import { State, Action } from "./types";

const initialUserState: State = {
  id: '',
  name: "",
};

export const userStore = create<State & Action>((set) => ({
  ...initialUserState,

  updateUser: (data) =>
    set((state) => {
      return { ...state, ...data };
    }),
  clearUser: () => set(() => initialUserState),
}));
