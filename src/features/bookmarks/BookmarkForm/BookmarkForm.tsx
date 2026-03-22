import s from "./BookmarkForm.module.css";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import { useEffect } from "react";
import Textarea from "../../../shared/Textarea/Textarea";
interface BookmarkFormProps {
  active?: boolean;
  setActive: (active: boolean) => void;
  form: {
    url: string;
    title: string;
    notes: string;
    tags: string;
  };
  handleChange: (name: string, value: string) => void;
  resetForm: () => void;
  addBookmark: () => void;
  editingId?: string | null;
  editBookmark: (
    bookmarkId: string,
    url: string,
    title: string,
    notes: string,
    tags: string,
  ) => void;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({
  setActive,
  active,
  form,
  handleChange,
  resetForm,
  addBookmark,
  editingId,
  editBookmark,
}) => {
  useEffect(() => {
    if (!active) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [active]);

  if (!active) return null;
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <Button
          className={s.reset}
          type={"reset"}
          onClick={() =>
            confirm("Are you sure you're want to clear all?") && resetForm()
          }
        >
          Clear Form
        </Button>
        <form className={s.form}>
          <label htmlFor="title">Title</label>
          <Input
            value={form.title}
            onFormChange={handleChange}
            placeholder="A title"
            id="title"
          />

          <label htmlFor="url">Url</label>
          <Input
            value={form.url}
            onFormChange={handleChange}
            placeholder="Address for your bookmark"
            id="url"
          />

          <label htmlFor="notes">Notes</label>
          <Textarea
            value={form.notes}
            onChange={handleChange}
            placeholder="Write your note"
            id="notes"
          />

          <label htmlFor="tags">Tags</label>
          <Input
            value={form.tags}
            onFormChange={handleChange}
            placeholder="Tags"
            id="tags"
          />

          <div className={s.confirm}>
            <Button
              onClick={() => {
                setActive(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (
                  editingId == null &&
                  confirm("Are you sure you're ready to add new bookmark?")
                ) {
                  addBookmark();
                  resetForm();
                }
                if (
                  editingId != null &&
                  confirm("Are you sure you're want to edit this bookmark?")
                ) {
                  editBookmark(
                    editingId,
                    form.url,
                    form.title,
                    form.notes,
                    form.tags,
                  );
                  resetForm();
                }
              }}
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkForm;
