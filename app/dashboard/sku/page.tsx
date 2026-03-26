'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Sample SKU data matching the provided structure
const SAMPLE_SKUS = [
  {
    skuId: 'sku_001',
    productId: 'prod_001',
    skuNumber: 'ISO-PRIME-X-1KG',
    skuName: 'IsoPrime X 1kg',
    gtin: '8901234567890',
    primaryGtin: '8901234567890',
    productPackagingLevel: 'CONSUMER_UNIT',
    productChannel: 'BOTH',
    barcode: '8901234567890',
    measurementUnit: 'COUNT',
    netContentCount: 1,
    massMeasurementUnit: 'KG',
    grossWeight: 1.1,
    netWeight: 1.0,
    weightMeasurementUnit: 'KG',
    packagingType: 'JAR',
    height: 25,
    width: 15,
    depth: 15,
    dimensionUnit: 'CM',
    mrpLocation: 'INDIA',
    mrp: 2499,
    mrpActivationDate: '2026-03-19',
    hsCode: '21069099',
    igst: 18,
    taxType: 'GST',
    reorderLevel: 20,
    minSellPrice: 2200,
    isBatchTracked: true,
    isExpiryTracked: true,
    isReturnable: true,
    isActive: true,
    activatedAt: '2026-03-19',
    deactivatedAt: null,
    createdAt: '2026-03-19T10:05:00Z',
    updatedAt: '2026-03-19T10:05:00Z',
    createdBy: 'user_001',
    updatedBy: 'user_001',
  },
  {
    skuId: 'sku_002',
    productId: 'prod_001',
    skuNumber: 'ISO-PRIME-X-2KG',
    skuName: 'IsoPrime X 2kg',
    gtin: '8901234567891',
    primaryGtin: '8901234567891',
    productPackagingLevel: 'CONSUMER_UNIT',
    productChannel: 'ECOMMERCE',
    barcode: '8901234567891',
    measurementUnit: 'COUNT',
    netContentCount: 1,
    massMeasurementUnit: 'KG',
    grossWeight: 2.1,
    netWeight: 2.0,
    weightMeasurementUnit: 'KG',
    packagingType: 'JAR',
    height: 30,
    width: 20,
    depth: 20,
    dimensionUnit: 'CM',
    mrpLocation: 'INDIA',
    mrp: 4499,
    mrpActivationDate: '2026-03-19',
    hsCode: '21069099',
    igst: 18,
    taxType: 'GST',
    reorderLevel: 15,
    minSellPrice: 3999,
    isBatchTracked: true,
    isExpiryTracked: true,
    isReturnable: true,
    isActive: true,
    activatedAt: '2026-03-19',
    deactivatedAt: null,
    createdAt: '2026-03-19T10:10:00Z',
    updatedAt: '2026-03-19T10:10:00Z',
    createdBy: 'user_001',
    updatedBy: 'user_001',
  },
  {
    skuId: 'sku_003',
    productId: 'prod_002',
    skuNumber: 'WHEY-PLUS-500G',
    skuName: 'Whey Protein Plus 500g',
    gtin: '8901234567892',
    primaryGtin: '8901234567892',
    productPackagingLevel: 'CONSUMER_UNIT',
    productChannel: 'BOTH',
    barcode: '8901234567892',
    measurementUnit: 'COUNT',
    netContentCount: 1,
    massMeasurementUnit: 'G',
    grossWeight: 550,
    netWeight: 500,
    weightMeasurementUnit: 'G',
    packagingType: 'POUCH',
    height: 20,
    width: 12,
    depth: 8,
    dimensionUnit: 'CM',
    mrpLocation: 'INDIA',
    mrp: 1599,
    mrpActivationDate: '2026-03-18',
    hsCode: '21069099',
    igst: 18,
    taxType: 'GST',
    reorderLevel: 25,
    minSellPrice: 1399,
    isBatchTracked: true,
    isExpiryTracked: true,
    isReturnable: false,
    isActive: true,
    activatedAt: '2026-03-18',
    deactivatedAt: null,
    createdAt: '2026-03-18T14:30:00Z',
    updatedAt: '2026-03-19T09:15:00Z',
    createdBy: 'user_002',
    updatedBy: 'user_001',
  },
  {
    skuId: 'sku_004',
    productId: 'prod_003',
    skuNumber: 'MULTI-VIT-60CAP',
    skuName: 'Multivitamin Complex 60 Capsules',
    gtin: '8901234567893',
    primaryGtin: '8901234567893',
    productPackagingLevel: 'CONSUMER_UNIT',
    productChannel: 'POS',
    barcode: '8901234567893',
    measurementUnit: 'COUNT',
    netContentCount: 60,
    massMeasurementUnit: 'G',
    grossWeight: 110,
    netWeight: 100,
    weightMeasurementUnit: 'G',
    packagingType: 'BOTTLE',
    height: 12,
    width: 8,
    depth: 8,
    dimensionUnit: 'CM',
    mrpLocation: 'INDIA',
    mrp: 599,
    mrpActivationDate: '2026-03-15',
    hsCode: '30049099',
    igst: 12,
    taxType: 'GST',
    reorderLevel: 50,
    minSellPrice: 499,
    isBatchTracked: true,
    isExpiryTracked: true,
    isReturnable: true,
    isActive: false,
    activatedAt: '2026-03-15',
    deactivatedAt: '2026-03-20',
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-03-20T14:22:00Z',
    createdBy: 'user_001',
    updatedBy: 'user_002',
  },
];

export default function SKUPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredSkus = SAMPLE_SKUS.filter(
    (sku) =>
      sku.skuNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.skuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateProfit = (mrp: number, minSellPrice: number) => {
    return ((mrp - minSellPrice) / mrp * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SKU Management</h1>
          <p className="text-muted-foreground mt-1">Manage SKUs, variants and pricing across all products</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products">
            <Plus className="w-4 h-4" />
            Add SKU
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by SKU number, name, or product ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredSkus.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">SKU Info</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Packaging</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Weight/Dimensions</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Pricing</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Tracking</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Updated</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkus.map((sku) => (
                  <tr key={sku.skuId} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground font-medium">{sku.skuName}</p>
                        <p className="text-muted-foreground text-xs font-mono">{sku.skuNumber}</p>
                        <p className="text-muted-foreground text-xs">GTIN: {sku.gtin}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground text-sm">{sku.packagingType}</p>
                        <p className="text-muted-foreground text-xs">{sku.productChannel}</p>
                        <p className="text-muted-foreground text-xs">{sku.productPackagingLevel}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground text-sm">
                          {sku.netWeight}{sku.weightMeasurementUnit} / {sku.grossWeight}{sku.weightMeasurementUnit}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {sku.height}×{sku.width}×{sku.depth}{sku.dimensionUnit}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-foreground font-semibold">₹{sku.mrp.toLocaleString('en-IN')}</p>
                        <p className="text-muted-foreground text-xs">Min: ₹{sku.minSellPrice.toLocaleString('en-IN')}</p>
                        <p className="text-green-700 dark:text-green-400 text-xs font-medium">
                          {calculateProfit(sku.mrp, sku.minSellPrice)}% margin
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded w-fit ${
                          sku.isBatchTracked ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-muted-foreground'
                        }`}>
                          {sku.isBatchTracked ? 'Batch ✓' : 'No Batch'}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded w-fit ${
                          sku.isExpiryTracked ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'text-muted-foreground'
                        }`}>
                          {sku.isExpiryTracked ? 'Expiry ✓' : 'No Expiry'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        sku.isActive
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {sku.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">
                      {formatDate(sku.updatedAt)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" title="View details">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Edit SKU">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Duplicate SKU">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Delete SKU">
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
            <p className="text-muted-foreground">No SKUs found. Create your first SKU by adding variants to a product.</p>
          </div>
        )}

        {filteredSkus.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSkus.length} of {SAMPLE_SKUS.length} SKUs
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
