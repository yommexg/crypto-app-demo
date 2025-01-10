import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Session, User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
  isLoggedIn: Boolean;
  setIsLoggedIn: (isLoggedIn: Boolean) => void;
  isOnboarded: Boolean;
  setIsOnboarded: (isOnboarded: Boolean) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      isOnboarded: false,
      setUser: (user: User | null) => set(() => ({ user })),
      setSession: (session: Session | null) => set(() => ({ session })),
      setIsLoggedIn: (isLoggedIn: Boolean) => set(() => ({ isLoggedIn })),
      setIsOnboarded: (isOnboarded: Boolean) => set(() => ({ isOnboarded })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
