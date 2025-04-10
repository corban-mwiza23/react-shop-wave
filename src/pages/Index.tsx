
import React, { useEffect } from "react";
import { products } from "@/data/products";
import ProductList from "@/components/ProductList";
import ProductFilters from "@/components/ProductFilters";
import ShoppingCart from "@/components/ShoppingCart";
import { useShop } from "@/context/ShopContext";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  const { dispatch } = useShop();

  useEffect(() => {
    // Load products into the state
    dispatch({ type: "SET_PRODUCTS", payload: products });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">React Shop</h1>
          </div>
          <ShoppingCart />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-4">
              <ProductFilters />
            </div>
          </div>
          <div className="lg:w-3/4">
            <ProductList products={products} />
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-inner mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 React Shop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
