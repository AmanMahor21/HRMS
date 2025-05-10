import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: any;
  error?: any;
  className:string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  onChange,
  error,
  className,
  ...rest
}) => {
  return (
    <div className={className ? className: "input-container"}>
      {label && id && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        onChange={(data) => {
          data?.preventDefault();
          let event = {
            target: { name: data.target.name, value: data.target.value },
          };
          onChange(event);
        }}
        {...rest}
      />
      {error && <div style={{ color: "red", fontSize: "14px" }}>{error}</div>}
    </div>
  );
};

export default InputField;
