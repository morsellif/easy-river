import { defineStore } from 'pinia';
import { useLocalStorage, type RemovableRef } from '@vueuse/core';

interface State {
  bookmarks: RemovableRef<Bookmark[]>;
  bookmarkFilter: RemovableRef<boolean[]>;
  search: boolean;
  searchQuery: string;
  disclamierAccepted: RemovableRef<boolean[]>;
}

const _bookmarksKey = 'easyRiver/bookmarks';
const _bookmarkFilterKey = 'easyRiver/bookmarkFilter';
const _disclamierAcceptedKey = 'easyRiver/disclamierAccepted';

export const useEasyRiverStore = defineStore('easyRiver', {
  state: (): State => ({
    bookmarks: useLocalStorage<Bookmark[]>(_bookmarksKey, []),
    bookmarkFilter: useLocalStorage(_bookmarkFilterKey, [false]),
    search: false,
    searchQuery: '',
    disclamierAccepted: useLocalStorage(_disclamierAcceptedKey, [false]),
  }),
  hydrate(state, _initialState) {
    state.bookmarks = useLocalStorage<Bookmark[]>(_bookmarksKey, []).value;
    state.bookmarkFilter = useLocalStorage(_bookmarkFilterKey, [false]).value;
    state.disclamierAccepted = useLocalStorage(_disclamierAcceptedKey, [
      false,
    ]).value;
  },
  getters: {
    isBookmarked: (state) => {
      return (idstazione: string) =>
        state.bookmarks.find((bookmark) => bookmark.idstazione === idstazione);
    },
    bookmarkCount: (state) => state.bookmarks.length,
    filterBookmarks: (state) => state.bookmarkFilter[0],
    bookamrkSet: (state) =>
      new Set(state.bookmarks.map((bookmark) => bookmark.idstazione)),
    showDisclamier: (state) => !state.disclamierAccepted[0],
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
      this.bookmarkFilter[0] = !this.bookmarkFilter[0];
    },
    toggleSearch() {
      this.search = !this.search;
    },
    toggleDisclamier() {
      this.disclamierAccepted[0] = !this.disclamierAccepted[0];
    },
  },
});
