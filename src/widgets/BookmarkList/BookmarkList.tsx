import { type Bookmarks } from "../../entities/bookmark/model/types";
import BookmarkCard from "../../entities/bookmark/ui/BookmarkCard";

interface BookmarkListProps {
  filteredBookmarks: Bookmarks[] | null;
  bookmarks: Bookmarks[];
  deleteBookmark: (bookmarkId: string) => void;
  handleEditForm: (bookmark: Bookmarks) => void;
}

const BookmarkList = ({
  bookmarks,
  filteredBookmarks,
  deleteBookmark,
  handleEditForm,
}: BookmarkListProps) => {
  return (filteredBookmarks ?? bookmarks).map((bookmark: Bookmarks) => (
    <BookmarkCard
      key={bookmark.id}
      id={bookmark.id}
      title={bookmark.title}
      url={bookmark.url}
      notes={bookmark.notes}
      tags={bookmark.tags}
      deleteBookmark={deleteBookmark}
      handleEditForm={handleEditForm}
    />
  ));
};

export default BookmarkList;
