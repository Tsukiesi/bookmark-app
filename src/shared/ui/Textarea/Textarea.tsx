import s from "./Textarea.module.css";

interface TextareaProps {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (name: string, value: string) => void;
}

const Textarea = (props: TextareaProps) => {
  const { id, value = "", placeholder = "", onChange } = props;
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(id, event.target.value);
  };
  return (
    <textarea
      className={s.textarea}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={4}
      autoComplete="off"
    />
  );
};

export default Textarea;
