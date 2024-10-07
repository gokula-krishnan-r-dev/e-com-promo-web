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
      subcategories: [
        {
          id: "SUB_DIAMOND_001_001",
          name: "Diamond",
          isChecked: false,
        },
        {
          id: "SUB_SAPPHIRE_001_002",
          name: "Sapphire",
          isChecked: false,
        },
        {
          id: "SUB_EMERALD_001_003",
          name: "Emerald",
          isChecked: false,
        },
        {
          id: "SUB_RUBY_001_004",
          name: "Ruby",
          isChecked: false,
        },
        {
          id: "SUB_AMETHYST_001_005",
          name: "Amethyst",
          isChecked: false,
        },
        {
          id: "SUB_TANZANITE_001_006",
          name: "Tanzanite",
          isChecked: false,
        },
        {
          id: "SUB_AQUAMARINE_001_007",
          name: "Aquamarine",
          isChecked: false,
        },
        {
          id: "SUB_CITRINE_001_008",
          name: "Citrine",
          isChecked: false,
        },
        {
          id: "SUB_OPAL_001_009",
          name: "Opal",
          isChecked: false,
        },
        {
          id: "SUB_TOPAZ_001_010",
          name: "Topaz",
          isChecked: false,
        },
        {
          id: "SUB_PERIDOT_001_011",
          name: "Peridot",
          isChecked: false,
        },
        {
          id: "SUB_GARNET_001_012",
          name: "Garnet",
          isChecked: false,
        },
        {
          id: "SUB_MOONSTONE_001_013",
          name: "Moonstone",
          isChecked: false,
        },
        {
          id: "SUB_TURQUOISE_001_014",
          name: "Turquoise",
          isChecked: false,
        },
        {
          id: "SUB_LAPIS_LAZULI_001_015",
          name: "Lapis Lazuli",
          isChecked: false,
        },
        {
          id: "SUB_AMBER_001_016",
          name: "Amber",
          isChecked: false,
        },
        {
          id: "SUB_JADE_001_017",
          name: "Jade",
          isChecked: false,
        },
      ],
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
      subcategories: [],
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
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Save logic here
              setIsOpen(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
