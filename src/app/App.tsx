import { Header } from "@/widgets";
import BookmarkManager from "@/features/bookmark-manager/BookmarkManager";
import { BookmarksProvider } from "@/features/bookmark-management";

const App = () => {
  return (
    <>
      <Header />
      <BookmarksProvider>
        <BookmarkManager />
      </BookmarksProvider>
    </>
  );
};

export default App;
