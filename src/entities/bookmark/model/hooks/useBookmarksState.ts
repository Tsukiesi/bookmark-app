import { useEffect, useState } from "react";
import useLocalStorage from "@/shared/lib/hooks/useLocalStorage";
import type { Bookmarks } from "@/entities/bookmark/model/types";

const useBookmarksState = () => {
  const [data, setData] = useLocalStorage<Bookmarks[]>("bookmarks", []);
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>(data ?? []);
  useEffect(() => {
    setData(bookmarks);
  }, [bookmarks]);
  return {
    bookmarks,
    setBookmarks,
  };
};
export default useBookmarksState;
