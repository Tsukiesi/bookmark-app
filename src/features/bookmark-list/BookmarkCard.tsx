import {
  useBookmarksActions,
  useBookmarkDataContext,
} from "@/features/bookmark-management";
import s from "./BookmarkCard.module.css";

export interface CardProps {
  id: string;
  url: string;
  title: string;
  notes: string;
  tags: string[];
}

const BookmarkCard = (props: CardProps) => {
  const { id, url, title, notes, tags } = props;
  const { deleteBookmark } = useBookmarkDataContext();
  const { handleEditForm } = useBookmarksActions();
  const getDomain = (url: string) => {
    try {
      const urlObject = new URL(url);
      return urlObject.hostname;
    } catch {
      return url;
    }
  };
  const domain = getDomain(url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div className={s.card}>
      <button
        className={`${s.icon_button} ${s.delete_button}`}
        onClick={() => deleteBookmark(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="16"
          height="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className={s.bookmark}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={faviconUrl} alt="site icon" width="16" height="16" />
          <p className={s.title}>{title}</p>
          <span className={s.subtext}>{url}</span>
        </a>
        <button
          className={s.icon_button}
          onClick={() => handleEditForm({ id, title, url, notes, tags })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>
      {notes && <p className={s.description}>{notes}</p>}
      {tags && <hr />}
      {tags && <p className={s.subtext}>{tags?.map((tag) => `#${tag} `)}</p>}
    </div>
  );
};

export default BookmarkCard;
