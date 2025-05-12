interface DropdownProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  setValue?:(val:string | undefined)=> string
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  className = "status-dropdown",
  placeholder = "Select an option",
  setValue = () => "new"
}) => {
  return (
    <select
    style={setValue ? { color: setValue(value) } : undefined}
    className={className}

    value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}
        style={{ color: "black" }}
>
          {option}
        </option>
      ))}
    </select>
  );
};
