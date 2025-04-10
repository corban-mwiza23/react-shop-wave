
import React from "react";
import { useShop } from "@/context/ShopContext";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";

const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
  { id: "home", name: "Home & Kitchen" },
];

const ProductFilters: React.FC = () => {
  const { state, setCategory, setPriceRange, setRating, clearFilters } = useShop();
  const { filters } = state;

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow md:p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4 mr-1" /> Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <Button
                  variant={filters.category === category.id ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setCategory(category.id)}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="px-2">
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              min={0}
              max={200}
              step={10}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Rating</h4>
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((rating) => (
              <div
                key={rating}
                className={`flex items-center p-1.5 rounded cursor-pointer ${
                  filters.rating === rating + 1
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleRatingChange(rating + 1)}
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= rating + 1
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">& Up</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
