import { Children } from "react";
import Link from 'next/link'
import NavBtn from "./components/NavBtn";
import HeaderButton from "./components/HeaderButton";
import SocialBtn from "./components/socialBtn";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  type NavlistType = {
    iconsrc: string;
    navName: string;
    linked: string;
  }

  const NavList = [
    {
      iconsrc: "/dashboard.png",
      navName: "Profile",
      linked: "/dashboard/profile"
    },
    {
      iconsrc: "/leads.png",
      navName: "Leads & Contacts",
      linked: "/dashboard"
    },
    {
      iconsrc: "/deals.png",
      navName: "Deals Pipeline",
      linked: "#"
    },
    {
      iconsrc: "/analytics.png",
      navName: "Analytics",
      linked: "#"
    },
    {
      iconsrc: "/list-check.svg",
      navName: "Tasks & Activities",
      linked: "#"
    },
    {
      iconsrc: "/message.png",
      navName: "Contact Us",
      linked: "/dashboard/Contact"
    },
    {
      iconsrc: "/settings.png",
      navName: "About Us",
      linked: "/dashboard/about"
    },
  ]

  const NavListCard = (Navbtn: NavlistType) => (
    <NavBtn iconsrc={Navbtn.iconsrc} navName={Navbtn.navName} linked={Navbtn.linked}></NavBtn>
  )

  return (
    <section className="font-outfit grid grid-cols-[1fr_7fr] max-lg:grid-cols-[0_7fr] w-full h-full min-h-screen duration-100 ease-in-out relative">
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50 sticky top-0">
        {/* Overlay for mobile */}
        <div
          id="overlay"
          className="hidden fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        // onClick={toggleSidebar}
        ></div>

        {/* Sidebar */}
        <div
          id="mobile-sidebar"
          className="fixed top-0 lg:relative inset-y-0 left-0 w-64 xl:w-72 2xl:w-72 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col z-50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
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
              {NavList.map((NAV, i) => (
                <NavBtn key={i} {...NAV} />))}
            </div>
          </nav>

          {/* Upgrade Card */}
          <div className="p-4">
            <div className="bg-linear-to-tr from-orange-300 via-orange-100 to-slate-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm xl:text-base">Upgrade to Pro</h3>
              <p className="text-xs xl:text-sm text-gray-600 mb-4">Unlock advanced features and unlimited contacts</p>
              <button className="w-full mt-6 bg-white text-gray-900 py-2 px-4 rounded-lg font-medium text-sm hover:cursor-pointer hover:bg-gray-50">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className=" flex justify-center px-4 py-1.5 border-t border-gray-200">
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
      {/* Header */}
      <div className="flex flex-col relative bg-slate-100">
        <div className="bg-linear-to-b from-slate-100 via-slate-100 to-transparent w-full h-20 sticky top-0 z-20">
          <header className="px-2 py-3 md:px-6 md:pt-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-xl">
                <button
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                // onClick={toggleSidebar}
                >
                  <span className="text-xl text-black">☰</span>
                </button>
                <div className="relative flex-1 -ml-2">
                  <span className="absolute w-4.5 left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"><img src="/search.png" alt="" /></span>
                  <input
                    type="text"
                    placeholder="Search ....."
                    className="w-full bg-white pl-10 pr-4 py-2 text-sm text-black md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <span className="hidden md:block absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">⌘  K
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-2 mr-1">
                <HeaderButton className="hidden md:block" iconSrc="/search.png" />
                <HeaderButton className="hidden md:block" iconSrc="/bolts.png" />
                <HeaderButton iconSrc="/bells.png" />
                <div className="flex items-center bg-white border border-gray-200 rounded-3xl p-1 pr-1 space-x-2 hover:cursor-pointer">
                  <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-black hidden sm:block">Warren</span>
                  <span className="text-black sm:block">▼</span>
                </div>
              </div>
            </div>
          </header>
        </div>

        <div>{children}</div>
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-2.75 max-md:py-3 ">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-md:gap-0">
              <div className="flex relative gap-x-2 mb-2">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <span className="text-2xl font-bold text-black ">Tenx</span>
              </div>
              <p className="text-gray-700 mx-auto text-center md:text-left mb-2">
                © 2025 Sarah Johnson. All rights reserved.
              </p>
              <div className="flex items-center space-x-5">
                <SocialBtn iconSrc="/linkedin.png"></SocialBtn>
                <SocialBtn iconSrc="/instagram.png"></SocialBtn>
                <SocialBtn iconSrc="/twitter.png"></SocialBtn>
                <SocialBtn iconSrc="/github.png"></SocialBtn>
              </div>
            </div>
          </div>
        </footer>
      </div>


    </section>
  )
}