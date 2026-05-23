import { Button, Modal, Input, Textarea } from "@/shared/ui";
import { useBookmarkFormContext } from "@/features/bookmark-management";
import { useBookmarksActions } from "@/features/bookmark-management";
import { useBookmarkDataContext } from "@/features/bookmark-management";
import s from "./AddBookmark.module.css";

const AddBookmark = () => {
  const {
    active,
    tagActive,
    form,
    resetForm,
    newTagValue,
    handleChange,
    handleTagsChange,
    openTagInput,
    closeTagInput,
    addNewTag,
    editingId,
    endEditing,
  } = useBookmarkFormContext();
  const { closeFormWithReset, closeTagInputWithReset } = useBookmarksActions();
  const { addBookmark, editBookmark } = useBookmarkDataContext();
  return (
    <Modal active={active} closeModal={closeFormWithReset}>
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
        <label className={s.title} htmlFor="title">
          Title
        </label>
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

        {tagActive ? (
          <button
            type="button"
            className={s.tag_close_button}
            onClick={() => closeTagInputWithReset()}
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
        ) : (
          <button
            type="button"
            className={s.tag_add_button}
            onClick={() => openTagInput()}
          >
            +
          </button>
        )}
        <div className={s.tag_new}>
          {tagActive && (
            <>
              <Input
                value={newTagValue}
                onFormChange={(_, value) => handleTagsChange(value)}
                placeholder="New tag"
                id="tags"
              />
              <Button
                onClick={() => {
                  addNewTag();
                  closeTagInput();
                }}
              >
                Add
              </Button>
            </>
          )}
        </div>
        <div className={s.tag_list}>
          {form.tags &&
            form.tags.map((tag, index) => (
              <span className={s.tag} key={index}>{`#${tag}`}</span>
            ))}
        </div>
        <div className={s.confirm}>
          <Button
            onClick={() => {
              closeFormWithReset();
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
                closeFormWithReset();
              }
              if (
                editingId != null &&
                confirm("Are you sure you're want to edit this bookmark?")
              ) {
                editBookmark(editingId, form);
                endEditing();
                closeFormWithReset();
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
