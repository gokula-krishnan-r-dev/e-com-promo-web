import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Close } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
  id: string;
  name: string;
  isChecked: boolean;
  subcategories?: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  isChecked: boolean;
}

interface ProductDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  formData: {
    name: string;
    categories: Category[];
  };
  setFormData: (data: any) => void;
}

export const categories = {
  _id: "COUPON_12345",
  name: "Category Coupon",
  categories: [
    {
      id: "CAT_GEMSTONES_001",
      name: "Gemstones",
      isChecked: false,
    },
    {
      id: "CAT_JEWELRY_002",
      name: "Jewelry",
      subcategories: [
        {
          id: "SUB_RING_002_001",
          name: "Rings",
          isChecked: false,
        },
        {
          id: "SUB_EARRINGS_002_002",
          name: "Earrings",
          isChecked: false,
        },
        {
          id: "SUB_PENDANTS_002_003",
          name: "Pendants",
          isChecked: false,
        },
        {
          id: "SUB_RING_BAND_002_004",
          name: "Ring Band",
          isChecked: false,
        },
        {
          id: "SUB_CHAIN_002_005",
          name: "Chain",
          isChecked: false,
        },
        {
          id: "SUB_HOOP_002_006",
          name: "Huggie Hoop",
          isChecked: false,
        },
        {
          id: "SUB_SILVER_JEWELRY_002_007",
          name: "Silver Jewelry",
          isChecked: false,
        },
      ],
      isChecked: true,
    },
    {
      id: "CAT_SEMI_MOUNTS_003",
      name: "Semi-Mounts",
      subcategories: [
        {
          id: "SUB_SEMI_RING_003_001",
          name: "Rings",
          isChecked: false,
        },
        {
          id: "SUB_SEMI_EARRINGS_003_002",
          name: "Earrings",
          isChecked: false,
        },
        {
          id: "SUB_SEMI_PENDANTS_003_003",
          name: "Pendants",
          isChecked: false,
        },
        {
          id: "SUB_MENS_RING_003_004",
          name: "Men's Ring",
          isChecked: false,
        },
      ],
      isChecked: false,
    },
    {
      id: "CAT_DROPS_BEADS_004",
      name: "Drops & Beads",
      subcategories: [
        //Pairs
        {
          id: "SUB_PAIRS_004_001",
          name: "Pairs",
          isChecked: false,
        },
        // Single
        {
          id: "SUB_SINGLE_004_002",
          name: "Single",
          isChecked: false,
        },
        // lines
        {
          id: "SUB_LINES_004_003",
          name: "Lines",
          isChecked: false,
        },
        // Beads
        {
          id: "SUB_BEADS_004_004",
          name: "Beads",
          isChecked: false,
        },
      ],
      isChecked: false,
    },
    {
      id: "CAT_FINDINGS_005",
      name: "Findings",
      subcategories: [
        {
          id: "SUB_FINDINGS_EARRINGS_005_001",
          name: "Earrings",
          isChecked: false,
        },
        {
          id: "SUB_FINDINGS_PENDANTS_005_002",
          name: "Pendants",
          isChecked: false,
        },
        {
          id: "SUB_FINDINGS_BACKING_005_003",
          name: "Backing",
          isChecked: false,
        },
      ],
      isChecked: false,
    },
  ],
};

export function ProductDialog({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
}: ProductDialogProps) {
  const handleCategoryToggle = (categoryId: string) => {
    // Toggle the category in the `categories.categories` array
    const updatedCategories = categories.categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, isChecked: !category.isChecked }; // Toggle isChecked
      }
      return category; // Return the category as is if not toggled
    });

    // Filter out any `null` values from `updatedCategories`
    const removeUndefined = updatedCategories.filter((item) => item !== null);

    // Check if the category is already in formData.categories
    const isCategoryExists = formData?.categories?.some(
      (item: any) => item.id === categoryId
    );

    // Update the `formData.categories` array
    setFormData((prevData: any) => {
      const existingCategories = prevData?.categories || []; // Default to an empty array if undefined

      // If the category is checked, we want to add it to the formData
      if (isCategoryExists) {
        // If it exists, filter it out to remove it from formData
        return {
          ...prevData,
          categories: existingCategories.filter(
            (item: any) => item.id !== categoryId
          ),
        };
      } else {
        // If it does not exist, find the toggled category and add it to formData
        const toggledCategory = removeUndefined.find(
          (cat) => cat.id === categoryId
        );

        return {
          ...prevData,
          categories: [
            ...existingCategories, // Keep existing categories
            toggledCategory, // Add the toggled category
          ].filter(Boolean), // Filter out any potential undefined/null values
        };
      }
    });
  };

  const handleSubcategoryToggle = (
    categoryId: string,
    subcategoryId: string
  ) => {
    const updatedCategories = categories.categories.map((category) => {
      if (category.id === categoryId) {
        // Toggle isChecked for the matching subcategory
        const updatedSubcategories = category.subcategories?.map((sub) => {
          if (sub.id === subcategoryId) {
            return { ...sub, isChecked: !sub.isChecked }; // Toggle the isChecked value
          }
          return null; // Return the subcategory as is if no toggle
        });

        return { ...category, subcategories: updatedSubcategories }; // Update the category with new subcategories
      }
      return null; // Return category as is if not matching categoryId
    });

    // Filter out any `null` or `undefined` values from `updatedCategories`
    const removeUndefined = updatedCategories.filter((item) => item !== null);

    // Check if the subcategory is being added to the formData
    const isSubcategoryExists = categories.categories.some((item: any) =>
      item.subcategories?.some((sub: any) => sub?.id === subcategoryId)
    );

    if (!isSubcategoryExists) {
      // If it doesn't exist, find the category and add the new subcategory
      const categoryToUpdate: any = categories.categories.find(
        (item: any) => item?.id === categoryId
      );
      if (categoryToUpdate) {
        // Add the new subcategory to the existing category
        const newSubcategory = {
          id: subcategoryId,
          name: `New Subcategory ${subcategoryId}`,
          isChecked: true,
        }; // Define how to create new subcategory
        categoryToUpdate.subcategories.push(newSubcategory);
      }
    }

    // Update the `formData.categories` array
    setFormData((prevData: any) => ({
      ...prevData,
      categories: [
        // Spread the newly updated categories
        ...removeUndefined,
        // Filter out the toggled subcategory from the previous formData
        ...(prevData?.categories || []).filter((item: any) =>
          item?.subcategories?.some(
            (subItem: any) => subItem?.id !== subcategoryId
          )
        ),
      ],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[1225px] bg-white rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Select Categories
          </DialogTitle>
          <DialogDescription>
            Select the categories and subcategories you want to apply the coupon
            to.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          <div className="grid gap-6 py-6">
            {/* Categories Section */}
            <div className=" border-gray-200 text-[#4A5367] pt-4">
              {categories.categories.map((category) => (
                <div key={category.id} className="mb-4 ">
                  <div className="flex items-center bg-[#DFDFDF] py-3 rounded px-4 ">
                    <Checkbox
                      checked={formData?.categories
                        ?.filter(Boolean)
                        .some((item: any) => item?.id === category?.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                      className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label className="ml-2 text-black text-md font-semibold">
                      {category.name}
                    </Label>
                  </div>

                  {/* Subcategories */}
                  {category.subcategories && (
                    <div className="ml-6 flex flex-wrap py-2 gap-4 items-center space-y-2">
                      {category.subcategories.map((sub) => (
                        <div key={sub.id} className="flex items-center">
                          <Checkbox
                            color="blue"
                            checked={formData?.categories?.some(
                              (item: any) =>
                                item?.id === category?.id &&
                                item?.subcategories
                                  ?.filter(Boolean)
                                  .some((subItem: any) => subItem.id === sub.id)
                            )}
                            onCheckedChange={() =>
                              handleSubcategoryToggle(category.id, sub.id)
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <Label className="ml-2  text-sm font-medium">
                            {sub.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => setIsOpen(false)}
            className=" bg-white border shadow-none rounded-xl text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Save logic here
              setIsOpen(false);
            }}
            className="bg-[#316BEB] flex items-center gap-3 px-4 hover:bg-blue-700 shadow-none rounded-xl text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.88702 17.1132C4.1074 18.3337 6.07158 18.3337 9.99996 18.3337C13.9283 18.3337 15.8925 18.3337 17.1129 17.1132C18.3333 15.8929 18.3333 13.9287 18.3333 10.0003C18.3333 9.71574 18.3333 9.57349 18.3206 9.42883C18.2618 8.75441 17.9883 8.09413 17.553 7.57561C17.4596 7.46438 17.3566 7.3613 17.1505 7.15514L12.8451 2.84986C12.639 2.64371 12.5359 2.54062 12.4247 2.44725C11.9061 2.01199 11.2459 1.7385 10.5715 1.67962C10.4268 1.66699 10.2845 1.66699 9.99996 1.66699C6.07158 1.66699 4.1074 1.66699 2.88702 2.88738C1.66663 4.10777 1.66663 6.07195 1.66663 10.0003C1.66663 13.9287 1.66663 15.8929 2.88702 17.1132Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M14.1667 18.3337V17.5003C14.1667 15.929 14.1667 15.1433 13.6785 14.6552C13.1904 14.167 12.4047 14.167 10.8334 14.167H9.16671C7.59536 14.167 6.80968 14.167 6.32153 14.6552C5.83337 15.1433 5.83337 15.929 5.83337 17.5003V18.3337"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M5.83337 6.66699H10.8334"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            Save
          </Button>{" "}
        </div>
      </DialogContent>
    </Dialog>
  );
}
