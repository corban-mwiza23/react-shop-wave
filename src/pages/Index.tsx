
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="bg-slate-800 shadow-lg shadow-slate-900/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-white">Midnight Market</h1>
          </div>
          <ShoppingCart />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-24 bg-slate-800 p-5 rounded-lg shadow-lg">
              <ProductFilters />
            </div>
          </div>
          <div className="lg:w-3/4">
            <ProductList products={products} />
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 shadow-inner mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-slate-400 text-sm">
            © 2025 Midnight Market. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
