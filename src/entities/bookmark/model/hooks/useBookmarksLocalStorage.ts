import type { Bookmarks } from "../types";

const useBookmarksLocalStorage = () => {
  const saved = localStorage.getItem("bookmarks");
  const saveBookmarks = (bookmarks: Bookmarks[]) => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };
  return {
    saved: saved ? JSON.parse(saved) : null,
    saveBookmarks,
  };
};

export default useBookmarksLocalStorage;
