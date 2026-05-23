import { createContext, useContext } from "react";
import type { BookmarkDataContextType } from "@/entities/bookmark/model/types";

import useBookmarksState from "@/entities/bookmark/model/hooks/useBookmarksState";
import useControls from "@/features/bookmark-management/model/hooks/useControls";
import useSearch from "@/features/bookmark-search//useSearch";

const BookmarkDataContext = createContext<BookmarkDataContextType | undefined>(
  undefined,
);

export const useBookmarkDataContext = () => {
  const context = useContext(BookmarkDataContext);
  if (!context) {
    throw new Error(
      "useBookmarkDataContext must be used within BookmarkDataProvider",
    );
  }

  return context;
};

export const BookmarkDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { bookmarks, setBookmarks } = useBookmarksState();
  const controls = useControls(setBookmarks);
  const search = useSearch(bookmarks);
  return (
    <BookmarkDataContext.Provider
      value={{ bookmarks, setBookmarks, ...controls, ...search }}
    >
      {children}
    </BookmarkDataContext.Provider>
  );
};
