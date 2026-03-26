import s from "./BookmarkManager.module.css";
import Button from "../../shared/ui/Button/Button";
import BookmarkSearch from "../bookmark-search/BookmarkSearch";
import BookmarkList from "../../widgets/BookmarkList/BookmarkList";
import AddBookmark from "../bookmark-form/AddBookmark";
import useBookmarks from "../../entities/bookmark/model/hooks/useBookmarks";
import useSearch from "../../entities/bookmark/model/hooks/useSearch";

const BookmarkManager = () => {
  const {
    active,
    editingId,
    bookmarks,
    addBookmark,
    openForm,
    closeForm,
    deleteBookmark,
    editBookmark,
    handleEditForm,
    endEditing,
    hasBookmarks,
    form,
    handleChange,
    resetForm,
  } = useBookmarks();

  const { searchQuery, setSearchQuery, filteredBookmarks, isSearchEmpty } =
    useSearch(bookmarks);

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

        <BookmarkList
          bookmarks={bookmarks}
          handleEditForm={handleEditForm}
          filteredBookmarks={filteredBookmarks}
          deleteBookmark={deleteBookmark}
        />
      </main>
      <AddBookmark
        form={form}
        handleChange={handleChange}
        resetForm={resetForm}
        addBookmark={addBookmark}
        active={active}
        closeForm={closeForm}
        editingId={editingId}
        editBookmark={editBookmark}
        endEditing={endEditing}
      ></AddBookmark>
    </>
  );
};

export default BookmarkManager;
