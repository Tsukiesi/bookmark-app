import useBookmarksUI from "@/features/bookmark-management/model/hooks/useBookmarksUI";
import useForm from "@/features/bookmark-management/model/hooks/useForm";
import { createContext, useContext } from "react";
import type { UIContextType } from "@/entities/bookmark/model/types";

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within UIProvider");
  }
  return context;
};

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const ui = useBookmarksUI();
  const formProps = useForm();
  return (
    <UIContext.Provider value={{ ...ui, ...formProps }}>
      {children}
    </UIContext.Provider>
  );
};
