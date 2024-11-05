import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

// Type definition for a product
interface Product {
  id: string; // Assuming there's an 'id' field for product
  prodName: string;
  prodPrice: number;
  prodDesc: string;
  prodSku: string;
  amazon: string;
  jRingSize: string;
  prodMetalColor: {
    images: {
      imageFileName: string;
      dfltImage: string;
    }[];
  }[];
}

// Card component for individual product with a checkbox
const ProductCard: React.FC<{
  product: any;
  isSelected: boolean;
  toggleSelect: (id: string) => void;
}> = ({ product, isSelected, toggleSelect }) => {
  const defaultImage =
    product.prodMetalColor[0]?.images[0]?.imageFileName || "";

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
      <img
        className="w-full h-64 object-cover"
        src={`https://e-com-promo-api.vercel.app/uploads/${defaultImage}`} // Update image URL if necessary
        alt={product.prodName}
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {product.prodName}
          </h3>
          <input
            type="checkbox"
            onChange={() => toggleSelect(product._id)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <p className="text-gray-600 mt-2">{product.prodDesc}</p>
        <p className="text-gray-900 font-bold text-lg mt-4">
          ${product.prodPrice}
        </p>
        <p className="text-sm text-gray-500 mt-2">SKU: {product.prodSku}</p>
        <p className="text-sm text-gray-500">Ring Size: {product.jRingSize}</p>
      </div>
    </div>
  );
};

// Main product list component
const ProductList = ({
  product,
  productSku,
  category,
  setFormData,
  formData,
}: any) => {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  console.log(selectedProductIds, "selectedProductIds");
  useEffect(() => {
    setFormData({
      ...formData,
      product: selectedProductIds,
    });
  }, [selectedProductIds]);
  const { data, isLoading, isError, refetch } = useQuery<Product[]>(
    ["products", product, productSku, category], // Dependencies array for query params
    async () => {
      // Construct the query params dynamically
      const queryParams = new URLSearchParams();

      if (product) queryParams.append("product", product);
      if (productSku) queryParams.append("productSku", productSku);
      if (category) queryParams.append("category", category);

      const response = await fetch(
        `http://localhost:8080/api/v1/coupons/products?${queryParams.toString()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result.data; // Assuming the data is in result.data
    },
    {
      enabled: !!product || !!productSku || !!category, // Only run query if at least one param is available
    }
  );

  useEffect(() => {
    refetch();
  }, [product, productSku, category]);

  // Toggle product selection
  const toggleSelect = (id: string) => {
    setSelectedProductIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="w-full py-8">
      <ScrollArea className="h-[300px] w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((product) => (
            <ProductCard
              key={product.prodSku}
              product={product}
              isSelected={selectedProductIds.includes(product.id)}
              toggleSelect={toggleSelect}
            />
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Selected Product IDs:</h3>
          <ul className="list-disc list-inside">
            {selectedProductIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductList;
