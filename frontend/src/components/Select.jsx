// Select.js
import React, { useState } from "react";

const Select = ({ name, value, onChange, placeholder, options, isMulti, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        placeholder={placeholder}
        className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
      {isOpen && (
        <select
          name={name}
          value={value}
          onChange={onChange}
          multiple={isMulti}
          className="absolute inset-0 opacity-0"
          tabIndex="-1"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;
