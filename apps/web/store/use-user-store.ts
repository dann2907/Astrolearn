import { create } from "zustand";

import { mockUser } from "@/lib/constants/mock-user";
import type { UserData } from "@/types/user";

interface UserStore {
  userData: UserData;
  addXp: (amount: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: mockUser,
  addXp: (amount) =>
    set((state) => ({
      userData: { ...state.userData, xp: state.userData.xp + amount },
    })),
}));
