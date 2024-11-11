"use client";
import DiscountForm from "@/components/shared/coupon/form/discount-form";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import Loading from "@/components/ui/loading";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

function Page({ params }: { params: { slug: string } }) {
  const { data, error } = useQuery("discount", async () => {
    const response = await fetch(
      `https://e-com-promo-api-57xi.vercel.app/api/v1/discounts/${params.slug}`
    );
    const data = await response.json();
    return data.discount;
  });

  if (error) return <div>Something went wrong...</div>;
  if (!data) return <Loading />;

  return (
    <main className="px-6 py-3">
      <div className="">
        <HeaderWrapper title="View Credit" button={<AddCouponButton />}>
          <div className="px-1 w-full py-3">
            <DiscountForm method={"view"} defaultValue={data} />
          </div>
        </HeaderWrapper>
      </div>
    </main>
  );
}

const AddCouponButton: React.FC = () => (
  <Link
    href="/credit"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    View Credit List
  </Link>
);

export default Page;
