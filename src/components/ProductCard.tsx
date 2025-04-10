
import React from "react";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, state, removeFromCart, updateQuantity } = useShop();
  
  const cartItem = state.cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= Math.round(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2">{product.category}</Badge>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-gray-900 text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
          {renderRating(product.rating)}
        </div>
        <div className="mt-4">
          {!isInCart ? (
            <Button 
              onClick={() => addToCart(product.id)} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between border rounded-md p-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(product.id, (cartItem?.quantity || 1) - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="mx-2 font-medium">{cartItem?.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(product.id, (cartItem?.quantity || 0) + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
