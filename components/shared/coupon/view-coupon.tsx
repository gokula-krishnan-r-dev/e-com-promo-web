"use client";
import React from "react";
import { useQuery } from "react-query";
interface CouponDetails {
  label: string;
  value: string;
}

const ViewCoupon = ({ params }: any) => {
  const { data, error } = useQuery("coupon", async () => {
    const response = await fetch(
      `https://e-com-promo-api.vercel.app/api/v1/coupons/${params.slug}`
    );
    const data = await response.json();
    return data;
  });

  if (error) return <div>Something went wrong...</div>;
  if (!data) return <div>Loading...</div>;
  const couponDetails: CouponDetails[] = [
    { label: "Coupon Type", value: data?.coupon?.couponTypeDiscount || "-" },
    { label: "Generate By", value: "Auto" }, // Assuming this is static
    { label: "Discount Type", value: data?.coupon?.discountType || "-" },
    {
      label: "Discount Value",
      value: `${data?.coupon?.discountValue}%` || "-",
    },
    {
      label: "Minimum Purchase",
      value: `$${data?.coupon?.minimumPurchase || 0}.00`,
    },
    {
      label: "Valid From",
      value: new Date(data?.coupon?.startDate).toLocaleDateString() || "-",
    },
    {
      label: "Valid To",
      value: new Date(data?.coupon?.endDate).toLocaleDateString() || "-",
    },
    { label: "Use Type", value: data?.coupon?.useType || "-" },
    {
      label: "Valid For Countries",
      value: data?.coupon?.validForCountry || "-",
    },
    { label: "Valid on Products", value: data?.coupon?.validOnProducts || "-" },
    {
      label: "Display on Site",
      value: data?.coupon?.displayOnSite ? "Yes" : "No",
    },
    { label: "Coupon Status", value: data?.coupon?.status || "-" },
    { label: "Coupon Redemption Status", value: "Unused" }, // Assuming this is static
    { label: "Description", value: data?.coupon?.description || "-" },
  ];

  return (
    <div className="px-4 py-6">
      <div className="">
        <h2 className="mb-8">
          Details of the Coupon Code -{" "}
          {data?.coupon?.couponMethod === "self"
            ? `${data?.coupon?.couponCode} `
            : "AUTO" + "-" + data?.coupon?.noOfCoupon}
        </h2>
        <table className="min-w-full bg-white border !rounded-3xl">
          <tbody>
            {couponDetails.map((detail, index) => (
              <tr key={index} className={`border-b flex`}>
                <td className="px-6 py-1 text-sm text-end flex-1 font-semibold text-gray-700">
                  {detail.label}
                </td>
                <td className="px-6 capitalize py-1 text-sm border-l flex-1 text-start text-gray-900">
                  {detail.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className=" pt-8">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm border !rounded-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs rounded-t-xl text-gray-700 border-b uppercase bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Coupon Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.relatedCoupons.map((coupon: any, index: number) => (
                  <tr
                    key={coupon._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index}
                    </th>
                    <td className="px-6 py-4">{coupon.couponCode}</td>
                    <td className="px-6 py-4">
                      {coupon.useCount > 0 ? "unused" : "used"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCoupon;
