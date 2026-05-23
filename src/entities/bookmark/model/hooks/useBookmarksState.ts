import useLocalStorage from "@/shared/lib/hooks/useLocalStorage";
import type { Bookmarks } from "@/entities/bookmark/model/types";

const useBookmarksState = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmarks[]>(
    "bookmarks",
    [],
  );
  return {
    bookmarks,
    setBookmarks,
  };
};
export default useBookmarksState;
