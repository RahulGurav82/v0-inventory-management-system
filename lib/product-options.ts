export const CASE_TYPES = ["JAR", "BOX", "POUCH", "BOTTLE", "SACHET", "TUB"] as const;

export const PRODUCT_PACKAGING_LEVELS = ["CONSUMER_UNIT", "INNER_PACK", "CASE", "MASTER_CASE"] as const;

export const PRODUCT_CHANNELS = ["POS", "ECOMMERCE", "BOTH"] as const;

export const MEASUREMENT_UNITS = ["COUNT", "G", "KG", "ML", "L"] as const;

export const PACKAGING_TYPES = ["JAR", "BOX", "POUCH", "BOTTLE"] as const;

export const DIMENSION_UNITS = ["CM", "MM", "INCH"] as const;

export const MASS_MEASUREMENT_UNITS = ["KG", "G", "LB"] as const;

export const TAX_TYPES = ["GST", "VAT", "NONE"] as const;

export const MRP_LOCATIONS = ["INDIA", "USA", "UK", "CANADA"] as const;

export const COUNTRIES = [
  "India",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Singapore",
] as const;

export const TARGET_MARKETS = ["INDIA", "USA", "UK", "GLOBAL"] as const;

// Sample categories with subcategories
export const PRODUCT_CATEGORIES: Record<string, string[]> = {
  "Beverages": ["Drinks", "Juices", "Energy Drinks", "Soft Drinks"],
  "Dairy & Eggs": ["Milk", "Cheese", "Yogurt", "Butter"],
  "Snacks": ["Chips", "Nuts", "Cookies", "Crackers"],
  "Personal Care": ["Shampoo", "Soap", "Deodorant", "Lotion"],
  "Home Care": ["Detergent", "Cleaner", "Disinfectant", "Air Freshener"],
  "Health & Wellness": ["Vitamins", "Supplements", "Medicine", "First Aid"],
  "Baby Products": ["Diapers", "Formula", "Wipes", "Bottles"],
  "Pet Care": ["Dog Food", "Cat Food", "Treats", "Accessories"],
};

export const BRANDS = [
  "Amul",
  "Nestlé",
  "ITC",
  "Britannia",
  "Marico",
  "Unilever",
  "P&G",
  "Himalaya",
  "Patanjali",
  "Baidyanath",
] as const;
