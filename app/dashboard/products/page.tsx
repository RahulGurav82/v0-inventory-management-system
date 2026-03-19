'use client';

import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

        <div className="text-center py-12">
          <p className="text-slate-400">No products added yet. Create your first product to get started.</p>
        </div>
      </Card>
    </div>
  );
}
