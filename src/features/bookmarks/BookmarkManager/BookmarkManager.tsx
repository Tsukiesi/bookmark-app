import s from "./BookmarkManager.module.css";
import Button from "../../../shared/ui/Button/Button";
import BookmarkSearch from "../BookmarkSearch/BookmarkSearch";
import BookmarkCard from "../BookmarkCard/BookmarkCard";
import BookmarkForm from "../BookmarkForm/BookmarkForm";
import { useEffect, useState } from "react";
import { useBookmarkForm } from "../hooks/useBookmarkForm";

interface Bookmarks {
  id: string;
  url: string;
  title: string;
  notes: string;
  tags: string;
}

const BookmarkManager = () => {
  const [active, setActive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { form, setForm, handleChange, resetForm } = useBookmarkForm();
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log("bookmarks:", bookmarks);
  }, [bookmarks]);

  const addBookmark = () => {
    setBookmarks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: form.title,
        url: form.url,
        notes: form.notes,
        tags: form.tags,
      },
    ]);
    setActive(false);
  };

  const openForm = () => {
    setActive(!active);
  };

  const deleteBookmark = (bookmarkId: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== bookmarkId));
  };

  const editBookmark = (
    bookmarkId: string,
    url: string,
    title: string,
    notes: string,
    tags: string,
  ) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === bookmarkId
          ? { ...bookmark, url, title, notes, tags }
          : bookmark,
      ),
    );
    setActive(false);
    setEditingId(null);
  };

  const bookmarkData = (bookmarkId: string) => {
    setActive(true);
    setEditingId(bookmarkId);
    const bookmarkData = bookmarks.find(
      (bookmark) => bookmark.id === bookmarkId,
    );
    if (bookmarkData)
      setForm({
        title: bookmarkData.title,
        url: bookmarkData.url,
        notes: bookmarkData.notes,
        tags: bookmarkData.tags,
      });
  };

  const clearSearchQuery = searchQuery.trim().toLowerCase();
  const filteredBookmarks =
    clearSearchQuery.length > 0
      ? bookmarks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;

  const hasBookmarks = bookmarks.length > 0;
  const isSearchEmpty = filteredBookmarks?.length === 0;
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
