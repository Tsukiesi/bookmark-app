import { useState } from "react";

const useBookmarksUI = () => {
  const [active, setActive] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tagActive, setTagActive] = useState<boolean>(false);
  const openForm = () => {
    setActive(true);
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

  const openTagInput = () => {
    setTagActive(true);
  };

  const closeTagInput = () => {
    setTagActive(false);
  };

  return {
    active,
    editingId,
    openForm,
    closeForm,
    openEditForm,
    endEditing,
    tagActive,
    openTagInput,
    closeTagInput,
  };
};

export default useBookmarksUI;
