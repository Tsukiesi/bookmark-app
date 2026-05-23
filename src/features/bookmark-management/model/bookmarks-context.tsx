import {
  useBookmarkDataContext,
  BookmarkDataProvider,
} from "@/features/bookmark-management/model/bookmark-data-context";
import {
  useBookmarkFormContext,
  BookmarkFormProvider,
} from "@/features/bookmark-management/model/bookmark-form-context";
import type { Bookmarks } from "@/entities/bookmark/model/types";

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
  const { bookmarks, isSearchEmpty } = useBookmarkDataContext();
  const {
    setForm,
    openEditForm,
    closeForm,
    closeTagInput,
    resetForm,
    resetTagInput,
  } = useBookmarkFormContext();

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
  };

  const closeTagInputWithReset = () => {
    closeTagInput();
    resetTagInput();
  };

  const notFound = hasBookmarks && isSearchEmpty;
  return {
    hasBookmarks,
    handleEditForm,
    closeFormWithReset,
    closeTagInputWithReset,
    notFound,
  };
};
