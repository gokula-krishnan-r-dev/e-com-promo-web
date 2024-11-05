"use client";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import SearchCoupon from "@/components/shared/coupon/search-list";
import TableList from "@/components/shared/coupon/table-list";
import { filters } from "@/content/coupon/search-filter";
import Link from "next/link";
import React from "react";

const Coupon: React.FC = () => {
  const handleSearch = (values: Record<string, string>) => {
    console.log("Search Values:", values);
  };

  return (
    <main className="mx-4 my-4">
      <HeaderWrapper title="Coupon" button={<AddCouponButton />}>
        <SearchCoupon filters={filters} onSearch={handleSearch} />
        <TableList />
      </HeaderWrapper>
    </main>
  );
};

// Refactored button into its own reusable component
const AddCouponButton: React.FC = () => (
  <Link
    href="/coupon/create"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    <AddCouponIcon />
    Add Coupon
  </Link>
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
