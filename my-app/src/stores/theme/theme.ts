

import { create } from "zustand";
import ThemeState from '@/types/ui.types.ts'

export const useThemeStore = create<ThemeState>((set) => ({

//   theme: (localStorage.getItem("theme") as 'dark' | 'dark') || "dark",
theme:'dark',

  toggleTheme: () =>
    set((state) => {
      const newTheme: Theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  }

}));
