import React from "react";

const ButtonLoginAndRegister = ({
  textButton,
  textArea,
  textHref,
  hrefClick,
}) => {
  return (
    <div className="col-span-4 sm:flex sm:items-center sm:gap-4 flex-col">
      <button className="inline-block shrink-0 w-2/3 rounded-md border border-[#269D26] bg-[#269D26] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#269D26] focus:outline-none focus:ring active:text-blue-500 font-mulish">
        {textButton}
      </button>

      <p className="mt-4 text-sm text-[#303030] sm:mt-0 font-poppins">
        {textArea}
        <a href={hrefClick} className="text-[#269D26] underline font-poppins">
          {textHref}
        </a>
        .
      </p>
    </div>
  );
};

export default ButtonLoginAndRegister;
