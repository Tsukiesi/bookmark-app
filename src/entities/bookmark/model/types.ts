export interface Bookmarks {
  id: string;
  url: string;
  title: string;
  notes: string;
  tags: string[];
}

export interface DataContextType {
  bookmarks: Bookmarks[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks[]>>;
  addBookmark: (bookmarkData: {
    title: string;
    url: string;
    notes: string;
    tags: string[];
  }) => void;
  deleteBookmark: (bookmarkId: string) => void;
  editBookmark: (
    bookmarkId: string,
    url: string,
    title: string,
    notes: string,
    tags: string[],
  ) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredBookmarks: Bookmarks[] | null;
  isSearchEmpty: boolean;
}

export interface UIContextType {
  active: boolean;
  editingId: string | null;
  openForm: () => void;
  closeForm: () => void;
  openEditForm: (bookmarkId: string) => void;
  endEditing: () => void;
  tagActive: boolean;
  openTagInput: () => void;
  closeTagInput: () => void;
  form: {
    url: string;
    title: string;
    notes: string;
    tags: string[];
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      url: string;
      title: string;
      notes: string;
      tags: string[];
    }>
  >;
  handleChange: (name: string, value: string) => void;
  handleTagsChange: (value: string) => void;
  resetTagInput: () => void;
  resetForm: () => void;
  newTagValue: string;
  addNewTag: () => void;
}
