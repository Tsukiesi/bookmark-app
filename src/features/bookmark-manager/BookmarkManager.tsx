import s from "./BookmarkManager.module.css";
import Button from "../../shared/ui/Button/Button";
import BookmarkSearch from "../bookmark-search/BookmarkSearch";
import BookmarkCard from "../bookmark-card/BookmarkCard";
import BookmarkForm from "../bookmark-form/BookmarkForm";
import useBookmarks from "./useBookmarks";

const BookmarkManager = () => {
  const {
    active,
    setActive,
    editingId,
    searchQuery,
    setSearchQuery,
    bookmarks,
    addBookmark,
    openForm,
    deleteBookmark,
    editBookmark,
    bookmarkData,
    filteredBookmarks,
    hasBookmarks,
    isSearchEmpty,
    form,
    handleChange,
    resetForm,
  } = useBookmarks();
  return (
    <>
      <main className={s.manager}>
        <div className={s.controls}>
          <BookmarkSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Button onClick={openForm}>Add new bookmark</Button>
        </div>

        {!hasBookmarks && (
          <div className={s.message}>
            <p>There are no bookmarks yet</p>
          </div>
        )}

        {hasBookmarks && isSearchEmpty && (
          <div className={s.message}>
            <p>Bookmark not found</p>
          </div>
        )}

        {(filteredBookmarks ?? bookmarks).map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
            notes={bookmark.notes}
            tags={bookmark.tags}
            deleteBookmark={deleteBookmark}
            bookmarkData={bookmarkData}
          />
        ))}
      </main>
      <BookmarkForm
        form={form}
        handleChange={handleChange}
        resetForm={resetForm}
        addBookmark={addBookmark}
        active={active}
        setActive={setActive}
        editingId={editingId}
        editBookmark={editBookmark}
      ></BookmarkForm>
    </>
  );
};

export default BookmarkManager;
