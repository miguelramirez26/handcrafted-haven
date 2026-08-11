// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  craft: string;
  price: number;
  stars: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [artisanName, setArtisanName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifySessionAndLoadData = async () => {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        if (!sessionData.user) {
          router.push("/login");
          return;
        }

        setArtisanName(sessionData.user.name);

        const productsRes = await fetch("/api/products");
        const productsData = await productsRes.json();

        if (!productsRes.ok) {
          throw new Error(productsData.error || "Failed to load inventory");
        }

        setMyProducts(productsData.products || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifySessionAndLoadData();
  }, [router]);

  // Function to handle the deletion of a product in real-time
  const handleDelete = async (productId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this product listing?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete the product");
      }

      // Optimistically update the UI by filtering out the deleted item
      setMyProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-500">
        <p className="font-medium">Verifying credentials & loading workspace...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 px-8 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-8 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 font-medium">Welcome back, {artisanName}</span>
            <h1 className="font-merriweather text-3xl text-stone-900 mt-1">Seller Dashboard</h1>
            <p className="text-sm text-stone-500 mt-2">Manage your handcrafted shop inventory and listings.</p>
          </div>
          <div>
            <Link
              href="/dashboard/new"
              className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 text-sm transition-colors shadow-sm"
            >
              + Add New Product
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Inventory Management Table */}
        <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-100 bg-stone-50/50">
            <h2 className="font-merriweather text-lg text-stone-900">Your Listed Goods</h2>
          </div>

          {myProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 text-xs font-medium uppercase tracking-wider">
                    <th className="p-4">Product Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {myProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="p-4 font-medium text-stone-900">{product.name}</td>
                      <td className="p-4 text-stone-500">{product.craft}</td>
                      <td className="p-4 font-merriweather text-amber-700">${product.price}</td>
                      <td className="p-4 text-stone-400">
                        {product.stars > 0 ? `${product.stars}/5 ★` : "No ratings yet"}
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button className="text-stone-500 hover:text-amber-700 font-medium transition-colors">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-stone-500">
              <p>You haven't listed any items yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
