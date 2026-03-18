'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRightLeft } from 'lucide-react';

export default function TransfersPage() {
  const transfers = [
    {
      id: 'T001',
      from: 'Main Warehouse',
      to: 'Sanpada',
      items: 45,
      status: 'Completed',
      date: '2024-03-15',
    },
    {
      id: 'T002',
      from: 'Nerul',
      to: 'Ghansoli',
      items: 28,
      status: 'In Transit',
      date: '2024-03-16',
    },
    {
      id: 'T003',
      from: 'Ulwe',
      to: 'Main Warehouse',
      items: 52,
      status: 'Pending',
      date: '2024-03-17',
    },
  ];

  const statusColors = {
    Completed: 'bg-emerald-500/20 text-emerald-400',
    'In Transit': 'bg-blue-500/20 text-blue-400',
    Pending: 'bg-orange-500/20 text-orange-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Stock Transfers</h1>
          <p className="text-slate-400 mt-1">Manage transfers between warehouse locations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Transfer
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Transfer ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">From → To</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-medium">{transfer.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>{transfer.from}</span>
                      <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                      <span>{transfer.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{transfer.items}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[transfer.status as keyof typeof statusColors]}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{transfer.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
