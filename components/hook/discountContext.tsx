"use client";
import React, { createContext, useContext, useState } from "react";
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
  const [filtersD, setFilters] = useState<any>({
    sortBy: "startDate",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });

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
    return data;
  };

  const { refetch } = useQuery(
    ["discount", { page: filtersD.page, limit: filtersD.limit }],
    () => fetchDiscounts(filtersD),
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
      value={{ discounts, searchDiscounts, refetch, setFilters, filtersD }}
    >
      {children}
    </DiscountContext.Provider>
  );
};
