'use client';

import { Card } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Inventory Overview</h1>
        <p className="text-slate-400 mt-1">Real-time inventory status across all locations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total SKUs', value: '542', icon: '📦' },
          { label: 'Total Quantity', value: '12,485', icon: '📊' },
          { label: 'Stock Value', value: '₹85,420', icon: '💰' },
          { label: 'Last Updated', value: '2 mins ago', icon: '🕐' },
        ].map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700 p-6">
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Location-wise Stock</h2>
        </div>
        <div className="space-y-4">
          {['Main Warehouse', 'Sanpada', 'Ghansoli', 'Nerul', 'Ulwe'].map((location) => (
            <div key={location}>
              <div className="flex justify-between mb-2">
                <span className="text-slate-300 text-sm">{location}</span>
                <span className="text-white font-medium">{Math.floor(Math.random() * 3000) + 1000} units</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
