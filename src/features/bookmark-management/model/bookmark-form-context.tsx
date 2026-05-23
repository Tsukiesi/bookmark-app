import useBookmarksUI from "@/features/bookmark-management/model/hooks/useBookmarksUI";
import useForm from "@/features/bookmark-management/model/hooks/useForm";
import { createContext, useContext } from "react";
import type { BookmarkFormContextType } from "@/entities/bookmark/model/types";

const BookmarkFormContext = createContext<BookmarkFormContextType | undefined>(
  undefined,
);

export const useBookmarkFormContext = () => {
  const context = useContext(BookmarkFormContext);
  if (!context) {
    throw new Error(
      "useBookmarkFormContext must be used within BookmarkFormProvider",
    );
  }
  return context;
};

export const BookmarkFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ui = useBookmarksUI();
  const formProps = useForm();
  return (
    <BookmarkFormContext.Provider value={{ ...ui, ...formProps }}>
      {children}
    </BookmarkFormContext.Provider>
  );
};
