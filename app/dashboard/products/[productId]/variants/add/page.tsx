'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AddVariantForm } from '@/components/add-variant-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ParentProduct {
  productId: string;
  brandName: string;
  productName: string;
  category: string;
  subCategory: string;
  countryOfOrigin: string;
  targetMarket: string;
}

export default function AddVariantPage() {
  const params = useParams();
  const productId = params.productId as string;
  const [parentProduct, setParentProduct] = useState<ParentProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch parent product data
    // In real app, would call API with productId
    const mockProduct: ParentProduct = {
      productId: productId,
      brandName: 'Cadbury',
      productName: 'Chocolate Candy Range',
      category: 'Confectionery',
      subCategory: 'Chocolate',
      countryOfOrigin: 'India',
      targetMarket: 'India',
    };
    
    setParentProduct(mockProduct);
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!parentProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Product not found</p>
          <Button asChild>
            <Link href="/dashboard/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/products/${productId}`}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-white">Add New Variant</h1>
      </div>

      <AddVariantForm parentProduct={parentProduct} />
    </div>
  );
}
