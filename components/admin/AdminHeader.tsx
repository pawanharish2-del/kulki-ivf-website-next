'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-end border-b border-gray-200 bg-white/70 backdrop-blur-xl px-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex lg:flex-col lg:items-end">
            <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
              Administrator
            </span>
          </div>
          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2"
            title="Logout"
          >
            <span className="text-sm font-medium">Log out</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
