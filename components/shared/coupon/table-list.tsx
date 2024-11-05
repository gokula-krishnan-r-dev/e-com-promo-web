import React from "react";
import DynamicTabs from "./tabs";
import { CouponTable } from "./table/coupon-table";
import { useCouponContext } from "@/components/hook/CouponContext";
import { CouponColumnstable } from "@/content/coupon/coupon-column";
import { toast } from "sonner";

const TableList = () => {
  const { coupons, selectedRow, refetch, setRowSelection } = useCouponContext();

  const tabData = [
    {
      label: "Flat Discount (No Min Purchase)",
      value: "flat_no_min",
      filter: "FLAT_DISCOUNT_NO_MIN",
      content: (
        <CouponTable
          data={coupons}
          filter={"FLAT_DISCOUNT_NO_MIN"}
          column={CouponColumnstable}
        />
      ),
    },
    {
      label: "Flat Discount (With Min Purchase)",
      value: "flat_with_min",
      filter: "FLAT_DISCOUNT_WITH_MIN",
      content: <CouponTable data={coupons} filter={"FLAT_DISCOUNT_WITH_MIN"} />,
    },
    {
      label: "Free Shipping",
      value: "free_shipping",
      filter: "FREE_SHIPPING",
      content: <CouponTable data={coupons} filter={"FREE_SHIPPING"} />,
    },
    {
      label: "Birthday Coupon List",
      value: "birthday_coupon",
      filter: "BIRTHDAY",
      content: <CouponTable data={coupons} filter={"BIRTHDAY"} />,
    },
    {
      label: "Anniversary Coupon List",
      value: "anniversary_coupon",
      filter: "ANNIVERSARY",
      content: <CouponTable data={coupons} filter={"ANNIVERSARY"} />,
    },
  ];
  console.log(selectedRow, "rowSelection");
  const handleToDeleteSelectedRow = async () => {
    // Check if there are any selected rows
    if (!selectedRow || selectedRow.size === 0) {
      toast.error("No rows selected for deletion.");
      return;
    }

    // Convert Set to array for processing
    const ListIds = Array.from(selectedRow);

    try {
      // Optional: Add a loading state to block further UI interactions
      toast.info("Deleting selected coupons...");

      // Use Promise.all to handle multiple deletions concurrently
      const deletePromises = ListIds.map(async (id) => {
        const response = await fetch(
          `https://e-com-promo-api.vercel.app/api/v1/coupons/${id}`,
          {
            method: "DELETE",
          }
        );

        // Check for errors
        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            `Failed to delete coupon with ID: ${id}. Error: ${
              error.message || "Unknown error"
            }`
          );
        }

        return response.json(); // Parse the JSON response
      });

      // Await all deletions
      await Promise.all(deletePromises);
      setRowSelection({});
      // Notify success
      toast.success("All selected coupons deleted successfully!");

      // Optionally, refetch the data after successful deletion
      refetch();
    } catch (error: any) {
      // Handle errors and show detailed message
      console.error("Error deleting coupons:", error);
      toast.error(
        error.message || "Something went wrong while deleting coupons."
      );
    }
  };

  return (
    <div className="px-2 py-3">
      <div className="flex items-center justify-between py-4 w-full">
        <h2 className="text-base font-semibold">Existing Coupons</h2>
        {selectedRow.size > 0 && (
          <div className="flex  items-center">
            <button className="border p-2 rounded-l-xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827"
                  stroke="#475467"
                  stroke-width="1.5"
                />
                <path
                  d="M9 10H6"
                  stroke="#475467"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M19 14H5"
                  stroke="#475467"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M18.75 14C18.75 13.5858 18.4142 13.25 18 13.25C17.5858 13.25 17.25 13.5858 17.25 14H18.75ZM6.75 14C6.75 13.5858 6.41421 13.25 6 13.25C5.58579 13.25 5.25 13.5858 5.25 14H6.75ZM17.25 16C17.25 17.4354 17.2484 18.4365 17.1469 19.1919C17.0482 19.9257 16.8678 20.3142 16.591 20.591L17.6517 21.6517C18.2536 21.0497 18.5125 20.2919 18.6335 19.3918C18.7516 18.5132 18.75 17.393 18.75 16H17.25ZM12 22.75C13.393 22.75 14.5132 22.7516 15.3918 22.6335C16.2919 22.5125 17.0497 22.2536 17.6517 21.6517L16.591 20.591C16.3142 20.8678 15.9257 21.0482 15.1919 21.1469C14.4365 21.2484 13.4354 21.25 12 21.25V22.75ZM12 2.75C13.4354 2.75 14.4365 2.75159 15.1919 2.85315C15.9257 2.9518 16.3142 3.13225 16.591 3.40901L17.6517 2.34835C17.0497 1.74643 16.2919 1.48754 15.3918 1.36652C14.5132 1.24841 13.393 1.25 12 1.25V2.75ZM12 1.25C10.607 1.25 9.48678 1.24841 8.60825 1.36652C7.70814 1.48754 6.95027 1.74643 6.34835 2.34835L7.40901 3.40901C7.68577 3.13225 8.07434 2.9518 8.80812 2.85315C9.56347 2.75159 10.5646 2.75 12 2.75V1.25ZM5.25 16C5.25 17.393 5.24841 18.5132 5.36652 19.3918C5.48754 20.2919 5.74643 21.0497 6.34835 21.6517L7.40901 20.591C7.13225 20.3142 6.9518 19.9257 6.85315 19.1919C6.75159 18.4365 6.75 17.4354 6.75 16H5.25ZM12 21.25C10.5646 21.25 9.56347 21.2484 8.80812 21.1469C8.07435 21.0482 7.68577 20.8678 7.40901 20.591L6.34835 21.6517C6.95027 22.2536 7.70814 22.5125 8.60825 22.6335C9.48678 22.7516 10.607 22.75 12 22.75V21.25ZM18.7323 5.97741C18.6859 4.43521 18.5237 3.22037 17.6517 2.34835L16.591 3.40901C17.0016 3.8196 17.1859 4.4579 17.233 6.02259L18.7323 5.97741ZM6.76698 6.02259C6.81413 4.4579 6.99842 3.8196 7.40901 3.40901L6.34835 2.34835C5.47633 3.22037 5.31413 4.43521 5.26766 5.97741L6.76698 6.02259ZM18.75 16V14H17.25V16H18.75ZM6.75 16V14H5.25V16H6.75Z"
                  fill="#475467"
                />
                <path
                  d="M17 11C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9C16.4477 9 16 9.44772 16 10C16 10.5523 16.4477 11 17 11Z"
                  fill="#475467"
                />
                <path
                  d="M15 16.5H9"
                  stroke="#475467"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M13 19H9"
                  stroke="#475467"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
            <button
              onClick={handleToDeleteSelectedRow}
              className="p-2 border rounded-r-xl"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.3333 5.00008V4.33341C12.3333 3.39999 12.3333 2.93328 12.1517 2.57676C11.9919 2.26316 11.7369 2.00819 11.4233 1.8484C11.0668 1.66675 10.6001 1.66675 9.66667 1.66675H8.33333C7.39991 1.66675 6.9332 1.66675 6.57668 1.8484C6.26308 2.00819 6.00811 2.26316 5.84832 2.57676C5.66667 2.93328 5.66667 3.39999 5.66667 4.33341V5.00008M7.33333 9.58342V13.7501M10.6667 9.58342V13.7501M1.5 5.00008H16.5M14.8333 5.00008V14.3334C14.8333 15.7335 14.8333 16.4336 14.5608 16.9684C14.3212 17.4388 13.9387 17.8212 13.4683 18.0609C12.9335 18.3334 12.2335 18.3334 10.8333 18.3334H7.16667C5.76654 18.3334 5.06647 18.3334 4.53169 18.0609C4.06129 17.8212 3.67883 17.4388 3.43915 16.9684C3.16667 16.4336 3.16667 15.7335 3.16667 14.3334V5.00008"
                  stroke="#475467"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="">
        <DynamicTabs defaultValue="flat_no_min" tabs={tabData} />
      </div>
    </div>
  );
};

export default TableList;
