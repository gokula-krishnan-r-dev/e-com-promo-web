"use client";
import React from "react";
import { useQuery } from "react-query";
interface CouponDetails {
  label: string;
  value: string;
}
/**
 * Transforms text to capitalize the first letter of each word,
 * replaces underscores with spaces, and allows customization.
 *
 * @param text - The input string to transform.
 * @param options - Optional configuration for transformations.
 * @returns The transformed string.
 */
export function transformText(
  text: string,
  options?: {
    capitalizeEachWord?: boolean; // Capitalize each word (e.g., "hello world" to "Hello World")
    replaceUnderscores?: boolean; // Replace underscores with spaces
  }
): string {
  const { capitalizeEachWord = false, replaceUnderscores = true } =
    options || {};
  if (!text) {
    return "";
  }
  // Step 1: Replace underscores with spaces if enabled
  let transformedText = replaceUnderscores ? text.replace(/_/g, " ") : text;

  // Step 2: Capitalize based on configuration
  if (capitalizeEachWord) {
    transformedText = transformedText
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  } else {
    // Capitalize only the first letter of the string
    transformedText =
      transformedText.charAt(0).toUpperCase() +
      transformedText.slice(1).toLowerCase();
  }

  return transformedText;
}

const ViewCoupon = ({ params }: any) => {
  const { data, error } = useQuery("coupon", async () => {
    const response = await fetch(
      `https://e-com-promo-api-57xi.vercel.app/api/v1/coupons/${params.slug}`
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
        <h2 className="mb-8 font-normal">
          Details of the Coupon Code -{" "}
          {data?.coupon?.couponMethod === "self"
            ? `${data?.coupon?.couponCode} `
            : "AUTO" + "-" + data?.coupon?.noOfCoupon}
        </h2>
        <table className="min-w-full bg-white border !rounded-3xl">
          <tbody>
            {couponDetails.map((detail, index) => (
              <tr key={index} className={`border-b flex`}>
                <td className="px-6 py-1 text-base text-end flex-1 font-medium text-black">
                  {detail.label}
                </td>
                <td className="px-6 capitalize py-1 text-sm border-l flex-1 text-start font-normal text-black">
                  {transformText(detail.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className=" pt-8">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm border !rounded-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs rounded-t-xl text-gray-700 border-b  bg-[#F9FAFB] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 text-center py-3">
                    S.No.
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Coupon Code
                  </th>
                  <th scope="col" className="px-6 text-center py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.relatedCoupons?.map((coupon: any, index: number) => (
                  <tr
                    key={coupon._id}
                    className="bg-white border-b text-sm font-medium dark:bg-gray-800 text-[#4A5367] dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-center dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 text-center  py-4">
                      {coupon.couponCode}
                    </td>
                    <td className="px-6 text-center py-4">
                      {coupon.useCount >= 0 ? "unused" : "used"}
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
