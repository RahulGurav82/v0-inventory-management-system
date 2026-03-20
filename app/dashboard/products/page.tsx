'use client';

import Link from 'next/link';
import { Plus, Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Sample products data
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    brandName: 'BrandCo',
    productName: 'Protein Powder',
    category: 'Nutritional Products',
    mrp: 1200,
    totalVariants: 3,
  },
  {
    id: 2,
    brandName: 'FreshFoods',
    productName: 'Organic Rice',
    category: 'Grains',
    mrp: 450,
    totalVariants: 2,
  },
  {
    id: 3,
    brandName: 'HealthMax',
    productName: 'Multivitamin',
    category: 'Supplements',
    mrp: 899,
    totalVariants: 1,
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-slate-400 mt-1">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/add">
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>

        {SAMPLE_PRODUCTS.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">MRP</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Variants</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_PRODUCTS.map((product) => (
                  <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Package className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.productName}</p>
                          <p className="text-slate-400 text-xs">{product.brandName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{product.category}</td>
                    <td className="py-3 px-4 text-slate-300">₹{product.mrp}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700 rounded text-slate-300 text-xs">
                        {product.totalVariants} SKUs
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/dashboard/products/${product.id}/variants/add`}>
                            <Plus className="w-3 h-3" />
                            Add Variant
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No products added yet. Create your first product to get started.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
