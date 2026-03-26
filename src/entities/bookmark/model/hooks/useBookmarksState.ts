import { useEffect, useState } from "react";
import useBookmarksLocalStorage from "./useBookmarksLocalStorage";
import type { Bookmarks } from "../types";

const useBookmarksState = () => {
  const { saved, saveBookmarks } = useBookmarksLocalStorage();
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>(saved ?? []);
  useEffect(() => {
    saveBookmarks(bookmarks);
    console.log("bookmarks:", bookmarks);
  }, [bookmarks]);
  return {
    bookmarks,
    setBookmarks,
  };
};
export default useBookmarksState;
