"use client";
import React from "react";
import { useQuery } from "react-query";
interface CouponDetails {
  label: string;
  value: string;
}

const ViewCoupon = ({ params }: any) => {
  const { data, error } = useQuery("discount", async () => {
    const response = await fetch(
      `https://e-com-promo-api-57xi.vercel.app/api/v1/coupons/${params.slug}`
    );
    const data = await response.json();
    return data;
  });

  if (error) return <div>Something went wrong...</div>;
  if (!data) return <div>Loading...</div>;
  const couponDetails: CouponDetails[] = [
    { label: "Coupon Type", value: data.discountType || "-" },
    { label: "Generate By", value: "Auto" }, // Assuming this is static
    // { label: "Discount Type", value: data.discountType || "-" },
    { label: "Discount Value", value: `${data.discountValue}%` || "-" },
    { label: "Minimum Purchase", value: `$${data.minimumPurchase || 0}.00` },
    {
      label: "Valid From",
      value: new Date(data.startDate).toLocaleDateString() || "-",
    },
    {
      label: "Valid To",
      value: new Date(data.endDate).toLocaleDateString() || "-",
    },
    { label: "Use Type", value: data.useType || "-" },
    { label: "Valid For Countries", value: data.validForCountry || "-" },
    { label: "Valid on Products", value: data.validOnProducts || "-" },
    { label: "Display on Site", value: data.displayOnSite ? "Yes" : "No" },
    { label: "Coupon Status", value: data.status || "-" },
    { label: "Coupon Redemption Status", value: "Unused" }, // Assuming this is static
    { label: "Description", value: data.description || "-" },
  ];

  return (
    <div className="px-4 py-6">
      <div className="">
        <h2 className="mb-8">
          Details of the Coupon Code - {data?.couponCode}
        </h2>
        <table className="min-w-full bg-white border !rounded-xl">
          <tbody>
            {couponDetails.map((detail, index) => (
              <tr key={index} className={`border-b`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {detail.label}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {detail.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCoupon;
