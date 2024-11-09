import React from "react";

interface HeaderWrapperProps {
  children: React.ReactNode;
  button: React.ReactNode;
  title?: string;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  children,
  button,
  title,
}) => {
  return (
    <div className="border px-3 mx-4 my-4 py-2 rounded-lg bg-white border-[#D7D7D7]">
      <div>
        <div className="flex items-center border-b  justify-between w-full px-2 py-2 ">
          <h1 className="text-black text-xl font-semibold px-3 py-3">
            {title}
          </h1>
          {button}
        </div>
        {children}
      </div>
    </div>
  );
};

export default HeaderWrapper;
