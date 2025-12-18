import { Children } from "react";
// import React, { useState } from 'react';
import Link from 'next/link'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid grid-cols-[1fr_5fr] w-full h-full min-h-screen">
     <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-xl font-bold text-black">Tenx</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">🏠</span>
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 bg-gray-100 text-gray-900 rounded-lg">
              <span className="text-xl">👥</span>
              <span>Leads & Contacts</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">📈</span>
              <span>Deals Pipeline</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">📊</span>
              <span>Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">✓</span>
              <span>Tasks & Activities</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">💬</span>
              <span>Messages</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="p-4">
          <div className="bg-linear-to-br from-orange-100 to-yellow-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">Upgrade to Pro</h3>
            <p className="text-sm text-gray-600 mb-4">Unlock advanced features and unlimited contacts</p>
            <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-50">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <span>☀️</span>
              <span>Light</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg">
              <span>🌙</span>
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-600/20">{children}</div>
    
    </section>
  )
}