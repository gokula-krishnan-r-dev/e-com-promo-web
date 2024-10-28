"use client";

import dynamic from "next/dynamic";
const HeaderWrapper = dynamic(
  () => import("@/components/shared/coupon/header-wrapper")
);
const SearchDiscount = dynamic(
  () => import("@/components/shared/coupon/search-discount-list")
);
const DiscountTableList = dynamic(
  () => import("@/components/shared/coupon/discount-table-list")
);

import { discountFilters } from "@/content/coupon/search-filter";
import Link from "next/link";
import React from "react";

const Coupon: React.FC = () => {
  const handleSearch = (values: Record<string, string>) => {
    console.log("Search Values:", values);
  };

  return (
    <main className="px-2 py-2">
      <HeaderWrapper title="Discount List" button={<AddCouponButton />}>
        <SearchDiscount filters={discountFilters} onSearch={handleSearch} />
        <DiscountTableList edit={"/discount/edit"} />
      </HeaderWrapper>
    </main>
  );
};

// Refactored button into its own reusable component
const AddCouponButton: React.FC = () => (
  <div className="flex items-center gap-6">
    <Link
      href="/discount/firstorder"
      className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.72848 16.1369C3.18295 14.5914 2.41018 13.8186 2.12264 12.816C1.83509 11.8134 2.08083 10.7485 2.57231 8.61875L2.85574 7.39057C3.26922 5.59881 3.47597 4.70292 4.08944 4.08944C4.70292 3.47597 5.59881 3.26922 7.39057 2.85574L8.61875 2.57231C10.7485 2.08083 11.8134 1.83509 12.816 2.12264C13.8186 2.41018 14.5914 3.18295 16.1369 4.72848L17.9665 6.55812C20.6555 9.24711 22 10.5916 22 12.2623C22 13.933 20.6555 15.2775 17.9665 17.9665C15.2775 20.6555 13.933 22 12.2623 22C10.5916 22 9.24711 20.6555 6.55812 17.9665L4.72848 16.1369Z"
          stroke="white"
          stroke-width="1.5"
        />
        <path
          d="M10.0214 10.2931C10.8025 9.51207 10.8025 8.24574 10.0214 7.46469C9.2404 6.68364 7.97407 6.68364 7.19302 7.46469C6.41197 8.24574 6.41197 9.51207 7.19302 10.2931C7.97407 11.0742 9.2404 11.0742 10.0214 10.2931Z"
          stroke="white"
          stroke-width="1.5"
        />
        <path
          d="M11.5417 18.5007L18.5208 11.5215"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      First Order Discount
    </Link>
    <Link
      href="/discount/create"
      className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
    >
      <AddCouponIcon />
      Add Discount
    </Link>
  </div>
);

// SVG icon component for reuse
const AddCouponIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
    <path
      d="M12 9V15M9 12H15"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default Coupon;
