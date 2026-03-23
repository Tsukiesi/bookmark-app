import { useState, useEffect } from "react";

interface Bookmarks {
  id: string;
  url: string;
  title: string;
  notes: string;
  tags: string;
}

export const useBookmarks = () => {
  const [active, setActive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({
    url: "",
    title: "",
    notes: "",
    tags: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ url: "", title: "", notes: "", tags: "" });
  };

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
  return {
    active,
    setActive,
    editingId,
    setEditingId,
    searchQuery,
    setSearchQuery,
    bookmarks,
    setBookmarks,
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
  };
};

export default useBookmarks;
