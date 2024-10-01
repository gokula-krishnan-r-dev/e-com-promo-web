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

import { creditFilters, discountFilters } from "@/content/coupon/search-filter";
import Link from "next/link";
import React from "react";
import CreditTableList from "@/components/shared/coupon/credit-table-list";
import SearchCredit from "@/components/shared/coupon/search-credit-list";

const Coupon: React.FC = () => {
  const handleSearch = (values: Record<string, string>) => {
    console.log("Search Values:", values);
  };

  return (
    <main className="px-2 py-2">
      <HeaderWrapper title="Credit" button={<AddCouponButton />}>
        <SearchCredit filters={creditFilters} onSearch={handleSearch} />
        <CreditTableList edit={"/credit/edit"} />
      </HeaderWrapper>
    </main>
  );
};

// Refactored button into its own reusable component
const AddCouponButton: React.FC = () => (
  <div className="flex items-center gap-6">
    <Link
      href="/credit/create"
      className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
    >
      <AddCouponIcon />
      Add Credit
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
