
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

type ViewMode = "grid" | "list";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { state } = useShop();
  const { filters } = state;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const filtered = products.filter((product) => {
      // Filter by category
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // Filter by price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Filter by rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [products, filters]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products ({filteredProducts.length})</h2>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products match your filters</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="sm:w-1/3 h-48 sm:h-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:w-2/3 flex flex-col">
                <h3 className="font-medium text-gray-900 text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
                  </div>
                </div>
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
