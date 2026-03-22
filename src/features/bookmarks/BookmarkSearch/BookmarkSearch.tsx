import s from "./BookmarkSearch.module.css";
import Input from "../../../shared/ui/Input/Input";

interface BookmarkSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const BookmarkSearch = (props: BookmarkSearchProps) => {
  const { searchQuery, setSearchQuery } = props;
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
