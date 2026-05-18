import type { Bookmarks } from "@/entities/bookmark/model/types";

const useControls = (
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks[]>>,
) => {
  const addBookmark = (bookmarkData: {
    title: string;
    url: string;
    notes: string;
    tags: string[];
  }) => {
    setBookmarks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: bookmarkData.title,
        url: bookmarkData.url,
        notes: bookmarkData.notes,
        tags: bookmarkData.tags,
      },
    ]);
  };
  const deleteBookmark = (bookmarkId: string) => {
    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark.id !== bookmarkId),
    );
  };

  const editBookmark = (
    bookmarkId: string,
    url: string,
    title: string,
    notes: string,
    tags: string[],
  ) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === bookmarkId
          ? { ...bookmark, url, title, notes, tags }
          : bookmark,
      ),
    );
  };
  return { addBookmark, deleteBookmark, editBookmark };
};

export default useControls;
