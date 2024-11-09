"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import Joi from "joi";
import { toast } from "sonner";
import { set } from "date-fns";

interface Coupon {
  id: string;
  name: string;
  discount: number;
  status: string;
  couponCode: string;
  couponType: string;
  validForCountry?: string;
  useType: string;
  createdAt: string;
  startDate?: string;
  [key: string]: any; // For additional properties
}

interface CouponContextProps {
  coupons: Coupon[];
  filtersC: Record<string, any>;
  refetch: () => void;
  setFilters: (filters: Record<string, any>) => void;
  searchCoupons: (filters: Record<string, any>) => void;
  setRowSelection: (rowSelection: Record<string, any>) => void;
  rowSelection: Record<string, any>;
  setSelectedRow: (selectedRow: any) => void;
  selectedRow: any;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  limit: number;
  page: number;
  totalPages: number;
  isLoading?: boolean;
}

const CouponContext = createContext<CouponContextProps | undefined>(undefined);

export const useCouponContext = (): CouponContextProps => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
};

const validateCouponSearch = Joi.object({
  couponCode: Joi.string().optional(),
  validForCountry: Joi.string().optional(),
  status: Joi.string().valid("ACTIVE", "INACTIVE").optional(),
  useType: Joi.string().valid("ONE_TIME", "MULTIPLE").optional(),
  filter: Joi.string()
    .valid(
      "FLAT_DISCOUNT_NO_MIN",
      "FLAT_DISCOUNT_WITH_MIN",
      "FREE_SHIPPING",
      "BIRTHDAY",
      "ANNIVERSARY"
    )
    .optional(),
  sortBy: Joi.string()
    .valid("createdAt", "discountValue", "startDate")
    .default("createdAt")
    .optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("desc").optional(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
});

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [selectedRow, setSelectedRow] = useState<any>(new Set());
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filtersC, setFilters] = useState<any>({
    filter: "FLAT_DISCOUNT_WITH_MIN",
    sortBy: "createdAt",
    sortOrder: "desc",
    page,
    limit,
  });
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // Update filtersC whenever page or limit changes
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      page,
      limit,
    }));
  }, [page, limit]);

  const fetchCoupons = async (filters: Record<string, any>) => {
    const response = await fetch(
      `https://e-com-promo-api-57xi.vercel.app/api/v1/coupons?${new URLSearchParams(
        filters
      )}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch coupons");
    }
    const data = await response.json();

    setCoupons(data.data);
    setTotalPages(data?.pagination?.totalPages);
    return data;
  };

  const { refetch, isLoading } = useQuery(["coupon", filtersC], () =>
    fetchCoupons(filtersC)
  );

  const searchCoupons = (filters: Record<string, any>) => {
    const { error, value } = validateCouponSearch.validate(filters);
    // if (error) {
    //   error.details.forEach((err) => toast.error(err.message));
    //   console.error(
    //     "Invalid search query:",
    //     error.details.map((err) => err.message)
    //   );
    //   return;
    // }
    setFilters(value);
    refetch();
  };

  return (
    <CouponContext.Provider
      value={{
        coupons,
        searchCoupons,
        refetch,
        setFilters,
        filtersC,
        setRowSelection,
        rowSelection,
        setSelectedRow,
        selectedRow,
        setLimit,
        setPage,
        limit,
        page,
        totalPages,
        isLoading,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
