"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Joi from "joi";
import { toast } from "sonner";

interface Discount {
  id: string;
  cartAmount: number;
  discountPercentage: number;
  validForCountry?: string;
  startDate: string;
  endDate: string;
  [key: string]: any; // For additional properties
}

interface DiscountContextProps {
  discounts: Discount[];
  filtersD: Record<string, any>;
  refetch: () => void;
  setFilters: (filters: Record<string, any>) => void;
  searchDiscounts: (filters: Record<string, any>) => void;
  setSelectedRow: (selectedRow: any) => void;
  selectedRow: any;
  setRowSelection: (rowSelection: Record<string, any>) => void;
  rowSelection: Record<string, any>;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  limit: number;
  page: number;
  totalPages: number;
  firstOrderDiscounts: any;
}

const DiscountContext = createContext<DiscountContextProps | undefined>(
  undefined
);

export const useDiscountContext = (): DiscountContextProps => {
  const context = useContext(DiscountContext);
  if (!context) {
    throw new Error(
      "useDiscountContext must be used within a DiscountProvider"
    );
  }
  return context;
};

const validateDiscountSearch = Joi.object({
  cartAmount: Joi.number().optional(),
  discountPercentage: Joi.number().optional(),
  validForCountry: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  sortBy: Joi.string()
    .valid("startDate", "endDate", "cartAmount", "discountPercentage")
    .default("startDate")
    .optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("desc").optional(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
});

export const DiscountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState<any>(new Set());
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filtersD, setFilters] = useState<any>({
    sortBy: "startDate",
    sortOrder: "desc",
    page,
    limit,
  });

  useEffect(() => {
    // Update filtersC whenever page or limit changes
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      page,
      limit,
    }));
  }, [page, limit]);

  const fetchDiscounts = async (filters: Record<string, any>) => {
    const response = await fetch(
      `https://e-com-promo-api.vercel.app/api/v1/discounts?${new URLSearchParams(
        filters
      )}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch discounts");
    }
    const data = await response.json();
    setDiscounts(data.discounts);
    setTotalPages(data?.pagination?.totalPages);
    return data;
  };

  const { refetch } = useQuery(
    ["discount", { page: filtersD.page, limit: filtersD.limit }],
    () => fetchDiscounts(filtersD),
    { keepPreviousData: true }
  );

  const fetchFirstOrderDiscounts = async (filters: Record<string, any>) => {
    const response = await fetch(
      `https://e-com-promo-api.vercel.app/api/v1/discounts/first-order-discounts?${new URLSearchParams(
        filters
      )}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch first order discounts");
    }
    const data = await response.json();

    return data.discount;
  };

  const { data: firstOrderDiscounts } = useQuery(
    ["firstOrderDiscounts", { page: filtersD.page, limit: filtersD.limit }],
    () => fetchFirstOrderDiscounts(filtersD),
    { keepPreviousData: true }
  );

  const searchDiscounts = (filters: Record<string, any>) => {
    const { error, value } = validateDiscountSearch.validate(filters);
    // if (error) {
    //   error.details.map((err) => toast.error(err.message));
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
    <DiscountContext.Provider
      value={{
        discounts,
        searchDiscounts,
        refetch,
        setFilters,
        filtersD,
        setSelectedRow,
        selectedRow,
        rowSelection,
        setRowSelection,
        setLimit,
        setPage,
        limit,
        page,
        totalPages,
        firstOrderDiscounts,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
