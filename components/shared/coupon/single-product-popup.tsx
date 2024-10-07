import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "./product-popup";
import ProoductList from "./list-product";
import { Close } from "@radix-ui/react-dialog";
import React from "react";
export function Singleproduct({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
}: any) {
  const [category, setCategory] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [productSku, setProductSku] = React.useState("");
  const categoryList = categories.categories.map((category: any) => (
    <SelectItem key={category.id} value={category.id}>
      {category.name}
    </SelectItem>
  ));

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[1225px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="">
            <Label>Product Category</Label>

            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category List" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>{categoryList}</SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label>Product Name</Label>

            <Input
              value={formData.name}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div className="">
            <Label>Product SKU</Label>
            <Input
              value={formData.price}
              onChange={(e) => setProductSku(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <ProoductList
            product={product}
            productSku={productSku}
            category={category}
            setFormData={setFormData}
            formData={formData}
          />
        </div>

        <Close>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </Button>
        </Close>
      </DialogContent>
    </Dialog>
  );
}
