'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter, BarChart3 } from 'lucide-react';

export default function InventoryReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory Report</h1>
          <p className="text-slate-400 mt-1">Detailed inventory analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Stock Value', value: '₹2,54,850', icon: '💰' },
          { label: 'Avg Stock Turnover', value: '4.2x', icon: '🔄' },
          { label: 'Inventory Accuracy', value: '99.2%', icon: '✓' },
        ].map((stat, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700 p-6">
            <p className="text-4xl mb-3">{stat.icon}</p>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Stock Movement Trends</h2>
        </div>
        <div className="h-64 flex items-center justify-center bg-slate-700/50 rounded-lg">
          <p className="text-slate-400">Chart placeholder - Stock movement data</p>
        </div>
      </Card>
    </div>
  );
}
