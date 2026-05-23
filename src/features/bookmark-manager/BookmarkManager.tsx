import { Button } from "@/shared/ui";
import BookmarkSearch from "@/features/bookmark-search/BookmarkSearch";
import BookmarkList from "@/features/bookmark-list/BookmarkList";
import AddBookmark from "@/features/bookmark-form/AddBookmark";
import { useBookmarksActions } from "@/features/bookmark-management";
import { useThemeContext } from "@/app/providers/theme-context";
import { useBookmarkFormContext } from "@/features/bookmark-management";
import s from "./BookmarkManager.module.css";

const BookmarkManager = () => {
  const { openForm } = useBookmarkFormContext();
  const { hasBookmarks, notFound } = useBookmarksActions();
  const { toggleTheme } = useThemeContext();
  return (
    <>
      <main className={s.manager}>
        <div className={s.controls}>
          <BookmarkSearch />
          <Button onClick={openForm}>Add new bookmark</Button>
          <Button onClick={toggleTheme}>Switch Theme</Button>
        </div>

        {!hasBookmarks && (
          <div className={s.message}>
            <p>There are no bookmarks yet</p>
          </div>
        )}

        {notFound && (
          <div className={s.message}>
            <p>Bookmark not found</p>
          </div>
        )}

        <BookmarkList />
      </main>
      <AddBookmark />
    </>
  );
};

export default BookmarkManager;
