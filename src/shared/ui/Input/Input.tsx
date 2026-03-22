import s from "./Input.module.css";

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFormChange?: (name: string, value: string) => void;
}

const Input = (props: InputProps) => {
  const {
    id,
    value = "",
    type = "text",
    placeholder = "",
    onChange,
    onFormChange,
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    if (onFormChange && id) {
      onFormChange?.(id, v);
    } else {
      onChange?.(v);
    }
  };
  return (
    <input
      className={s.input}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Input;
