import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[370px] text-black border">
      <aside className=" hidden h-[100vh]  lg:block lg:fixed w-[300px]  p-5 bg-white">
        <div className="mb-5 w-[100%]">
          <div className="flex items-center justify-between p-2 border-2 rounded-[10px] border-[#EEEEEE]">
            <div className="flex items-center gap-3 justify-start">
              <div className="h-[40px] w-[40px] rounded-full">
                <svg
                  width="49"
                  height="51"
                  viewBox="0 0 49 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="3"
                    width="40"
                    height="40"
                    rx="20"
                    fill="#434CE7"
                  />
                  <rect
                    x="2.75"
                    y="1.75"
                    width="42.5"
                    height="42.5"
                    rx="21.25"
                    stroke="#434CE7"
                    stroke-opacity="0.3"
                    stroke-width="2.5"
                  />
                  <g filter="url(#filter0_d_175_4506)">
                    <rect
                      opacity="0.5"
                      width="12.8075"
                      height="12.8075"
                      rx="2.35294"
                      transform="matrix(0.965916 -0.258855 -0.258855 0.965916 20.7903 20.041)"
                      fill="white"
                    />
                    <rect
                      width="12.8075"
                      height="12.8075"
                      rx="2.35294"
                      transform="matrix(0.965916 -0.258855 -0.258855 0.965916 17.6533 16.9033)"
                      fill="url(#paint0_linear_175_4506)"
                    />
                  </g>
                  <g filter="url(#filter1_d_175_4506)">
                    <g clip-path="url(#clip0_175_4506)">
                      <path
                        d="M45.4 47C30.6 52.6 14.9 46 8.90002 42L10.4 45.5C13.6 53.9 26.7334 54.6667 32.9 54C36.1 54.8 41.2334 51.6667 43.4 50L45.4 47Z"
                        fill="#2D35C6"
                      />
                      <path
                        d="M45.4 47C30.6 52.6 14.9 46 8.90002 42L10.4 45.5C13.6 53.9 26.7334 54.6667 32.9 54C36.1 54.8 41.2334 51.6667 43.4 50L45.4 47Z"
                        fill="#2D35C6"
                      />
                    </g>
                    <rect
                      x="4.90002"
                      y="3.5"
                      width="39"
                      height="39"
                      rx="19.5"
                      stroke="#3C45D7"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_175_4506"
                      x="11.75"
                      y="14"
                      width="24"
                      height="24"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="3" />
                      <feGaussianBlur stdDeviation="1.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_175_4506"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_175_4506"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_175_4506"
                      x="0.400024"
                      y="3"
                      width="48"
                      height="48"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_175_4506"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_175_4506"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_175_4506"
                      x1="6.40376"
                      y1="0"
                      x2="6.40376"
                      y2="12.8075"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#CDCFFF" />
                      <stop offset="1" stop-color="#DCDEFF" />
                    </linearGradient>
                    <clipPath id="clip0_175_4506">
                      <rect
                        x="4.40002"
                        y="3"
                        width="40"
                        height="40"
                        rx="20"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex items-start justify-start flex-col ">
                <h1 className="font-medium text-[18px]">honeycomb</h1>
                <p className="text-[14px] text-[#4A5367]">
                  Promotion Management
                </p>
              </div>
            </div>
            <div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                className="rotate-90 text-[#82838A] text-[18px]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M8.5 8.62v6.76L5.12 12 8.5 8.62M10 5l-7 7 7 7V5zm4 0v14l7-7-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        <Nav items={menuItems} />
        <div className="fixed bottom-0 left-0 right-auto bg-white w-[300px] p-5 border-t-[#EAECF0]  border-t-2  flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full">
              <svg
                width="49"
                height="51"
                viewBox="0 0 49 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="3"
                  width="40"
                  height="40"
                  rx="20"
                  fill="#434CE7"
                />
                <rect
                  x="2.75"
                  y="1.75"
                  width="42.5"
                  height="42.5"
                  rx="21.25"
                  stroke="#434CE7"
                  stroke-opacity="0.3"
                  stroke-width="2.5"
                />
                <g filter="url(#filter0_d_175_4506)">
                  <rect
                    opacity="0.5"
                    width="12.8075"
                    height="12.8075"
                    rx="2.35294"
                    transform="matrix(0.965916 -0.258855 -0.258855 0.965916 20.7903 20.041)"
                    fill="white"
                  />
                  <rect
                    width="12.8075"
                    height="12.8075"
                    rx="2.35294"
                    transform="matrix(0.965916 -0.258855 -0.258855 0.965916 17.6533 16.9033)"
                    fill="url(#paint0_linear_175_4506)"
                  />
                </g>
                <g filter="url(#filter1_d_175_4506)">
                  <g clip-path="url(#clip0_175_4506)">
                    <path
                      d="M45.4 47C30.6 52.6 14.9 46 8.90002 42L10.4 45.5C13.6 53.9 26.7334 54.6667 32.9 54C36.1 54.8 41.2334 51.6667 43.4 50L45.4 47Z"
                      fill="#2D35C6"
                    />
                    <path
                      d="M45.4 47C30.6 52.6 14.9 46 8.90002 42L10.4 45.5C13.6 53.9 26.7334 54.6667 32.9 54C36.1 54.8 41.2334 51.6667 43.4 50L45.4 47Z"
                      fill="#2D35C6"
                    />
                  </g>
                  <rect
                    x="4.90002"
                    y="3.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#3C45D7"
                    shape-rendering="crispEdges"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_175_4506"
                    x="11.75"
                    y="14"
                    width="24"
                    height="24"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_175_4506"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_175_4506"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_175_4506"
                    x="0.400024"
                    y="3"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_175_4506"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_175_4506"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_175_4506"
                    x1="6.40376"
                    y1="0"
                    x2="6.40376"
                    y2="12.8075"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#CDCFFF" />
                    <stop offset="1" stop-color="#DCDEFF" />
                  </linearGradient>
                  <clipPath id="clip0_175_4506">
                    <rect
                      x="4.40002"
                      y="3"
                      width="40"
                      height="40"
                      rx="20"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Olivia Rhye</h3>
              <p className="text-sm text-gray-500">olivia@untitledui.com</p>
            </div>
          </div>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="rotate-90 text-[#82838A] text-[18px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M8.5 8.62v6.76L5.12 12 8.5 8.62M10 5l-7 7 7 7V5zm4 0v14l7-7-7-7z" />
            </svg>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
import Link from "next/link";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavProps {
  items: MenuItem[];
}

const Nav: React.FC<any> = ({ items }) => {
  return (
    <nav className="overflow-y-auto no-scrollbar h-[calc(100vh-20vh)] pb-20">
      <ul className="space-y-2">
        {items.map((item: any, index: any) => (
          <Link
            href={item.href}
            key={index}
            className="flex hover:bg-[#F6F6FF] cursor-pointer px-4 py-3 rounded-[10px] items-center gap-3"
          >
            <div className="flex gap-3 items-center w-[100%]">
              {item.icon}
              <span className="text-[#0A1215] text-sm">{item.label}</span>
            </div>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M1.83331 5.6929C1.83331 3.87344 1.83331 2.96372 2.43741 2.39848C3.0415 1.83325 4.01377 1.83325 5.95831 1.83325C7.90286 1.83325 8.87513 1.83325 9.47922 2.39848C10.0833 2.96372 10.0833 3.87345 10.0833 5.6929V16.3069C10.0833 18.1264 10.0833 19.0361 9.47922 19.6014C8.87513 20.1666 7.90286 20.1666 5.95831 20.1666C4.01377 20.1666 3.0415 20.1666 2.43741 19.6014C1.83331 19.0361 1.83331 18.1264 1.83331 16.3069V5.6929Z"
          fill="#82838A"
        />
        <path
          d="M11.9167 14.1166C11.9167 12.2153 11.9167 11.2646 12.5208 10.6739C13.1249 10.0833 14.0971 10.0833 16.0417 10.0833C17.9862 10.0833 18.9585 10.0833 19.5626 10.6739C20.1667 11.2646 20.1667 12.2153 20.1667 14.1166V16.1333C20.1667 18.0346 20.1667 18.9852 19.5626 19.5759C18.9585 20.1666 17.9862 20.1666 16.0417 20.1666C14.0971 20.1666 13.1249 20.1666 12.5208 19.5759C11.9167 18.9852 11.9167 18.0346 11.9167 16.1333V14.1166Z"
          fill="#82838A"
        />
        <path
          d="M11.9167 5.04158C11.9167 4.04499 11.9167 3.54669 12.0737 3.15362C12.283 2.62954 12.6845 2.21315 13.1899 1.99607C13.5689 1.83325 14.0494 1.83325 15.0104 1.83325H17.0729C18.0339 1.83325 18.5144 1.83325 18.8935 1.99607C19.3988 2.21315 19.8004 2.62954 20.0097 3.15362C20.1667 3.54669 20.1667 4.04499 20.1667 5.04158C20.1667 6.03818 20.1667 6.53648 20.0097 6.92955C19.8004 7.45363 19.3988 7.87002 18.8935 8.0871C18.5144 8.24992 18.0339 8.24992 17.0729 8.24992H15.0104C14.0494 8.24992 13.5689 8.24992 13.1899 8.0871C12.6845 7.87002 12.283 7.45363 12.0737 6.92955C11.9167 6.53648 11.9167 6.03818 11.9167 5.04158Z"
          fill="#82838A"
        />
      </svg>
    ),
  },
  {
    label: "Coupon",
    href: "/coupon",
    icon: (
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M11.8367 0.666748H8.16326C4.6999 0.666748 2.96822 0.666748 1.89229 1.74069C1.08687 2.54461 0.884373 3.71532 0.833462 5.70332C0.826935 5.95819 1.03609 6.16186 1.28318 6.22651C2.07149 6.43267 2.65309 7.14859 2.65309 8.00008C2.65309 8.85157 2.07149 9.56749 1.28318 9.77365C1.03609 9.83827 0.826935 10.042 0.833462 10.2969C0.884373 12.2849 1.08687 13.4555 1.89229 14.2594C2.96822 15.3334 4.6999 15.3334 8.16326 15.3334H11.8367C15.3001 15.3334 17.0317 15.3334 18.1077 14.2594C18.9131 13.4555 19.1156 12.2849 19.1665 10.2969C19.1731 10.042 18.9639 9.83827 18.7167 9.77365C17.9285 9.56749 17.3469 8.85157 17.3469 8.00008C17.3469 7.14859 17.9285 6.43267 18.7167 6.22651C18.9639 6.16186 19.1731 5.95819 19.1665 5.70332C19.1156 3.71532 18.9131 2.54461 18.1077 1.74069C17.0317 0.666748 15.3001 0.666748 11.8367 0.666748Z"
          fill="#434CE7"
        />
      </svg>
    ),
  },
  {
    label: "Discount",
    href: "/discount",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M9.99975 20H13.9998C17.771 20 19.6566 20 20.8282 18.8284C21.9998 17.6569 21.9998 15.7712 21.9998 12C21.9998 11.5581 21.9981 10.392 21.9962 10H1.99999C1.9981 10.392 1.99975 11.5581 1.99975 12C1.99975 15.7712 1.99975 17.6569 3.17132 18.8284C4.3429 20 6.22851 20 9.99975 20Z"
          fill="#82838A"
        />
        <path
          d="M9.99484 4H14.0052C17.7861 4 19.6766 4 20.8512 5.11578C21.6969 5.91916 21.9337 7.07507 22 9V10H2V9C2.0663 7.07507 2.3031 5.91916 3.14881 5.11578C4.3234 4 6.21388 4 9.99484 4Z"
          fill="#82838A"
        />
        <path
          d="M12.5 15.25C12.0858 15.25 11.75 15.5858 11.75 16C11.75 16.4142 12.0858 16.75 12.5 16.75H14C14.4142 16.75 14.75 16.4142 14.75 16C14.75 15.5858 14.4142 15.25 14 15.25H12.5Z"
          fill="#82838A"
        />
        <path
          d="M6 15.25C5.58579 15.25 5.25 15.5858 5.25 16C5.25 16.4142 5.58579 16.75 6 16.75H10C10.4142 16.75 10.75 16.4142 10.75 16C10.75 15.5858 10.4142 15.25 10 15.25H6Z"
          fill="#82838A"
        />
      </svg>
    ),
  },
  {
    label: "Credit",
    href: "/credit",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M12.8379 3.66675H9.16208C5.6965 3.66675 3.96371 3.66675 2.88709 4.74069C2.14581 5.48013 1.91492 6.52986 1.84301 8.24043C1.82875 8.57966 1.82162 8.74928 1.88496 8.86243C1.94831 8.9756 2.2012 9.11683 2.70697 9.39931C3.26868 9.71299 3.64838 10.3123 3.64838 11.0001C3.64838 11.6879 3.26868 12.2872 2.70697 12.6009C2.2012 12.8834 1.94831 13.0245 1.88496 13.1377C1.82162 13.2509 1.82875 13.4205 1.84301 13.7597C1.91492 15.4703 2.14581 16.5201 2.88709 17.2594C3.96371 18.3334 5.69649 18.3334 9.16208 18.3334H12.8379C16.3034 18.3334 18.0362 18.3334 19.1128 17.2594C19.8542 16.5201 20.0851 15.4703 20.1569 13.7597C20.1712 13.4205 20.1784 13.2509 20.115 13.1377C20.0516 13.0245 19.7988 12.8834 19.293 12.6009C18.7312 12.2872 18.3516 11.6879 18.3516 11.0001C18.3516 10.3123 18.7312 9.71299 19.293 9.39931C19.7988 9.11683 20.0516 8.9756 20.115 8.86244C20.1784 8.74928 20.1712 8.57966 20.1569 8.24043C20.0851 6.52986 19.8542 5.48013 19.1128 4.74069C18.0362 3.66675 16.3034 3.66675 12.8379 3.66675Z"
          fill="#82838A"
        />
        <path
          d="M14.2519 7.76386C14.521 8.03234 14.521 8.46765 14.2519 8.73613L8.73814 14.2361C8.46899 14.5046 8.0326 14.5046 7.76345 14.2361C7.4943 13.9676 7.4943 13.5324 7.76345 13.2639L13.2772 7.76386C13.5463 7.49538 13.9827 7.49538 14.2519 7.76386Z"
          fill="#82838A"
        />
        <path
          d="M13.3051 14.2083C13.8126 14.2083 14.224 13.7979 14.224 13.2917C14.224 12.7854 13.8126 12.375 13.3051 12.375C12.7975 12.375 12.3861 12.7854 12.3861 13.2917C12.3861 13.7979 12.7975 14.2083 13.3051 14.2083Z"
          fill="#82838A"
        />
        <path
          d="M8.71027 9.62508C9.21779 9.62508 9.62919 9.21469 9.62919 8.70841C9.62919 8.20216 9.21779 7.79175 8.71027 7.79175C8.20275 7.79175 7.79132 8.20216 7.79132 8.70841C7.79132 9.21469 8.20275 9.62508 8.71027 9.62508Z"
          fill="#82838A"
        />
      </svg>
    ),
  },
];
