export { Bookmark };

declare global {
  interface Bookmark {
    idstazione: string;
    createdAt: Date;
  }
}
