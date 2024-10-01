import CreditForm from "@/components/shared/coupon/form/credit-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper title="Discount" button={<AddCouponButton />}>
          <div className="px-1 w-full py-3">
            <CreditForm />
          </div>
        </HeaderWrapper>
      </div>
    </main>
  );
};

// Refactored button into its own reusable component
const AddCouponButton: React.FC = () => (
  <Link
    href="/discount/create"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    View Discount List
  </Link>
);

export default page;