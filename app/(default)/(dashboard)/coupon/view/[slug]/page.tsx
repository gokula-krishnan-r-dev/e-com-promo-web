"use client";
import HeaderWrapper from "@/components/shared/coupon/header-wrapper";
import ViewCoupon from "@/components/shared/coupon/view-coupon";
import Link from "next/link";
import React from "react";

function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="px-6 py-3" id="coupon-content">
      <div className="">
        <HeaderWrapper title="View Coupon" button={<ViewCouponButton />}>
          <div className="px-1 w-full py-3">
            <ViewCoupon params={params} />
          </div>
        </HeaderWrapper>
      </div>
    </main>
  );
}

export default Page;

// Refactored button into its own reusable component
const ViewCouponButton: React.FC = () => (
  <Link
    href="/coupon"
    className="bg-gradient-to-r from-[#316BEB] to-[#2964ED] text-white px-4 py-2 flex items-center text-sm gap-2 rounded-lg font-semibold"
  >
    View Coupon List
  </Link>
);
