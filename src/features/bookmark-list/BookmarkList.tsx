import { type Bookmarks } from "@/entities/bookmark/model/types";
import { useBookmarkDataContext } from "@/features/bookmark-management";
import BookmarkCard from "./BookmarkCard";

const BookmarkList = () => {
  const { bookmarks, filteredBookmarks } = useBookmarkDataContext();

  return (filteredBookmarks ?? bookmarks).map((bookmark: Bookmarks) => (
    <BookmarkCard
      key={bookmark.id}
      id={bookmark.id}
      title={bookmark.title}
      url={bookmark.url}
      notes={bookmark.notes}
      tags={bookmark.tags}
    />
  ));
};

export default BookmarkList;
