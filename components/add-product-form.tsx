'use client';

import { useState } from 'react';
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
  COUNTRIES,
  TARGET_MARKETS,
  PRODUCT_CATEGORIES,
  BRANDS,
} from '@/lib/product-options';
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateAllRequired,
  ProductFormErrors,
} from '@/lib/product-validation';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

interface ProductFormData {
  // Step 1: Basic Info
  brandName: string;
  productName: string;
  productDescription: string;
  category: string;
  subCategory: string;
  caseType: string;
  targetMarket: string;
  countryOfOrigin: string;

  // Step 2: SKU & Identification
  skuNumber: string;
  skuName: string;
  gtin: string;
  primaryGtin: string;
  barcode: string;
  productPackagingLevel: string;
  productChannel: string;

  // Step 3: Packaging & Measurement
  measurementUnit: string;
  netContentCount: number;
  massMeasurementUnit: string;
  netWeight: number;
  grossWeight: number;
  weightMeasurementUnit: string;
  packagingType: string;
  height: number;
  width: number;
  depth: number;
  dimensionUnit: string;

  // Step 4: Pricing & Tax
  mrp: number;
  mrpLocation: string;
  mrpActivationDate: string;
  hsCode: string;
  igst: number;
  taxType: string;
  minSellPrice: number;

  // Step 5: Classification
  tags: string[];

  // Step 6: Media & Links
  productWebpageUrl: string;
  videoUrl: string;

  // Step 7: Settings
  isBatchTracked: boolean;
  isExpiryTracked: boolean;
  isReturnable: boolean;
  isActive: boolean;
}

const STEPS = [
  'Basic Info',
  'SKU & Identification',
  'Packaging & Measurement',
  'Pricing & Tax',
  'Classification',
  'Media & Links',
  'Settings',
];

export default function AddProductForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProductFormData>({
    brandName: '',
    productName: '',
    productDescription: '',
    category: '',
    subCategory: '',
    caseType: '',
    targetMarket: 'INDIA',
    countryOfOrigin: 'India',
    skuNumber: '',
    skuName: '',
    gtin: '',
    primaryGtin: '',
    barcode: '',
    productPackagingLevel: '',
    productChannel: 'BOTH',
    measurementUnit: 'COUNT',
    netContentCount: 1,
    massMeasurementUnit: 'KG',
    netWeight: 0,
    grossWeight: 0,
    weightMeasurementUnit: 'KG',
    packagingType: '',
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
    tags: [],
    productWebpageUrl: '',
    videoUrl: '',
    isBatchTracked: true,
    isExpiryTracked: true,
    isReturnable: true,
    isActive: true,
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Auto-fill barcode from GTIN
      if (field === 'gtin' && value) {
        newData.barcode = value;
      }

      // Auto-calculate gross weight if netWeight is entered
      if (field === 'netWeight' && value > 0) {
        newData.grossWeight = parseFloat((value * 1.1).toFixed(2));
      }

      return newData;
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getSubCategories = () => {
    return formData.category ? PRODUCT_CATEGORIES[formData.category] || [] : [];
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: ProductFormErrors = {};

    switch (currentStep) {
      case 0:
        stepErrors = validateStep1(formData);
        break;
      case 1:
        stepErrors = validateStep2(formData);
        break;
      case 2:
        stepErrors = validateStep3(formData);
        break;
      case 3:
        stepErrors = validateStep4(formData);
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    const allErrors = validateAllRequired(formData);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setSubmitMessage('Please fill all required fields');
      return;
    }

    console.log('Product submitted:', formData);
    setSubmitMessage('Product created successfully!');
    setTimeout(() => setSubmitMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-slate-400">Complete all steps to add a product to your inventory</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      index <= currentStep
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        index < currentStep ? 'bg-blue-500' : 'bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-1">{STEPS[currentStep]}</h2>
            <p className="text-slate-400 text-sm">
              Step {currentStep + 1} of {STEPS.length}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-8">
          {submitMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-400">{submitMessage}</p>
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium">Validation Error</p>
                <ul className="text-red-300 text-sm mt-1 list-disc list-inside">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Brand Name *
                  </label>
                  <select
                    value={formData.brandName}
                    onChange={(e) => handleInputChange('brandName', e.target.value)}
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.brandName ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select Brand</option>
                    {BRANDS.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="e.g., Amul Butter 500g"
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.productName ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description (max 40 chars)
                </label>
                <input
                  type="text"
                  maxLength={40}
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  placeholder="Brief product description"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {formData.productDescription.length}/40
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      handleInputChange('category', e.target.value);
                      handleInputChange('subCategory', '');
                    }}
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.category ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {Object.keys(PRODUCT_CATEGORIES).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Sub-Category
                  </label>
                  <select
                    value={formData.subCategory}
                    onChange={(e) => handleInputChange('subCategory', e.target.value)}
                    disabled={!formData.category}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  >
                    <option value="">Select Sub-Category</option>
                    {getSubCategories().map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Case Type *
                  </label>
                  <select
                    value={formData.caseType}
                    onChange={(e) => handleInputChange('caseType', e.target.value)}
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.caseType ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select Case Type</option>
                    {CASE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Target Market
                  </label>
                  <select
                    value={formData.targetMarket}
                    onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  >
                    {TARGET_MARKETS.map((market) => (
                      <option key={market} value={market}>
                        {market}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Country of Origin
                </label>
                <select
                  value={formData.countryOfOrigin}
                  onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: SKU & Identification */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    SKU Number *
                  </label>
                  <input
                    type="text"
                    value={formData.skuNumber}
                    onChange={(e) => handleInputChange('skuNumber', e.target.value)}
                    placeholder="e.g., SKU001"
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.skuNumber ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    SKU Name *
                  </label>
                  <input
                    type="text"
                    value={formData.skuName}
                    onChange={(e) => handleInputChange('skuName', e.target.value)}
                    placeholder="e.g., Amul Butter 500g"
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.skuName ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GTIN</label>
                  <input
                    type="text"
                    value={formData.gtin}
                    onChange={(e) => handleInputChange('gtin', e.target.value)}
                    placeholder="8-14 digit GTIN"
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.gtin ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  <p className="text-xs text-slate-500 mt-1">Barcode will auto-fill</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Primary GTIN
                  </label>
                  <input
                    type="text"
                    value={formData.primaryGtin}
                    onChange={(e) => handleInputChange('primaryGtin', e.target.value)}
                    placeholder="Optional GTIN"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Barcode</label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  placeholder="Auto-filled from GTIN"
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                    errors.barcode ? 'border-red-500' : 'border-slate-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Packaging Level *
                  </label>
                  <select
                    value={formData.productPackagingLevel}
                    onChange={(e) => handleInputChange('productPackagingLevel', e.target.value)}
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.productPackagingLevel ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select Level</option>
                    {PRODUCT_PACKAGING_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Channel *
                  </label>
                  <select
                    value={formData.productChannel}
                    onChange={(e) => handleInputChange('productChannel', e.target.value)}
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.productChannel ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    {PRODUCT_CHANNELS.map((channel) => (
                      <option key={channel} value={channel}>
                        {channel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Packaging & Measurement */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Measurement Unit *
                  </label>
                  <select
                    value={formData.measurementUnit}
                    onChange={(e) => handleInputChange('measurementUnit', e.target.value)}
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.measurementUnit ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    {MEASUREMENT_UNITS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Net Content Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.netContentCount}
                    onChange={(e) =>
                      handleInputChange('netContentCount', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.netContentCount ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Packaging Type
                  </label>
                  <select
                    value={formData.packagingType}
                    onChange={(e) => handleInputChange('packagingType', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    {PACKAGING_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-sm font-medium text-slate-300 mb-4">Weight Details</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Net Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.netWeight}
                      onChange={(e) =>
                        handleInputChange('netWeight', parseFloat(e.target.value) || 0)
                      }
                      className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                        errors.netWeight ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                    <p className="text-xs text-slate-500 mt-1">Gross will auto-calc</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Gross Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.grossWeight}
                      onChange={(e) =>
                        handleInputChange('grossWeight', parseFloat(e.target.value) || 0)
                      }
                      className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                        errors.grossWeight ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Weight Unit
                    </label>
                    <select
                      value={formData.weightMeasurementUnit}
                      onChange={(e) => handleInputChange('weightMeasurementUnit', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    >
                      {MASS_MEASUREMENT_UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-sm font-medium text-slate-300 mb-4">Dimensions</h3>
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Height
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                        errors.height ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Width
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                        errors.width ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Depth
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.depth}
                      onChange={(e) => handleInputChange('depth', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                        errors.depth ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Unit
                    </label>
                    <select
                      value={formData.dimensionUnit}
                      onChange={(e) => handleInputChange('dimensionUnit', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
          )}

          {/* Step 4: Pricing & Tax */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">MRP *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.mrp}
                    onChange={(e) => handleInputChange('mrp', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.mrp ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    MRP Location
                  </label>
                  <select
                    value={formData.mrpLocation}
                    onChange={(e) => handleInputChange('mrpLocation', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  >
                    {MRP_LOCATIONS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Min Sell Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minSellPrice}
                    onChange={(e) =>
                      handleInputChange('minSellPrice', parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                    className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                      errors.minSellPrice ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    MRP Activation Date
                  </label>
                  <input
                    type="date"
                    value={formData.mrpActivationDate}
                    onChange={(e) => handleInputChange('mrpActivationDate', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-sm font-medium text-slate-300 mb-4">Tax Information</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tax Type
                    </label>
                    <select
                      value={formData.taxType}
                      onChange={(e) => handleInputChange('taxType', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    >
                      {TAX_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      IGST (%) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.igst}
                      onChange={(e) => handleInputChange('igst', parseFloat(e.target.value) || 0)}
                      className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 ${
                        errors.igst ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      HS Code
                    </label>
                    <input
                      type="text"
                      value={formData.hsCode}
                      onChange={(e) => handleInputChange('hsCode', e.target.value)}
                      placeholder="e.g., 21069090"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Classification */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) =>
                    handleInputChange(
                      'tags',
                      e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="e.g., protein, whey, organic"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-300">
                  {formData.tags.length === 0 ? 'No tags added' : `Tags: ${formData.tags.join(', ')}`}
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Media & Links */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Product Webpage URL
                </label>
                <input
                  type="url"
                  value={formData.productWebpageUrl}
                  onChange={(e) => handleInputChange('productWebpageUrl', e.target.value)}
                  placeholder="https://example.com/product"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 7: Settings */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Batch Tracking *</p>
                  <p className="text-xs text-slate-500">Track product batches</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isBatchTracked}
                  onChange={(e) => handleInputChange('isBatchTracked', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Expiry Tracking</p>
                  <p className="text-xs text-slate-500">Track product expiry dates</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isExpiryTracked}
                  onChange={(e) => handleInputChange('isExpiryTracked', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Returnable</p>
                  <p className="text-xs text-slate-500">Allow returns for this product</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isReturnable}
                  onChange={(e) => handleInputChange('isReturnable', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between border-t border-slate-600 pt-6">
                <div>
                  <p className="text-sm font-medium text-slate-300">Active</p>
                  <p className="text-xs text-slate-500">Product is active and sellable</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-4">
            {currentStep === STEPS.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
              >
                Submit Product
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
