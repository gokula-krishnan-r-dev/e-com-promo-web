"use client";
import CreditForm from "@/components/shared/coupon/form/credit-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

function Page({ params }: { params: { slug: string } }) {
  const { data, error } = useQuery("discount", async () => {
    const response = await fetch(
      `https://e-com-promo-api-57xi.vercel.app/api/v1/credits/${params.slug}`
    );
    const data = await response.json();
    return data.credit;
  });

  if (error) return <div>Something went wrong...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper title="Discount" button={<AddCouponButton />}>
          <div className="px-1 w-full py-3">
            <CreditForm method={"PUT"} defaultValue={data} />
          </div>
        </HeaderWrapper>
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
