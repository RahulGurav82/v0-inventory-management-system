'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingDown, Package, AlertTriangle, Clock, Warehouse, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function InventoryPage() {
  // Sample data
  const summaryCards = [
    { label: 'Total Stock', value: '45,230', trend: '+12%', color: 'primary' },
    { label: 'Available Stock', value: '38,950', trend: '+8%', color: 'primary' },
    { label: 'Reserved Stock', value: '4,280', trend: '+5%', color: 'primary' },
    { label: 'Low Stock', value: '1,650', trend: '-3%', color: 'destructive' },
    { label: 'Out of Stock', value: '287', trend: '-15%', color: 'destructive' },
    { label: 'Damaged Stock', value: '83', trend: '-2%', color: 'destructive' },
  ];

  const locations = [
    { name: 'Main Warehouse', stock: 15420, percentage: 85 },
    { name: 'Sanpada', stock: 8930, percentage: 72 },
    { name: 'Ghansoli', stock: 12050, percentage: 90 },
    { name: 'Nerul', stock: 5840, percentage: 68 },
    { name: 'Ulwe', stock: 2990, percentage: 55 },
  ];

  const lowStockAlerts = [
    { sku: 'SKU-001', product: 'Protein Powder', current: 45, reorderLevel: 100 },
    { sku: 'SKU-012', product: 'Whey Isolate', current: 62, reorderLevel: 150 },
    { sku: 'SKU-045', product: 'Multivitamin', current: 28, reorderLevel: 100 },
  ];

  const expiryAlerts = [
    { sku: 'SKU-089', product: 'Vitamin D3', batch: 'BATCH-2024-001', expiryDate: '2026-04-15', daysLeft: 20 },
    { sku: 'SKU-102', product: 'Fish Oil', batch: 'BATCH-2024-005', expiryDate: '2026-05-20', daysLeft: 55 },
  ];

  const recentInwards = [
    { inwardId: 'IW-001', supplier: 'TFC Nutrition', items: 12, quantity: 2400, date: '2026-03-25', status: 'Completed' },
    { inwardId: 'IW-002', supplier: 'NutroLife', items: 8, quantity: 1800, date: '2026-03-24', status: 'Completed' },
    { inwardId: 'IW-003', supplier: 'VitaCore', items: 5, quantity: 950, date: '2026-03-23', status: 'Pending' },
  ];

  const recentTransfers = [
    { transferId: 'TR-001', from: 'Main Warehouse', to: 'Sanpada', items: 6, quantity: 450, date: '2026-03-25', status: 'Completed' },
    { transferId: 'TR-002', from: 'Ghansoli', to: 'Nerul', items: 3, quantity: 280, date: '2026-03-24', status: 'In Transit' },
  ];

  const activeReservations = [
    { reservationId: 'RES-001', product: 'Protein Powder', quantity: 100, reservedFor: 'Order #5001', expiryDate: '2026-03-30' },
    { reservationId: 'RES-002', product: 'Multivitamin', quantity: 50, reservedFor: 'Order #5002', expiryDate: '2026-03-28' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Overview</h1>
          <p className="text-muted-foreground mt-1">Real-time inventory status across all locations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index} className="p-4">
            <p className="text-muted-foreground text-xs mb-2">{card.label}</p>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className={`text-xs mt-2 ${card.color === 'primary' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {card.trend} from last month
            </p>
          </Card>
        ))}
      </div>

      {/* Quick Actions and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h2 className="font-semibold text-foreground">Low Stock Alerts</h2>
          </div>
          <div className="space-y-3">
            {lowStockAlerts.map((alert) => (
              <div key={alert.sku} className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground">{alert.product}</p>
                <p className="text-xs text-muted-foreground">{alert.sku}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs">Current: {alert.current}</span>
                  <span className="text-xs text-destructive">Reorder: {alert.reorderLevel}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Expiry Alerts */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-destructive" />
            <h2 className="font-semibold text-foreground">Expiry Alerts</h2>
          </div>
          <div className="space-y-3">
            {expiryAlerts.map((alert) => (
              <div key={alert.sku} className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground">{alert.product}</p>
                <p className="text-xs text-muted-foreground">{alert.batch}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs">{alert.expiryDate}</span>
                  <span className="text-xs text-destructive">{alert.daysLeft} days</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Location Stock Summary */}
        <Card className="p-6 lg:col-span-1">
          <h2 className="font-semibold text-foreground mb-4">Location Summary</h2>
          <div className="space-y-3">
            {locations.map((location) => (
              <div key={location.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-foreground">{location.name}</span>
                  <span className="text-xs font-medium text-foreground">{location.stock}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Inwards */}
        <Card className="p-6">
          <h2 className="font-semibold text-foreground mb-4">Recent Inwards</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-foreground font-medium">Inward ID</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Supplier</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Items</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Quantity</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Date</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInwards.map((inward) => (
                  <tr key={inward.inwardId} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-2 text-foreground">{inward.inwardId}</td>
                    <td className="py-3 px-2 text-muted-foreground">{inward.supplier}</td>
                    <td className="py-3 px-2 text-muted-foreground">{inward.items}</td>
                    <td className="py-3 px-2 text-foreground font-medium">{inward.quantity}</td>
                    <td className="py-3 px-2 text-muted-foreground">{inward.date}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        inward.status === 'Completed' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {inward.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Transfers */}
        <Card className="p-6">
          <h2 className="font-semibold text-foreground mb-4">Recent Transfers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-foreground font-medium">Transfer ID</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">From</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">To</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Quantity</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Date</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransfers.map((transfer) => (
                  <tr key={transfer.transferId} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-2 text-foreground">{transfer.transferId}</td>
                    <td className="py-3 px-2 text-muted-foreground">{transfer.from}</td>
                    <td className="py-3 px-2 text-muted-foreground">{transfer.to}</td>
                    <td className="py-3 px-2 text-foreground font-medium">{transfer.quantity}</td>
                    <td className="py-3 px-2 text-muted-foreground">{transfer.date}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        transfer.status === 'Completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        {transfer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Active Reservations */}
        <Card className="p-6">
          <h2 className="font-semibold text-foreground mb-4">Active Reservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 text-foreground font-medium">Reservation ID</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Product</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Quantity</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Reserved For</th>
                  <th className="text-left py-2 px-2 text-foreground font-medium">Expires</th>
                </tr>
              </thead>
              <tbody>
                {activeReservations.map((reservation) => (
                  <tr key={reservation.reservationId} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-2 text-foreground">{reservation.reservationId}</td>
                    <td className="py-3 px-2 text-muted-foreground">{reservation.product}</td>
                    <td className="py-3 px-2 text-foreground font-medium">{reservation.quantity}</td>
                    <td className="py-3 px-2 text-muted-foreground">{reservation.reservedFor}</td>
                    <td className="py-3 px-2 text-muted-foreground">{reservation.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
