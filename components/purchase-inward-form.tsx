'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LineItem {
  id: string;
  skuId: string;
  skuName: string;
  batchCode: string;
  quantity: number;
  purchasePrice: number;
  freightCost: number;
  otherCharges: number;
  mfgDate: string;
  expiryDate: string;
  mrp: number;
  remarks: string;
  isExpiryTracked: boolean;
  isBatchTracked: boolean;
}

interface InwardFormData {
  // Section A: Inward Info
  vendor: string;
  vendorId: string;
  destinationLocation: string;
  destinationLocationId: string;
  inwardType: string;
  invoiceNumber: string;
  grnNumber: string;
  invoiceDate: string;
  receivedAt: string;
  notes: string;

  // Section B: Charges
  freightCost: number;
  unloadingCharges: number;
  otherCharges: number;

  // Section C: Line Items
  lineItems: LineItem[];
}

const INWARD_TYPES = ['Purchase', 'Customer Return', 'Adjustment'];
const VENDORS = [
  { id: 'VEN-001', name: 'TFC Nutrition' },
  { id: 'VEN-002', name: 'NutroLife' },
  { id: 'VEN-003', name: 'VitaCore' },
];
const LOCATIONS = [
  { id: 'LOC-001', name: 'Main Warehouse' },
  { id: 'LOC-002', name: 'Sanpada' },
  { id: 'LOC-003', name: 'Ghansoli' },
  { id: 'LOC-004', name: 'Nerul' },
  { id: 'LOC-005', name: 'Ulwe' },
];
const SAMPLE_SKUS = [
  { id: 'SKU-001', name: 'IsoPrime X', mrp: 1200, isExpiryTracked: true, isBatchTracked: true },
  { id: 'SKU-012', name: 'Whey Protein Plus', mrp: 1500, isExpiryTracked: true, isBatchTracked: true },
  { id: 'SKU-045', name: 'Multivitamin Complex', mrp: 899, isExpiryTracked: true, isBatchTracked: false },
];

export default function PurchaseInwardForm() {
  const [formData, setFormData] = useState<InwardFormData>({
    vendor: '',
    vendorId: '',
    destinationLocation: '',
    destinationLocationId: '',
    inwardType: 'Purchase',
    invoiceNumber: '',
    grnNumber: '',
    invoiceDate: '',
    receivedAt: '',
    notes: '',
    freightCost: 0,
    unloadingCharges: 0,
    otherCharges: 0,
    lineItems: [],
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const addLineItem = () => {
    const newItem: LineItem = {
      id: `line_${Date.now()}`,
      skuId: '',
      skuName: '',
      batchCode: '',
      quantity: 1,
      purchasePrice: 0,
      freightCost: 0,
      otherCharges: 0,
      mfgDate: '',
      expiryDate: '',
      mrp: 0,
      remarks: '',
      isExpiryTracked: false,
      isBatchTracked: false,
    };
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem],
    }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          // Auto-fill from SKU selection
          if (field === 'skuId') {
            const selectedSku = SAMPLE_SKUS.find(s => s.id === value);
            return {
              ...item,
              [field]: value,
              skuName: selectedSku?.name || '',
              mrp: selectedSku?.mrp || 0,
              isExpiryTracked: selectedSku?.isExpiryTracked || false,
              isBatchTracked: selectedSku?.isBatchTracked || false,
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      }),
    }));
  };

  const removeLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  };

  const calculateLineAmount = (item: LineItem) => {
    const landedCost = item.purchasePrice + item.freightCost + item.otherCharges;
    return landedCost * item.quantity;
  };

  const calculateSummary = () => {
    const totalQty = formData.lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = formData.lineItems.length;
    const totalAmount = formData.lineItems.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
    const totalLandedAmount = formData.lineItems.reduce((sum, item) => sum + calculateLineAmount(item), 0);

    return { totalQty, totalItems, totalAmount, totalLandedAmount };
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.vendorId) newErrors.push('Vendor is required');
    if (!formData.destinationLocationId) newErrors.push('Destination Location is required');
    if (!formData.invoiceNumber) newErrors.push('Invoice Number is required');
    if (!formData.invoiceDate) newErrors.push('Invoice Date is required');
    if (!formData.receivedAt) newErrors.push('Received Date is required');
    if (formData.lineItems.length === 0) newErrors.push('At least one line item is required');

    formData.lineItems.forEach((item, idx) => {
      if (!item.skuId) newErrors.push(`Line ${idx + 1}: SKU is required`);
      if (item.quantity <= 0) newErrors.push(`Line ${idx + 1}: Quantity must be greater than 0`);
      if (item.purchasePrice <= 0) newErrors.push(`Line ${idx + 1}: Purchase Price must be greater than 0`);
      if (item.isExpiryTracked && !item.expiryDate) newErrors.push(`Line ${idx + 1}: Expiry Date is required for batch tracked items`);
      if (item.isBatchTracked && !item.batchCode) newErrors.push(`Line ${idx + 1}: Batch Code is required for batch tracked items`);
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setSuccessMessage('Purchase Inward created successfully!');
    console.log('[v0] Form submitted:', formData);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const summary = calculateSummary();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Purchase Inward</h1>
          <p className="text-muted-foreground">Record stock inward from vendors with batch and expiry tracking</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
              <p className="text-green-700 dark:text-green-400">{successMessage}</p>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-destructive font-medium">Validation Errors</p>
                <ul className="text-destructive/80 text-sm mt-1 list-disc list-inside">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section A: Inward Info */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-4">Section A: Inward Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Vendor</label>
                <select
                  value={formData.vendorId}
                  onChange={(e) => {
                    const selected = VENDORS.find(v => v.id === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      vendorId: e.target.value,
                      vendor: selected?.name || '',
                    }));
                  }}
                  className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.some(e => e.includes('Vendor')) ? 'border-destructive' : 'border-border'
                  }`}
                >
                  <option value="">Select Vendor</option>
                  {VENDORS.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Destination Location</label>
                <select
                  value={formData.destinationLocationId}
                  onChange={(e) => {
                    const selected = LOCATIONS.find(l => l.id === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      destinationLocationId: e.target.value,
                      destinationLocation: selected?.name || '',
                    }));
                  }}
                  className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.some(e => e.includes('Destination')) ? 'border-destructive' : 'border-border'
                  }`}
                >
                  <option value="">Select Location</option>
                  {LOCATIONS.map(location => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Inward Type</label>
                <select
                  value={formData.inwardType}
                  onChange={(e) => setFormData(prev => ({ ...prev, inwardType: e.target.value }))}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {INWARD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Invoice Number</label>
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                  placeholder="INV-001"
                  className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.some(e => e.includes('Invoice Number')) ? 'border-destructive' : 'border-border'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">GRN Number</label>
                <input
                  type="text"
                  value={formData.grnNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, grnNumber: e.target.value }))}
                  placeholder="GRN-001"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Invoice Date</label>
                <input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                  className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.some(e => e.includes('Invoice Date')) ? 'border-destructive' : 'border-border'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Received Date</label>
                <input
                  type="date"
                  value={formData.receivedAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, receivedAt: e.target.value }))}
                  className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.some(e => e.includes('Received Date')) ? 'border-destructive' : 'border-border'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about this inward..."
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Section B: Charges */}
          <div className="mb-8 border-t border-border pt-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Section B: Additional Charges</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Freight Cost</label>
                <input
                  type="number"
                  value={formData.freightCost}
                  onChange={(e) => setFormData(prev => ({ ...prev, freightCost: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Unloading Charges</label>
                <input
                  type="number"
                  value={formData.unloadingCharges}
                  onChange={(e) => setFormData(prev => ({ ...prev, unloadingCharges: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Other Charges</label>
                <input
                  type="number"
                  value={formData.otherCharges}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherCharges: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Section C: Batch Line Items */}
          <div className="mb-8 border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Section C: Batch Line Items</h3>
              <button
                onClick={addLineItem}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-sm font-medium transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-2 text-foreground font-medium">SKU</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Batch Code</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Qty</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Price</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Freight</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Other</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Landed</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Mfg Date</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Expiry Date</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">MRP</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Remarks</th>
                    <th className="text-left py-3 px-2 text-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.lineItems.map((item) => {
                    const landedCost = item.purchasePrice + item.freightCost + item.otherCharges;
                    const lineAmount = landedCost * item.quantity;

                    return (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <select
                            value={item.skuId}
                            onChange={(e) => updateLineItem(item.id, 'skuId', e.target.value)}
                            className="w-full px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="">Select SKU</option>
                            {SAMPLE_SKUS.map(sku => (
                              <option key={sku.id} value={sku.id}>{sku.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-2">
                          {item.isBatchTracked ? (
                            <input
                              type="text"
                              value={item.batchCode}
                              onChange={(e) => updateLineItem(item.id, 'batchCode', e.target.value)}
                              placeholder="Batch-001"
                              className="w-full px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs">N/A</span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={item.purchasePrice}
                            onChange={(e) => updateLineItem(item.id, 'purchasePrice', parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={item.freightCost}
                            onChange={(e) => updateLineItem(item.id, 'freightCost', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            value={item.otherCharges}
                            onChange={(e) => updateLineItem(item.id, 'otherCharges', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="py-3 px-2 text-foreground text-xs font-medium">₹{landedCost.toFixed(2)}</td>
                        <td className="py-3 px-2">
                          <input
                            type="date"
                            value={item.mfgDate}
                            onChange={(e) => updateLineItem(item.id, 'mfgDate', e.target.value)}
                            className="w-28 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="py-3 px-2">
                          {item.isExpiryTracked ? (
                            <input
                              type="date"
                              value={item.expiryDate}
                              onChange={(e) => updateLineItem(item.id, 'expiryDate', e.target.value)}
                              className="w-28 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs">N/A</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-foreground text-xs">₹{item.mrp}</td>
                        <td className="py-3 px-2">
                          <input
                            type="text"
                            value={item.remarks}
                            onChange={(e) => updateLineItem(item.id, 'remarks', e.target.value)}
                            placeholder="Notes"
                            className="w-24 px-2 py-1 bg-input border border-border rounded text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => removeLineItem(item.id)}
                            className="text-destructive hover:bg-destructive/10 rounded p-1 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section D: Summary */}
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Section D: Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-muted rounded-lg p-4">
              <div>
                <p className="text-muted-foreground text-xs">Total Items</p>
                <p className="text-2xl font-bold text-foreground">{summary.totalItems}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Quantity</p>
                <p className="text-2xl font-bold text-foreground">{summary.totalQty}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Amount</p>
                <p className="text-2xl font-bold text-foreground">₹{summary.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Total Landed Amount</p>
                <p className="text-2xl font-bold text-primary">₹{summary.totalLandedAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all"
            >
              Create Purchase Inward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
