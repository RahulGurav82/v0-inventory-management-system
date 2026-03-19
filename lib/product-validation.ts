export interface ProductFormErrors {
  [key: string]: string;
}

export const validateStep1 = (data: any): ProductFormErrors => {
  const errors: ProductFormErrors = {};

  if (!data.brandName?.trim()) errors.brandName = "Brand name is required";
  if (!data.productName?.trim()) errors.productName = "Product name is required";
  if (data.productDescription && data.productDescription.length > 40) {
    errors.productDescription = "Description must be less than 40 characters";
  }
  if (!data.category?.trim()) errors.category = "Category is required";
  if (!data.caseType?.trim()) errors.caseType = "Case type is required";

  return errors;
};

export const validateStep2 = (data: any): ProductFormErrors => {
  const errors: ProductFormErrors = {};

  if (!data.skuNumber?.trim()) errors.skuNumber = "SKU number is required";
  if (!data.skuName?.trim()) errors.skuName = "SKU name is required";
  if (data.gtin && !/^\d{8,14}$/.test(data.gtin)) {
    errors.gtin = "GTIN must be 8-14 digits";
  }
  if (data.barcode && !/^\d+$/.test(data.barcode)) {
    errors.barcode = "Barcode must contain only numbers";
  }
  if (!data.productPackagingLevel?.trim()) {
    errors.productPackagingLevel = "Packaging level is required";
  }
  if (!data.productChannel?.trim()) errors.productChannel = "Channel is required";

  return errors;
};

export const validateStep3 = (data: any): ProductFormErrors => {
  const errors: ProductFormErrors = {};

  if (!data.measurementUnit?.trim()) {
    errors.measurementUnit = "Measurement unit is required";
  }
  if (data.netContentCount <= 0) {
    errors.netContentCount = "Net content count must be greater than 0";
  }
  if (data.netWeight < 0) {
    errors.netWeight = "Net weight cannot be negative";
  }
  if (data.grossWeight < 0) {
    errors.grossWeight = "Gross weight cannot be negative";
  }
  if (data.height < 0) errors.height = "Height cannot be negative";
  if (data.width < 0) errors.width = "Width cannot be negative";
  if (data.depth < 0) errors.depth = "Depth cannot be negative";

  return errors;
};

export const validateStep4 = (data: any): ProductFormErrors => {
  const errors: ProductFormErrors = {};

  if (data.mrp <= 0) errors.mrp = "MRP must be greater than 0";
  if (data.igst < 0 || data.igst > 100) {
    errors.igst = "IGST must be between 0 and 100";
  }
  if (data.minSellPrice < 0) {
    errors.minSellPrice = "Min sell price cannot be negative";
  }
  if (data.minSellPrice > data.mrp) {
    errors.minSellPrice = "Min sell price cannot be greater than MRP";
  }

  return errors;
};

export const validateAllRequired = (data: any): ProductFormErrors => {
  const errors: ProductFormErrors = {};
  const required = [
    "brandName",
    "productName",
    "skuNumber",
    "skuName",
    "category",
    "mrp",
    "igst",
    "measurementUnit",
    "netContentCount",
    "productChannel",
    "isBatchTracked",
  ];

  required.forEach((field) => {
    if (!data[field] && data[field] !== false && data[field] !== 0) {
      errors[field] = `${field} is required`;
    }
  });

  return errors;
};
