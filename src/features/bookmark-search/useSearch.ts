import type { Bookmarks } from "@/entities/bookmark/model/types";
import { useState } from "react";
const useSearch = (bookmarks: Bookmarks[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const clearSearchQuery = searchQuery.trim().toLowerCase();
  const filteredBookmarks =
    clearSearchQuery.length > 0
      ? bookmarks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  const isSearchEmpty = filteredBookmarks?.length === 0;
  return {
    searchQuery,
    setSearchQuery,
    filteredBookmarks,
    isSearchEmpty,
  };
};

export default useSearch;
