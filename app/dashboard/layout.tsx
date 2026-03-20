'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Sidebar, SidebarToggle } from '@/components/sidebar';
import { User, MapPin, LogOut, Settings, ChevronDown } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)} />
              <div>
                <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
                <p className="text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {user.location}
                </p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors justify-center">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 border-b border-slate-700">
                    <p className="text-sm font-medium text-white">Logged in as</p>
                    <p className="text-xs text-slate-400">+91 {user.phone}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 flex items-center gap-2 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 flex items-center gap-2 transition-colors border-t border-slate-700"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
