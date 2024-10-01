"use client";
import AnniversayCouponForm from "@/components/shared/coupon/form/anniversary-coupon-form";
import BirthdayCouponForm from "@/components/shared/coupon/form/birthdate-coupon-form";
import GeneCouponForm from "@/components/shared/coupon/form/gene-coupon-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import DynamicTabs from "@/components/shared/coupon/tabs";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

function Page({ params }: { params: { slug: string } }) {
  const { data, error } = useQuery("discount", async () => {
    const response = await fetch(
      `https://e-com-promo-api.vercel.app/api/v1/coupons/${params.slug}`
    );
    const data = await response.json();
    return data;
  });

  if (error) return <div>Something went wrong...</div>;
  if (!data) return <div>Loading...</div>;
  const tabData = [
    {
      label: "General Coupons",
      value: "general",
      content: <GeneCouponForm method={"PUT"} defaultValue={data} />,
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

  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper title="Coupon" button={<AddCouponButton />}>
          <div className="px-1 w-full py-3">
            <DynamicTabs defaultValue="birthday" tabs={tabData} />
          </div>
        </HeaderWrapper>
        {/* <div className="px-1 w-full py-3">
            <CreditForm method={"PUT"} defaultValue={data} />
          </div>
        </HeaderWrapper> */}
      </div>
    </main>
  );
}

// Refactored button into its own reusable component
const AddCouponButton: React.FC = () => (
  <Link
    href="/discount/create"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    View Discount List
  </Link>
);

export default Page;
