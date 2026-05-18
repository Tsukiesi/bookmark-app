import { createContext, useContext } from "react";
import type { DataContextType } from "@/entities/bookmark/model/types";

import useBookmarksState from "@/entities/bookmark/model/hooks/useBookmarksState";
import useControls from "@/features/bookmark-management/model/hooks/useControls";
import useSearch from "@/features/bookmark-search//useSearch";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within DataProvider");
  }

  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { bookmarks, setBookmarks } = useBookmarksState();
  const controls = useControls(setBookmarks);
  const search = useSearch(bookmarks);
  return (
    <DataContext.Provider
      value={{ bookmarks, setBookmarks, ...controls, ...search }}
    >
      {children}
    </DataContext.Provider>
  );
};
