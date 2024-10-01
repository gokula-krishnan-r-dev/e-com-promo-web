import DiscountForm from "@/components/shared/coupon/form/discount-form";
import FirstOrderDiscountForm from "@/components/shared/coupon/form/first-order-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper
          title="Manage First Order Discount"
          button={<AddCouponButton />}
        >
          <div className="px-1 w-full py-3">
            <FirstOrderDiscountForm />
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
    View First Order Discount List
  </Link>
);

export default page;
