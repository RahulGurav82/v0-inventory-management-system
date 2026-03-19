'use client';

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import {
  Package,
  Warehouse,
  TrendingUp,
  AlertCircle,
  Box,
  ArrowRightLeft,
  Zap,
  BarChart3,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Products',
      value: '2,543',
      icon: Package,
      color: 'bg-blue-500/20 text-blue-400',
      trend: '+12.5%',
    },
    {
      label: 'Stock Value',
      value: '₹45,230',
      icon: TrendingUp,
      color: 'bg-emerald-500/20 text-emerald-400',
      trend: '+8.2%',
    },
    {
      label: 'Low Stock Items',
      value: '24',
      icon: AlertCircle,
      color: 'bg-orange-500/20 text-orange-400',
      trend: '-3.1%',
    },
    {
      label: 'Stock Transfers',
      value: '156',
      icon: ArrowRightLeft,
      color: 'bg-purple-500/20 text-purple-400',
      trend: '+22%',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Stock In',
      product: 'Product SKU-001',
      quantity: '50 units',
      location: 'Main Warehouse',
      time: '2 hours ago',
    },
    {
      id: 2,
      action: 'Transfer',
      product: 'Product SKU-045',
      quantity: '30 units',
      location: 'Sanpada → Nerul',
      time: '4 hours ago',
    },
    {
      id: 3,
      action: 'Low Stock Alert',
      product: 'Product SKU-123',
      quantity: '5 units remaining',
      location: 'Ghansoli',
      time: '6 hours ago',
    },
    {
      id: 4,
      action: 'Return',
      product: 'Product SKU-089',
      quantity: '15 units',
      location: 'Ulwe',
      time: '1 day ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to Inventory Management</h2>
        <p className="text-blue-100">
          You are logged in at <span className="font-semibold">{user?.location}</span> warehouse.
          Monitor your stock, manage transfers, and track inventory in real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white mb-3">{stat.value}</h3>
                  <p className={`text-xs font-medium ${stat.color.split(' ')[1]}`}>
                    {stat.trend} from last month
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-slate-700">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-slate-700/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">
                        {activity.action}
                      </span>
                      <span className="text-slate-400 text-sm">{activity.time}</span>
                    </div>
                    <p className="text-white font-medium">{activity.product}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-400 text-sm">{activity.location}</p>
                  <p className="text-emerald-400 font-medium">{activity.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="p-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-400" />
              Quick Actions
            </h3>
          </div>
          <div className="p-6 space-y-3">
            <a
              href="/dashboard/purchase-inward"
              className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 hover:border-blue-500/50"
            >
              <p className="text-white font-medium text-sm mb-1">Stock In</p>
              <p className="text-slate-400 text-xs">Add new inventory</p>
            </a>
            <a
              href="/dashboard/create-transfer"
              className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 hover:border-emerald-500/50"
            >
              <p className="text-white font-medium text-sm mb-1">Create Transfer</p>
              <p className="text-slate-400 text-xs">Move stock between locations</p>
            </a>
            <a
              href="/dashboard/low-stock"
              className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 hover:border-orange-500/50"
            >
              <p className="text-white font-medium text-sm mb-1">Low Stock Alerts</p>
              <p className="text-slate-400 text-xs">View items needing restock</p>
            </a>
            <a
              href="/dashboard/reports/inventory"
              className="block p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600 hover:border-purple-500/50"
            >
              <p className="text-white font-medium text-sm mb-1">View Reports</p>
              <p className="text-slate-400 text-xs">Analytics & insights</p>
            </a>
          </div>
        </Card>
      </div>

      {/* Warehouse Overview */}
      <Card>
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Warehouse className="w-5 h-5 text-emerald-400" />
            Warehouse Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Capacity Used', value: '72%', color: 'bg-emerald-500' },
              { label: 'Inventory Turnover', value: '4.2x', color: 'bg-blue-500' },
              { label: 'Space Available', value: '28%', color: 'bg-slate-500' },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-slate-400 text-sm mb-3">{item.label}</p>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${item.color} transition-all`}
                    style={{
                      width: index === 0 ? '72%' : index === 1 ? '85%' : '28%',
                    }}
                  />
                </div>
                <p className="text-white font-bold text-lg mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
