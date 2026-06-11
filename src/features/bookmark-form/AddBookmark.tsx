import { Button, Modal, Input, Textarea } from "@/shared/ui";
import { useBookmarkFormContext } from "@/features/bookmark-management";
import { useBookmarksActions } from "@/features/bookmark-management";
import s from "./AddBookmark.module.css";

const AddBookmark = () => {
  const {
    active,
    tagActive,
    form,
    newTagValue,
    handleChange,
    handleTagsChange,
    openTagInput,
    addNewTag,
    inputRef,
    tagError,
  } = useBookmarkFormContext();
  const {
    handleSubmit,
    closeFormWithReset,
    closeTagInputWithReset,
    clearForm,
    deleteTag,
    errors,
  } = useBookmarksActions();

  return (
    <Modal active={active} closeModal={closeFormWithReset}>
      <Button className={s.reset} type={"reset"} onClick={() => clearForm()}>
        Clear Form
      </Button>
      <form className={s.form} onSubmit={handleSubmit} noValidate>
        <label className={s.title} htmlFor="title">
          Title
        </label>
        <Input
          value={form.title}
          onFormChange={handleChange}
          placeholder="A title"
          id="title"
          required
        />
        {errors.titleError && (
          <span className={s.error}>{errors.titleError}</span>
        )}
        <label htmlFor="url">Url</label>
        <Input
          type="url"
          value={form.url}
          onFormChange={handleChange}
          placeholder="Address for your bookmark"
          id="url"
          required
        />
        {errors.urlError && <span className={s.error}>{errors.urlError}</span>}
        <label htmlFor="notes">Notes</label>
        <Textarea
          value={form.notes}
          onChange={handleChange}
          placeholder="Write your note"
          id="notes"
        />

        <label htmlFor="tags">Tags</label>
        <div className={s.tag_input}>
          {tagActive ? (
            <button
              type="button"
              className={s.close_button}
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
              className={s.add_button}
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
                  ref={inputRef}
                />
                <Button
                  onClick={() => {
                    addNewTag();
                  }}
                >
                  Add
                </Button>
              </>
            )}
          </div>
        </div>

        {tagError && <span className={s.error}>{tagError}</span>}
        <div className={s.tag_list}>
          {form.tags &&
            form.tags.map((tag, index) => (
              <div className={s.tag_box} key={index}>
                <span className={s.tag}>{`#${tag}`}</span>
                <button
                  type="button"
                  className={s.close_button}
                  onClick={() => deleteTag(index)}
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
              </div>
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
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookmark;
