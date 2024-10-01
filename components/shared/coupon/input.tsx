import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (name: string, value: string) => void;
  isPriceSymbol?: boolean;
  symbol?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  onChange,
  isPriceSymbol,
  symbol,
}) => {
  return (
    <div className="flex flex-col relative w-full">
      <label htmlFor={name} className="text-sm font-semibold pb-1">
        {label}
      </label>
      {isPriceSymbol && (
        <span className="absolute top-[31px] left-3">{symbol}</span>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder || label}
        className={`placeholder:text-[#667085] border rounded-lg ${
          isPriceSymbol ? "pl-8" : ""
        } py-2 px-4 w-full text-sm`}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};

export default InputField;
