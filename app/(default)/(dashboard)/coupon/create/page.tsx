import AnniversayCouponForm from "@/components/shared/coupon/form/anniversary-coupon-form";
import BirthdayCouponForm from "@/components/shared/coupon/form/birthdate-coupon-form";
import GeneCouponForm from "@/components/shared/coupon/form/gene-coupon-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import DynamicTabs from "@/components/shared/coupon/tabs";
import Link from "next/link";
import React from "react";

const tabData = [
  {
    label: "General Coupons",
    value: "general",
    content: <GeneCouponForm />,
  },
  {
    label: "Birthday Coupons",
    value: "birthday",
    content: <BirthdayCouponForm />,
  },
  {
    label: "Anniversary Coupons",
    value: "anniversary",
    content: <AnniversayCouponForm />,
  },
];

const page = () => {
  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper title="Coupon" button={<AddCouponButton />}>
          <div className="px-1 w-full py-3">
            <DynamicTabs defaultValue="general" tabs={tabData} />
          </div>
        </HeaderWrapper>
      </div>
    </main>
  );
};

// Refactored button into its own reusable component
const AddCouponButton: React.FC = () => (
  <Link
    href="/coupon/create"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    View Coupon List
  </Link>
);

export default page;
