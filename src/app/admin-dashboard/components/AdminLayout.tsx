'use client';
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '64px' : '240px' }}
      >
        <AdminTopbar onMobileMenuOpen={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-auto py-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}