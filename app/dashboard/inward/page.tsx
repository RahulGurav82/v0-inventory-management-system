import PurchaseInwardForm from '@/components/purchase-inward-form';

export const metadata = {
  title: 'Purchase Inward | Inventory Management',
  description: 'Create and manage purchase inwards with batch and expiry tracking',
};

export default function InwardPage() {
  return <PurchaseInwardForm />;
}
