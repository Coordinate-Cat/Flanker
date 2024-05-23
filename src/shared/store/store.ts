import { create } from "zustand";
import { persist } from "zustand/middleware";

// Store state type
interface StoreState {
  sideMenuView: boolean;
  setSideMenuView: (value: boolean) => void;
  contentBodyView: boolean;
  setContentBodyView: (value: boolean) => void;
  sideMenuWidth: number;
  setSideMenuWidth: (value: number) => void;
  titlebarView: boolean;
  setTitlebarView: (value: boolean) => void;
  alwaysOnTopView: boolean;
  setAlwaysOnTopView: (value: boolean) => void;
  isPrivacyMode: boolean;
  setIsPrivacyMode: (value: boolean) => void;
  fullContentBodyView: boolean;
  setFullContentBodyView: (value: boolean) => void;
  currentPage: string;
  setCurrentPage: (value: string) => void;
}

// Q. Why the currying?
// A. https://stackoverflow.com/questions/69814018/zustand-typescript-persist-how-to-type-store
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // sideMenu enable or disable
      sideMenuView: true, // initial value
      setSideMenuView: (value: boolean) => set({ sideMenuView: value }),

      // ContentBody enable or disable
      contentBodyView: true,
      setContentBodyView: (value: boolean) => set({ contentBodyView: value }),

      // SideMenu width
      sideMenuWidth: window.innerWidth / 8 - 6,
      setSideMenuWidth: (value: number) => set({ sideMenuWidth: value }),

      // titlebar enable or disable
      titlebarView: false,
      setTitlebarView: (value: boolean) => set({ titlebarView: value }),

      // alwaysOnTop enable or disable
      alwaysOnTopView: false,
      setAlwaysOnTopView: (value: boolean) => set({ alwaysOnTopView: value }),

      // privacy mode
      isPrivacyMode: false,
      setIsPrivacyMode: (value: boolean) => set({ isPrivacyMode: value }),

      // fullContentBody enable or disable
      fullContentBodyView: false,
      setFullContentBodyView: (value: boolean) =>
        set({ fullContentBodyView: value }),

      // current page
      currentPage: "All",
      setCurrentPage: (value: string) => set({ currentPage: value }),
    }),
    {
      name: "layout-settings", // localStorage key
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; // deserialize
        },
        setItem: (name, value) => {
          const serializedValue = JSON.stringify(value); // serialize
          localStorage.setItem(name, serializedValue);
        },
        removeItem: (name) => {
          localStorage.removeItem(name); // remove
        },
      },
    },
  ),
);
