'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Plus,
  Grid,
  Tag,
  TrendingUp,
  AlertCircle,
  Clock,
  LogOut,
  ChevronDown,
  Warehouse,
  ArrowRightLeft,
  BookCheck,
  CheckSquare,
  Clock3,
  ShoppingCart,
  MapPin,
  Users,
  BarChart3,
  Settings,
  Activity,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: '/dashboard',
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    children: [
      {
        id: 'product-list',
        label: 'Product List',
        icon: <Grid className="w-4 h-4" />,
        href: '/dashboard/products',
      },
      {
        id: 'add-product',
        label: 'Add Product',
        icon: <Plus className="w-4 h-4" />,
        href: '/dashboard/products/add',
      },
      {
        id: 'sku-list',
        label: 'SKU List',
        icon: <Tag className="w-4 h-4" />,
        href: '/dashboard/sku',
      },
      {
        id: 'categories',
        label: 'Categories',
        icon: <Grid className="w-4 h-4" />,
        href: '/dashboard/categories',
      },
      {
        id: 'brands',
        label: 'Brands',
        icon: <TrendingUp className="w-4 h-4" />,
        href: '/dashboard/brands',
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <Warehouse className="w-5 h-5" />,
    children: [
      {
        id: 'inventory-overview',
        label: 'Inventory Overview',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/inventory',
      },
      {
        id: 'batch-stock',
        label: 'Batch Stock',
        icon: <Grid className="w-4 h-4" />,
        href: '/dashboard/batch-stock',
      },
      {
        id: 'low-stock',
        label: 'Low Stock Alerts',
        icon: <AlertCircle className="w-4 h-4" />,
        href: '/dashboard/low-stock',
      },
      {
        id: 'expiry-alerts',
        label: 'Expiry Alerts',
        icon: <Clock className="w-4 h-4" />,
        href: '/dashboard/expiry-alerts',
      },
      {
        id: 'stock-ledger',
        label: 'Stock Ledger',
        icon: <Clock3 className="w-4 h-4" />,
        href: '/dashboard/stock-ledger',
      },
    ],
  },
  {
    id: 'inward',
    label: 'Inward (Stock Entry)',
    icon: <ArrowRightLeft className="w-5 h-5" />,
    children: [
      {
        id: 'purchase-inward',
        label: 'Purchase Inward',
        icon: <BookCheck className="w-4 h-4" />,
        href: '/dashboard/purchase-inward',
      },
      {
        id: 'return-inward',
        label: 'Customer Return',
        icon: <BookCheck className="w-4 h-4" />,
        href: '/dashboard/return-inward',
      },
      {
        id: 'adjustment-inward',
        label: 'Adjustment Inward',
        icon: <BookCheck className="w-4 h-4" />,
        href: '/dashboard/adjustment-inward',
      },
    ],
  },
  {
    id: 'transfers',
    label: 'Transfers',
    icon: <ArrowRightLeft className="w-5 h-5" />,
    children: [
      {
        id: 'create-transfer',
        label: 'Create Transfer',
        icon: <Plus className="w-4 h-4" />,
        href: '/dashboard/create-transfer',
      },
      {
        id: 'transfer-list',
        label: 'Transfer List',
        icon: <Grid className="w-4 h-4" />,
        href: '/dashboard/transfers',
      },
      {
        id: 'pending-transfers',
        label: 'Pending Transfers',
        icon: <Clock className="w-4 h-4" />,
        href: '/dashboard/pending-transfers',
      },
      {
        id: 'damaged-transfers',
        label: 'Damaged Transfers',
        icon: <AlertCircle className="w-4 h-4" />,
        href: '/dashboard/damaged-transfers',
      },
    ],
  },
  {
    id: 'reservations',
    label: 'Reservations',
    icon: <CheckSquare className="w-5 h-5" />,
    children: [
      {
        id: 'active-reservations',
        label: 'Active Reservations',
        icon: <CheckSquare className="w-4 h-4" />,
        href: '/dashboard/active-reservations',
      },
      {
        id: 'expired-reservations',
        label: 'Expired Reservations',
        icon: <Clock className="w-4 h-4" />,
        href: '/dashboard/expired-reservations',
      },
      {
        id: 'reservation-logs',
        label: 'Reservation Logs',
        icon: <Clock3 className="w-4 h-4" />,
        href: '/dashboard/reservation-logs',
      },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    children: [
      {
        id: 'ecommerce-orders',
        label: 'Ecommerce Orders',
        icon: <ShoppingCart className="w-4 h-4" />,
        href: '/dashboard/ecommerce-orders',
      },
      {
        id: 'pos-orders',
        label: 'POS Orders',
        icon: <ShoppingCart className="w-4 h-4" />,
        href: '/dashboard/pos-orders',
      },
      {
        id: 'returns',
        label: 'Returns & Refunds',
        icon: <ArrowRightLeft className="w-4 h-4" />,
        href: '/dashboard/returns',
      },
    ],
  },
  {
    id: 'branches',
    label: 'Branches & Locations',
    icon: <MapPin className="w-5 h-5" />,
    children: [
      {
        id: 'all-locations',
        label: 'All Locations',
        icon: <MapPin className="w-4 h-4" />,
        href: '/dashboard/locations',
      },
      {
        id: 'add-location',
        label: 'Add Location',
        icon: <Plus className="w-4 h-4" />,
        href: '/dashboard/locations/add',
      },
      {
        id: 'location-inventory',
        label: 'Location Inventory View',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/location-inventory',
      },
    ],
  },
  {
    id: 'vendors',
    label: 'Vendors',
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        id: 'vendor-list',
        label: 'Vendor List',
        icon: <Users className="w-4 h-4" />,
        href: '/dashboard/vendors',
      },
      {
        id: 'add-vendor',
        label: 'Add Vendor',
        icon: <Plus className="w-4 h-4" />,
        href: '/dashboard/vendors/add',
      },
      {
        id: 'vendor-invoices',
        label: 'Vendor Invoices',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/vendor-invoices',
      },
    ],
  },
  {
    id: 'members',
    label: 'Members / Customers',
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        id: 'customer-list',
        label: 'Customer List',
        icon: <Users className="w-4 h-4" />,
        href: '/dashboard/customers',
      },
      {
        id: 'memberships',
        label: 'Memberships',
        icon: <CheckSquare className="w-4 h-4" />,
        href: '/dashboard/memberships',
      },
      {
        id: 'return-history',
        label: 'Return History',
        icon: <Clock3 className="w-4 h-4" />,
        href: '/dashboard/return-history',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      {
        id: 'inventory-report',
        label: 'Inventory Report',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/reports/inventory',
      },
      {
        id: 'batch-report',
        label: 'Batch Report',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/reports/batch',
      },
      {
        id: 'transfer-report',
        label: 'Transfer Report',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/reports/transfer',
      },
      {
        id: 'sales-report',
        label: 'Sales Report',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/reports/sales',
      },
      {
        id: 'return-report',
        label: 'Return Report',
        icon: <BarChart3 className="w-4 h-4" />,
        href: '/dashboard/reports/return',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        id: 'tax-settings',
        label: 'Tax Settings',
        icon: <Settings className="w-4 h-4" />,
        href: '/dashboard/settings/tax',
      },
      {
        id: 'units',
        label: 'Units & Measurement',
        icon: <Settings className="w-4 h-4" />,
        href: '/dashboard/settings/units',
      },
      {
        id: 'roles',
        label: 'Roles & Permissions',
        icon: <Settings className="w-4 h-4" />,
        href: '/dashboard/settings/roles',
      },
      {
        id: 'app-config',
        label: 'App Configuration',
        icon: <Settings className="w-4 h-4" />,
        href: '/dashboard/settings/config',
      },
    ],
  },
  {
    id: 'logs',
    label: 'System / Logs',
    icon: <Activity className="w-5 h-5" />,
    children: [
      {
        id: 'activity-logs',
        label: 'Activity Logs',
        icon: <Activity className="w-4 h-4" />,
        href: '/dashboard/logs/activity',
      },
      {
        id: 'error-logs',
        label: 'Error Logs',
        icon: <AlertCircle className="w-4 h-4" />,
        href: '/dashboard/logs/error',
      },
      {
        id: 'job-queue',
        label: 'Job Queue Monitor',
        icon: <Activity className="w-4 h-4" />,
        href: '/dashboard/logs/job-queue',
      },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isItemActive = (item: MenuItem): boolean => {
    if (item.href) {
      return pathname === item.href || pathname.startsWith(item.href + '/');
    }
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleExpand(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
              }`}
              style={{ paddingLeft: `${12 + level * 12}px` }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isExpanded && (
              <div className="space-y-1">
                {item.children?.map((child) => renderMenuItem(child, level + 1))}
              </div>
            )}
          </>
        ) : (
          <Link href={item.href || '#'}>
            <a
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
              }`}
              style={{ paddingLeft: `${12 + level * 12}px` }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto transition-transform duration-300 z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:z-auto`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 p-6 border-b border-slate-700 bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Warehouse className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">Inventory</h2>
                <p className="text-xs text-slate-400">Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-300 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <nav className="flex-1 p-4 space-y-1">
          {MENU_ITEMS.map((item) => renderMenuItem(item))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-700 p-4">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-700/50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
    >
      <Menu className="w-5 h-5" />
    </Button>
  );
}
