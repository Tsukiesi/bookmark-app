import type { BookmarkData, Bookmarks } from "@/entities/bookmark/model/types";

const useControls = (
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks[]>>,
) => {
  const addBookmark = ({ title, url, notes, tags }: BookmarkData) => {
    setBookmarks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: title,
        url: url,
        notes: notes,
        tags: tags,
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
    { title, url, notes, tags }: BookmarkData,
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
