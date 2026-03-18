'use client';

import { Card } from '@/components/ui/card';
import { usePathname } from 'next/navigation';

export default function DynamicPage() {
  const pathname = usePathname();
  const pageName = pathname.split('/').pop() || 'Page';
  const displayName = pageName
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{displayName}</h1>
        <p className="text-slate-400 mt-1">Page content coming soon</p>
      </div>

      <Card className="bg-slate-800 border-slate-700 p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Page Under Development</h2>
          <p className="text-slate-400 mb-4">
            The {displayName} page is currently being developed. This page will contain comprehensive features for managing your inventory operations.
          </p>
          <p className="text-slate-500 text-sm">
            Route: <span className="font-mono bg-slate-700 px-3 py-1 rounded">{pathname}</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
