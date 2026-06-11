import s from "./Input.module.css";

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFormChange?: (name: string, value: string) => void;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input = (props: InputProps) => {
  const {
    id,
    value = "",
    type = "text",
    placeholder = "",
    onChange,
    onFormChange,
    required,
    ref,
  } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    if (onFormChange && id) {
      onFormChange(id, v);
    } else if (onChange) {
      onChange(v);
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
      required={required}
      ref={ref}
    />
  );
};

export default Input;
