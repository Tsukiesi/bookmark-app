import { useState } from "react";
import type { Bookmarks } from "../types";

const useBookmarksUI = (
  setForm: (
    value: React.SetStateAction<{
      url: string;
      title: string;
      notes: string;
      tags: string;
    }>,
  ) => void,
) => {
  const [active, setActive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const openForm = () => {
    setActive(!active);
  };
  const closeForm = () => {
    setActive(false);
  };
  const openEditForm = (bookmarkId: string) => {
    setActive(true);
    setEditingId(bookmarkId);
  };
  const endEditing = () => {
    setEditingId(null);
  };
  return {
    active,
    editingId,
    openForm,
    closeForm,
    openEditForm,
    endEditing,
  };
};

export default useBookmarksUI;
