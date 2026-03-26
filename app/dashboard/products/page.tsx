'use client';

import Link from 'next/link';
import { Plus, Search, Package, Edit, Trash2, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Sample products data with full structure
const SAMPLE_PRODUCTS = [
  {
    productId: 'prod_001',
    brandName: 'TFC Nutrition',
    productName: 'IsoPrime X',
    productDescription: 'Premium isolate protein',
    category: 'Supplements',
    subCategory: 'Protein',
    productWebpageUrl: 'https://example.com/isoprime',
    videoUrl: 'https://youtube.com/watch?v=example',
    targetMarket: 'India',
    countryOfOrigin: 'India',
    caseType: 'JAR',
    tags: ['protein', 'isolate'],
    isActive: true,
    activatedAt: '2026-03-19',
    deactivatedAt: null,
    createdAt: '2026-03-19T10:00:00Z',
    updatedAt: '2026-03-19T10:00:00Z',
    createdBy: 'user_001',
    updatedBy: 'user_001',
  },
  {
    productId: 'prod_002',
    brandName: 'NutroLife',
    productName: 'Whey Protein Plus',
    productDescription: 'Complete whey protein blend',
    category: 'Supplements',
    subCategory: 'Protein',
    productWebpageUrl: 'https://example.com/whey',
    videoUrl: '',
    targetMarket: 'India',
    countryOfOrigin: 'USA',
    caseType: 'POUCH',
    tags: ['whey', 'protein', 'muscle'],
    isActive: true,
    activatedAt: '2026-03-18',
    deactivatedAt: null,
    createdAt: '2026-03-18T15:30:00Z',
    updatedAt: '2026-03-19T09:15:00Z',
    createdBy: 'user_002',
    updatedBy: 'user_001',
  },
  {
    productId: 'prod_003',
    brandName: 'VitaCore',
    productName: 'Multivitamin Complex',
    productDescription: 'Complete daily vitamins',
    category: 'Supplements',
    subCategory: 'Vitamins',
    productWebpageUrl: '',
    videoUrl: 'https://youtube.com/watch?v=vitamins',
    targetMarket: 'India',
    countryOfOrigin: 'India',
    caseType: 'BOTTLE',
    tags: ['vitamins', 'health', 'daily'],
    isActive: false,
    activatedAt: '2026-03-15',
    deactivatedAt: '2026-03-20',
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-03-20T14:22:00Z',
    createdBy: 'user_001',
    updatedBy: 'user_002',
  },
];

export default function ProductsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog and variants</p>
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by product name, brand, or category..."
              className="pl-10"
            />
          </div>
        </div>

        {SAMPLE_PRODUCTS.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Product Info</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Category</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Origin</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Tags</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Created</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_PRODUCTS.map((product) => (
                  <tr key={product.productId} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{product.productName}</p>
                          <p className="text-muted-foreground text-xs">{product.brandName}</p>
                          <p className="text-muted-foreground text-xs">{product.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground">{product.category}</p>
                        <p className="text-muted-foreground text-xs">{product.subCategory}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs truncate text-muted-foreground">
                      {product.productDescription}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        product.isActive 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {product.countryOfOrigin}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 2 && (
                          <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                            +{product.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/dashboard/products/${product.productId}/variants/add`}>
                            <Plus className="w-3 h-3" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-3 h-3" />
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
            <p className="text-muted-foreground">No products added yet. Create your first product to get started.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
