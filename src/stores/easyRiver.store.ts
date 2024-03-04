import { defineStore } from 'pinia';

interface State {
  bookmarks: Ref<Bookmark[]>;
  bookmarkFilter: Ref<boolean>;
}

export const useEasyRiverStore = defineStore('easyRiver', {
  state: (): State => ({
    bookmarks: useLocalStorage<Bookmark[]>('easyRiver/bookmarks', []),
    bookmarkFilter: useLocalStorage<boolean>('easyRiver/bookmarkFilter', false),
  }),
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
    toggleBookmarkFilter() {
      this.bookmarkFilter = !this.bookmarkFilter;
    },
  },
});
