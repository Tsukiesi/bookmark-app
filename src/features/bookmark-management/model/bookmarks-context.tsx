import {
  useBookmarkDataContext,
  BookmarkDataProvider,
} from "@/features/bookmark-management/model/bookmark-data-context";
import {
  useBookmarkFormContext,
  BookmarkFormProvider,
} from "@/features/bookmark-management/model/bookmark-form-context";
import type { Bookmarks } from "@/entities/bookmark/model/types";
import { useState } from "react";

type errors = string;
interface FormErrors {
  titleError: errors;
  urlError: errors;
}
export const BookmarksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <BookmarkDataProvider>
      <BookmarkFormProvider>{children}</BookmarkFormProvider>
    </BookmarkDataProvider>
  );
};

export const useBookmarksActions = () => {
  const { bookmarks, isSearchEmpty, addBookmark, editBookmark } =
    useBookmarkDataContext();
  const {
    form,
    setForm,
    openEditForm,
    closeForm,
    closeTagInput,
    resetForm,
    resetTagInput,
    editingId,
    endEditing,
    setTagError,
  } = useBookmarkFormContext();

  const [errors, setErrors] = useState<FormErrors>({
    titleError: "",
    urlError: "",
  });
  const hasBookmarks = bookmarks.length > 0;

  const handleEditForm = (bookmarkData: Bookmarks) => {
    if (!bookmarkData) return;
    openEditForm(bookmarkData.id);
    setForm({
      title: bookmarkData.title,
      url: bookmarkData.url,
      notes: bookmarkData.notes,
      tags: bookmarkData.tags,
    });
  };

  const closeFormWithReset = () => {
    closeForm();
    resetForm();
    setErrors({
      titleError: "",
      urlError: "",
    });
  };

  const closeTagInputWithReset = () => {
    closeTagInput();
    resetTagInput();
    setTagError("");
  };

  const clearForm = () => {
    if (confirm("Are you sure you want to clear the form?")) {
      resetForm();
      setErrors({
        titleError: "",
        urlError: "",
      });
    }
  };

  const deleteTag = (index: number) => {
    const newTags = form.tags.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, tags: newTags }));
  };

  const notFound = hasBookmarks && isSearchEmpty;
  const isTitleEmpty = form.title.trim().length === 0;
  const isUrlEmpty = form.url.trim().length === 0;

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    const newErrors = {
      titleError: "",
      urlError: "",
    };
    if (isTitleEmpty) {
      newErrors.titleError = "Title must be filled in";
    }
    if (isUrlEmpty) {
      newErrors.urlError = "Url must be filled in";
    }

    setErrors(newErrors);
    if (newErrors.titleError || newErrors.urlError) return;
    if (editingId == null) {
      addBookmark(form);
      closeFormWithReset();
    }
    if (editingId != null) {
      editBookmark(editingId, form);
      endEditing();
      closeFormWithReset();
    }
  };

  return {
    hasBookmarks,
    handleEditForm,
    closeFormWithReset,
    closeTagInputWithReset,
    clearForm,
    notFound,
    handleSubmit,
    deleteTag,
    errors,
  };
};
