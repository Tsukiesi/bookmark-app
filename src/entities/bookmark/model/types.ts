export interface Bookmarks {
  id: string;
  url: string;
  title: string;
  notes: string;
  tags: string[];
}

export type BookmarkData = Omit<Bookmarks, "id">;

export interface BookmarkDataContextType {
  bookmarks: Bookmarks[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks[]>>;
  addBookmark: (bookmarkData: BookmarkData) => void;
  deleteBookmark: (bookmarkId: string) => void;
  editBookmark: (bookmarkId: string, bookmarkData: BookmarkData) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredBookmarks: Bookmarks[] | null;
  isSearchEmpty: boolean;
}

export interface BookmarkFormContextType {
  active: boolean;
  editingId: string | null;
  openForm: () => void;
  closeForm: () => void;
  openEditForm: (bookmarkId: string) => void;
  endEditing: () => void;
  tagActive: boolean;
  openTagInput: () => void;
  closeTagInput: () => void;
  form: BookmarkData;
  setForm: React.Dispatch<React.SetStateAction<BookmarkData>>;
  handleChange: (name: string, value: string) => void;
  handleTagsChange: (value: string) => void;
  resetTagInput: () => void;
  resetForm: () => void;
  newTagValue: string;
  addNewTag: () => void;
}
