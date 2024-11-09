"use client";
import AnniversayCouponForm from "@/components/shared/coupon/form/anniversary-coupon-form";
import BirthdayCouponForm from "@/components/shared/coupon/form/birthdate-coupon-form";
import GeneCouponForm from "@/components/shared/coupon/form/gene-coupon-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import DynamicTabs from "@/components/shared/coupon/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

function Page({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const { data, error } = useQuery("coupon", async () => {
    const response = await fetch(
      `https://e-com-promo-api-57xi.vercel.app/api/v1/coupons/${params.slug}`
    );
    const data = await response.json();
    return data?.coupon;
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
      content: <BirthdayCouponForm method={"PUT"} defaultValue={data} />,
    },
    {
      label: "Anniversary Coupons",
      value: "anniversary",
      content: <AnniversayCouponForm method={"PUT"} defaultValue={data} />,
    },
  ];

  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper title="Edit Coupon" button={<AddCouponButton />}>
          <div className="px-1 w-full py-3">
            <DynamicTabs
              method={"PUT"}
              defaultValue={id || "general"}
              tabs={tabData}
            />
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
    href="/coupon"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    View Coupon List
  </Link>
);

export default Page;
