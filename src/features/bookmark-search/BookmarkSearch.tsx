import Input from "@/shared/ui/Input/Input";
import useSearch from "./useSearch";
import { useDataContext } from "@/features/bookmark-management/model/data-context";
import s from "./BookmarkSearch.module.css";

const BookmarkSearch = () => {
  const { bookmarks } = useDataContext();
  const { searchQuery, setSearchQuery } = useSearch(bookmarks);
  return (
    <form className={s.search}>
      <Input
        type="search"
        id="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </form>
  );
};

export default BookmarkSearch;
