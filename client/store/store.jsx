// /store/store.jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAnimeStore = create((set, get) => ({
  animeList: [],
  addAnimeList: (anime) => {
    set((state) => {
      const existingAnime = get().animeList;
      const isAnimeExists = existingAnime.some((item) => item.id === anime.id);
      if (!isAnimeExists) {
        const updatedAnimeList = [...state.animeList, anime];
        return { animeList: updatedAnimeList };
      }
      return state;
    });
  },
}));

export default useAnimeStore;
