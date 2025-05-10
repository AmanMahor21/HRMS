interface DropdownProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  className = "status-dropdown",
  placeholder = "Select an option",
}) => {
  return (
    <select
    className={className}
    // className={`${className} ${value ? "dropdown-selected" : ""}`}

    value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
