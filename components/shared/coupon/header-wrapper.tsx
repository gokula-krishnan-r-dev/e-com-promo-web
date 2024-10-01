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
    <div className="border rounded-lg bg-white border-[#D7D7D7]">
      <div>
        <div className="flex items-center border-b  justify-between w-full px-6 py-2 ">
          <h1 className="text-black text-xl font-bold px-3 py-3">{title}</h1>
          {button}
        </div>
        {children}
      </div>
    </div>
  );
};

export default HeaderWrapper;
