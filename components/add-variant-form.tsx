'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CASE_TYPES,
  PRODUCT_PACKAGING_LEVELS,
  PRODUCT_CHANNELS,
  MEASUREMENT_UNITS,
  PACKAGING_TYPES,
  DIMENSION_UNITS,
  MASS_MEASUREMENT_UNITS,
  TAX_TYPES,
  MRP_LOCATIONS,
} from '@/lib/product-options';
import { ChevronRight, ChevronLeft, AlertCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VariantFormData {
  productId: string;
  skuName: string;
  skuNumber: string;
  variantLabel: string;
  flavor: string;
  sizeLabel: string;

  gtin: string;
  primaryGtin: string;
  barcode: string;
  productPackagingLevel: string;
  productChannel: string;

  measurementUnit: string;
  netContentCount: number;
  massMeasurementUnit: string;
  netWeight: number;
  grossWeight: number;
  weightMeasurementUnit: string;
  packagingType: string;
  caseType: string;
  height: number;
  width: number;
  depth: number;
  dimensionUnit: string;

  mrp: number;
  mrpLocation: string;
  mrpActivationDate: string;
  hsCode: string;
  igst: number;
  taxType: string;
  minSellPrice: number;
  reorderLevel: number;
  isBatchTracked: boolean;
  isExpiryTracked: boolean;
  isReturnable: boolean;
  isActive: boolean;
}

interface ParentProduct {
  productId: string;
  brandName: string;
  productName: string;
  category: string;
  subCategory: string;
  countryOfOrigin: string;
  targetMarket: string;
}

interface VariantFormProps {
  parentProduct: ParentProduct;
}

type Step = 'parent' | 'basic' | 'identification' | 'packaging' | 'pricing';

interface FormErrors {
  [key: string]: string;
}

export function AddVariantForm({ parentProduct }: VariantFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('parent');
  const [formData, setFormData] = useState<VariantFormData>({
    productId: parentProduct.productId,
    skuName: '',
    skuNumber: '',
    variantLabel: '',
    flavor: '',
    sizeLabel: '',
    gtin: '',
    primaryGtin: '',
    barcode: '',
    productPackagingLevel: 'CONSUMER_UNIT',
    productChannel: 'BOTH',
    measurementUnit: 'COUNT',
    netContentCount: 1,
    massMeasurementUnit: 'KG',
    netWeight: 0,
    grossWeight: 0,
    weightMeasurementUnit: 'KG',
    packagingType: '',
    caseType: '',
    height: 0,
    width: 0,
    depth: 0,
    dimensionUnit: 'CM',
    mrp: 0,
    mrpLocation: 'INDIA',
    mrpActivationDate: '',
    hsCode: '',
    igst: 18,
    taxType: 'GST',
    minSellPrice: 0,
    reorderLevel: 10,
    isBatchTracked: true,
    isExpiryTracked: true,
    isReturnable: true,
    isActive: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'parent', label: 'Parent Product', number: 1 },
    { id: 'basic', label: 'Variant Basic Info', number: 2 },
    { id: 'identification', label: 'Identification', number: 3 },
    { id: 'packaging', label: 'Packaging & Measurement', number: 4 },
    { id: 'pricing', label: 'Pricing & Flags', number: 5 },
  ];

  const currentStepNumber = steps.findIndex((s) => s.id === step) + 1;

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 'basic') {
      if (!formData.skuName) newErrors.skuName = 'SKU Name is required';
      if (!formData.skuNumber) newErrors.skuNumber = 'SKU Number is required';
      if (!formData.productChannel) newErrors.productChannel = 'Product Channel is required';
    }

    if (currentStep === 'packaging') {
      if (!formData.measurementUnit) newErrors.measurementUnit = 'Measurement Unit is required';
      if (!formData.netContentCount || formData.netContentCount <= 0) {
        newErrors.netContentCount = 'Net Content Count must be greater than 0';
      }
      if (formData.grossWeight < formData.netWeight) {
        newErrors.grossWeight = 'Gross Weight must be >= Net Weight';
      }
      if (formData.height < 0 || formData.width < 0 || formData.depth < 0) {
        newErrors.dimensions = 'Height, Width, and Depth must be >= 0';
      }
    }

    if (currentStep === 'pricing') {
      if (!formData.mrp || formData.mrp <= 0) newErrors.mrp = 'MRP is required and must be > 0';
      if (formData.mrp < formData.minSellPrice) {
        newErrors.minSellPrice = 'MRP must be >= Min Sell Price';
      }
      if (!formData.igst) newErrors.igst = 'IGST is required';
      if (!formData.isBatchTracked && !formData.isExpiryTracked) {
        newErrors.tracking = 'At least one tracking option must be selected';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    const stepOrder: Step[] = ['parent', 'basic', 'identification', 'packaging', 'pricing'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const stepOrder: Step[] = ['parent', 'basic', 'identification', 'packaging', 'pricing'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleChange = (field: keyof VariantFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }

    // Auto-fill logic
    if (field === 'gtin' && value && !formData.barcode) {
      setFormData((prev) => ({ ...prev, barcode: value }));
    }
    if (field === 'netWeight' && value) {
      const suggested = Math.round(value * 1.1 * 100) / 100;
      setFormData((prev) => ({ ...prev, grossWeight: suggested }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep('pricing')) return;

    setSaving(true);
    try {
      // Log form data (in real app, would send to API)
      console.log('Variant Form Data:', formData);
      alert('Variant SKU saved successfully!');
      router.push(`/dashboard/products/${parentProduct.productId}`);
    } catch (error) {
      console.error('Error saving variant:', error);
      alert('Failed to save variant');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndAddAnother = async () => {
    if (!validateStep('pricing')) return;

    setSaving(true);
    try {
      console.log('Variant Form Data:', formData);
      alert('Variant SKU saved! Adding another...');
      // Reset form for next variant
      setFormData({
        ...formData,
        skuName: '',
        skuNumber: '',
        variantLabel: '',
        flavor: '',
        sizeLabel: '',
        gtin: '',
        barcode: '',
        primaryGtin: '',
        mrp: 0,
        mrpActivationDate: '',
        hsCode: '',
        minSellPrice: 0,
      });
      setStep('basic');
    } catch (error) {
      console.error('Error saving variant:', error);
      alert('Failed to save variant');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Add Product Variant</h1>
          <p className="text-muted-foreground">Select a parent product and fill in variant details</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 p-6 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4 mb-4">
            {(['parent', 'basic', 'identification', 'packaging', 'pricing'] as const).map((s, idx) => (
              <div key={s} className="flex items-center flex-1">
                <button
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {idx + 1}
                </button>
                {idx < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      ['parent', 'basic', 'identification', 'packaging'].includes(step) &&
                      ['parent', 'basic', 'identification', 'packaging', 'pricing'].indexOf(step) > idx
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Step {['parent', 'basic', 'identification', 'packaging', 'pricing'].indexOf(step) + 1} of 5
          </p>
        </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {steps[currentStepNumber - 1].label}
        </div>
      </div>

      {/* Parent Product Info (Step 1) */}
      {step === 'parent' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Parent Product Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Product ID</label>
              <p className="text-foreground bg-muted px-4 py-2 rounded-lg">{parentProduct.productId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Brand</label>
              <p className="text-foreground bg-muted px-4 py-2 rounded-lg">{parentProduct.brandName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
              <p className="text-foreground bg-muted px-4 py-2 rounded-lg">{parentProduct.productName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <p className="text-foreground bg-muted px-4 py-2 rounded-lg">
                {parentProduct.category} / {parentProduct.subCategory}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Country of Origin</label>
              <p className="text-foreground bg-muted px-4 py-2 rounded-lg">{parentProduct.countryOfOrigin}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Target Market</label>
              <p className="text-foreground bg-muted px-4 py-2 rounded-lg">{parentProduct.targetMarket}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Variant Basic Info */}
      {step === 'basic' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-6">Variant Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                SKU Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Chocolate Candy 1kg"
                value={formData.skuName}
                onChange={(e) => handleChange('skuName', e.target.value)}
                className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
                  errors.skuName ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                }`}
              />
              {errors.skuName && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.skuName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                SKU Number <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., CHOC-1KG-001"
                value={formData.skuNumber}
                onChange={(e) => handleChange('skuNumber', e.target.value)}
                className={`w-full px-4 py-2 bg-input border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ${
                  errors.skuNumber ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                }`}
              />
              {errors.skuNumber && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.skuNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Variant Label (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Chocolate 1kg"
                value={formData.variantLabel}
                onChange={(e) => handleChange('variantLabel', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Flavor (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Dark Chocolate"
                value={formData.flavor}
                onChange={(e) => handleChange('flavor', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Size Label (Optional)</label>
              <input
                type="text"
                placeholder="e.g., 1kg, 500g"
                value={formData.sizeLabel}
                onChange={(e) => handleChange('sizeLabel', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Channel <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.productChannel}
                onChange={(e) => handleChange('productChannel', e.target.value)}
                className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-foreground focus:outline-none focus:ring-2 ${
                  errors.productChannel ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                }`}
              >
                {PRODUCT_CHANNELS.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
              {errors.productChannel && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.productChannel}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Identification */}
      {step === 'identification' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-6">Identification</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">GTIN</label>
              <input
                type="text"
                placeholder="Global Trade Item Number"
                value={formData.gtin}
                onChange={(e) => handleChange('gtin', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Primary GTIN</label>
              <input
                type="text"
                placeholder="Primary GTIN"
                value={formData.primaryGtin}
                onChange={(e) => handleChange('primaryGtin', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Barcode</label>
              <input
                type="text"
                placeholder="Auto-filled from GTIN"
                value={formData.barcode}
                onChange={(e) => handleChange('barcode', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Packaging Level</label>
              <select
                value={formData.productPackagingLevel}
                onChange={(e) => handleChange('productPackagingLevel', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRODUCT_PACKAGING_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Packaging & Measurement */}
      {step === 'packaging' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-6">Packaging & Measurement</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Measurement Unit <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.measurementUnit}
                  onChange={(e) => handleChange('measurementUnit', e.target.value)}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-foreground focus:outline-none focus:ring-2 ${
                    errors.measurementUnit ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                  }`}
                >
                  {MEASUREMENT_UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.measurementUnit && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.measurementUnit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Net Content Count <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.netContentCount}
                  onChange={(e) => handleChange('netContentCount', parseFloat(e.target.value))}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-foreground focus:outline-none focus:ring-2 ${
                    errors.netContentCount ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                  }`}
                />
                {errors.netContentCount && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.netContentCount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Packaging Type</label>
                <select
                  value={formData.packagingType}
                  onChange={(e) => handleChange('packagingType', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select packaging type</option>
                  {PACKAGING_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Weight Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Net Weight</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.netWeight}
                    onChange={(e) => handleChange('netWeight', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Gross Weight</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.grossWeight}
                    onChange={(e) => handleChange('grossWeight', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded text-foreground text-sm focus:outline-none focus:ring-2 ${
                      errors.grossWeight ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                    }`}
                  />
                  {errors.grossWeight && <p className="text-destructive text-xs mt-1">{errors.grossWeight}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Unit</label>
                  <select
                    value={formData.weightMeasurementUnit}
                    onChange={(e) => handleChange('weightMeasurementUnit', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {MASS_MEASUREMENT_UNITS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Case Type</label>
                  <select
                    value={formData.caseType}
                    onChange={(e) => handleChange('caseType', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {CASE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Dimensions</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Height</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Width</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.width}
                    onChange={(e) => handleChange('width', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Depth</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.depth}
                    onChange={(e) => handleChange('depth', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-2">Unit</label>
                  <select
                    value={formData.dimensionUnit}
                    onChange={(e) => handleChange('dimensionUnit', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DIMENSION_UNITS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Pricing, Tax & Flags */}
      {step === 'pricing' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-6">Pricing, Tax & Flags</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  MRP <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.mrp}
                  onChange={(e) => handleChange('mrp', parseFloat(e.target.value))}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-foreground focus:outline-none focus:ring-2 ${
                    errors.mrp ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                  }`}
                />
                {errors.mrp && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.mrp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Min Sell Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.minSellPrice}
                  onChange={(e) => handleChange('minSellPrice', parseFloat(e.target.value))}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-foreground focus:outline-none focus:ring-2 ${
                    errors.minSellPrice ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                  }`}
                />
                {errors.minSellPrice && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.minSellPrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reorder Level</label>
                <input
                  type="number"
                  value={formData.reorderLevel}
                  onChange={(e) => handleChange('reorderLevel', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">MRP Location</label>
                <input
                  type="text"
                  value={formData.mrpLocation}
                  onChange={(e) => handleChange('mrpLocation', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  IGST (%) <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.igst}
                  onChange={(e) => handleChange('igst', parseFloat(e.target.value))}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-foreground focus:outline-none focus:ring-2 ${
                    errors.igst ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'
                  }`}
                />
                {errors.igst && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.igst}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tax Type</label>
                <select
                  value={formData.taxType}
                  onChange={(e) => handleChange('taxType', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TAX_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">MRP Activation Date</label>
              <input
                type="date"
                value={formData.mrpActivationDate}
                onChange={(e) => handleChange('mrpActivationDate', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">HS Code</label>
              <input
                type="text"
                placeholder="Harmonized System Code"
                value={formData.hsCode}
                onChange={(e) => handleChange('hsCode', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-foreground placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Tracking & Behavior Flags</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBatchTracked}
                    onChange={(e) => handleChange('isBatchTracked', e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Batch Tracked</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isExpiryTracked}
                    onChange={(e) => handleChange('isExpiryTracked', e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Expiry Tracked</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isReturnable}
                    onChange={(e) => handleChange('isReturnable', e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Returnable</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleChange('isActive', e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Active</span>
                </label>
              </div>
              {errors.tracking && <p className="text-destructive text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.tracking}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={step === 'parent'}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {step === 'pricing' ? (
            <>
              <Button
                variant="outline"
                onClick={() => router.push(`/dashboard/products/${parentProduct.productId}`)}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                onClick={handleSaveAndAddAnother}
                disabled={saving}
              >
                Save & Add Another
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save SKU'}
              </Button>
            </>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
