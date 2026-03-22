import s from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick: () => void;
}

const Button = ({
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${s.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
