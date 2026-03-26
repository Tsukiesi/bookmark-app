import useForm from "./useForm";
import useBookmarksState from "./useBookmarksState";
import useControls from "./useControls";
import useBookmarksUI from "./useBookmarksUI";
import type { Bookmarks } from "../types";
export const useBookmarks = () => {
  const { bookmarks, setBookmarks } = useBookmarksState();
  const { form, setForm, handleChange, resetForm } = useForm();
  const { addBookmark, deleteBookmark, editBookmark } =
    useControls(setBookmarks);
  const { active, closeForm, editingId, endEditing, openForm, openEditForm } =
    useBookmarksUI(setForm);
  const hasBookmarks = bookmarks.length > 0;
  const handleEditForm = (bookmarkData: Bookmarks) => {
    openEditForm(bookmarkData.id);
    if (bookmarkData)
      setForm({
        title: bookmarkData.title,
        url: bookmarkData.url,
        notes: bookmarkData.notes,
        tags: bookmarkData.tags,
      });
  };
  return {
    active,
    closeForm,
    editingId,
    endEditing,
    bookmarks,
    addBookmark,
    openForm,
    deleteBookmark,
    editBookmark,
    handleEditForm,
    hasBookmarks,
    form,
    handleChange,
    resetForm,
  };
};

export default useBookmarks;
