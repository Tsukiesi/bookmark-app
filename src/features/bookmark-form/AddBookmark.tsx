import s from "./AddBookmark.module.css";
import Textarea from "../../shared/ui/Textarea/Textarea";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";
import Modal from "../../shared/ui/Modal/Modal";

interface AddBookmarkProps {
  active: boolean;
  form: {
    url: string;
    title: string;
    notes: string;
    tags: string;
  };
  handleChange: (name: string, value: string) => void;
  resetForm: () => void;
  closeForm: () => void;
  addBookmark: (form: {
    url: string;
    title: string;
    notes: string;
    tags: string;
  }) => void;
  editingId?: string | null;
  endEditing: () => void;
  editBookmark: (
    bookmarkId: string,
    url: string,
    title: string,
    notes: string,
    tags: string,
  ) => void;
}

const AddBookmark: React.FC<AddBookmarkProps> = ({
  active,
  form,
  handleChange,
  resetForm,
  closeForm,
  addBookmark,
  editingId,
  endEditing,
  editBookmark,
}) => {
  return (
    <Modal active={active} closeModal={closeForm}>
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
              closeForm();
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
                addBookmark(form);
                closeForm();
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
                endEditing();
                closeForm();
                resetForm();
              }
            }}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookmark;
