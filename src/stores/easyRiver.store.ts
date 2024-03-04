import { defineStore } from 'pinia';

interface State {
  bookmarks: Bookmark[];
}

export const useEasyRiverStore = defineStore('easyRiver', {
  state: (): State => {
    return {
      bookmarks: [],
    };
  },
  getters: {
    isBookmarked: (state) => {
      return (idstazione: string) =>
        state.bookmarks.find((bookmark) => bookmark.idstazione === idstazione);
    },
    bookmarkCount: (state) => state.bookmarks.length,
  },
  actions: {
    addBookmark(idstazione: string) {
      this.bookmarks.push({ idstazione, createdAt: new Date() });
    },
    removeBookmark(idstazione: string) {
      const indexToDelete = this.bookmarks.findIndex(
        (bookmark) => bookmark.idstazione === idstazione,
      );

      this.bookmarks.splice(indexToDelete, 1);
    },
  },
});
