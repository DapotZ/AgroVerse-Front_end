import React from "react";

const InputField = ({
  label,
  type,
  value,
  onChange,
  id,
  name,
  placeholder,
}) => {
  return (
    <div className="col-span-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 font-mulish"
      >
        {" "}
        {label}{" "}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
        placeholder={placeholder}
        className="mt-1 p-2 w-full rounded-md border border-gray-200 bg-white text-sm text-[#738599] shadow-sm"
      />
    </div>
  );
};

export default InputField;
