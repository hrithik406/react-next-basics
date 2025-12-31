import { Children } from "react";
import Link from 'next/link'

//    const toggleSidebar = () => {
//     const sidebar = document.getElementById('mobile-sidebar');
//     const overlay = document.getElementById('overlay');
    
//     if (sidebar.classList.contains('-translate-x-full')) {
//       sidebar.classList.remove('-translate-x-full');
//       overlay.classList.remove('hidden');
//     } else {
//       sidebar.classList.add('-translate-x-full');
//       overlay.classList.add('hidden');
//     }
//   };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)


{
  return (
    <section className="font-outfit grid grid-cols-[1fr_5fr] max-lg:grid-cols-[0_6fr] w-full h-full min-h-screen duration-100 ease-in-out">
     <div className="flex flex-col lg:flex-row h-screen bg-gray-50 relative">
      {/* Overlay for mobile */}
      <div 
        id="overlay"
        className="hidden fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        // onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className="fixed lg:relative inset-y-0 left-0 w-64 xl:w-72 2xl:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-black">Tenx</span>
            <button 
              className="ml-auto lg:hidden p-2 hover:bg-gray-100 rounded"
            //   onClick={toggleSidebar}
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 p-4 overflow-y-auto">
          <div className="space-y-1 w-full">
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer">
              <span className="w-4 h-4 text-black"><img src="/dashboard.png" alt="" /></span>
              <span className="px-2 ">Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base bg-gray-200 text-gray-900 rounded-lg hover:font-medium hover:text-black shadow-[1px_2px_10px_rgba(0,0,0,0.1)]">
              <span className="w-4 h-4 text-black"><img src="/leads.png" alt="" /></span>
              <span className="px-2">Leads & Contacts</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer">
              <span className="w-4 h-4 text-black"><img src="/deals.png" alt="" /></span>
              <span className="px-2">Deals Pipeline</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer">
              <span className="w-4 h-4 text-black"><img src="/analytics.png" alt="" /></span>
              <span className="px-2">Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer">
              <span className="w-4 h-4"><img src="/list-check.svg" alt="" /></span>
              <span className="px-2">Tasks & Activities</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer">
              <span className="w-4 h-4 text-black"><img src="/message.png" alt="" /></span>
              <span className="px-2">Messages</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer">
              <span className="w-4 h-4 text-black"><img src="/settings.png" alt="" /></span>
              <span className="px-2">Settings</span>
            </button>
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="p-4">
          <div className="bg-linear-to-tr from-orange-300 via-orange-100 to-slate-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm xl:text-base">Upgrade to Pro</h3>
            <p className="text-xs xl:text-sm text-gray-600 mb-4">Unlock advanced features and unlimited contacts</p>
            <button className="w-full mt-6 bg-white text-gray-900 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-50">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className=" flex justify-center p-4 border-t border-gray-200">
          <div className="flex items-center bg-gray-200 p-2 border rounded-full space-x-2 text-xs xl:text-sm">
            <button className="flex items-center text-black space-x-1 px-3 py-1.5 bg-gray-50 hover:cursor-pointer rounded-2xl">
              <span className="w-4 "><img src="/sun.png" alt="" /></span>
              <span>Light</span>
            </button>
            <button className="flex items-center text-black space-x-1 px-3 py-1.5  hover:cursor-pointer rounded-2xl">
              <span className="w-4"><img src="/moon.png" alt="" /></span>
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>{children}</div>
    
    </section>
  )
}