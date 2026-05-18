import {
  useDataContext,
  DataProvider,
} from "@/features/bookmark-management/model/data-context";
import {
  useUIContext,
  UIProvider,
} from "@/features/bookmark-management/model/ui-context";
import type { Bookmarks } from "@/entities/bookmark/model/types";

export const BookmarksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DataProvider>
      <UIProvider>{children}</UIProvider>
    </DataProvider>
  );
};

export const useBookmarksActions = () => {
  const { bookmarks, isSearchEmpty } = useDataContext();
  const {
    setForm,
    openEditForm,
    closeForm,
    closeTagInput,
    resetForm,
    resetTagInput,
  } = useUIContext();

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
