// export default async function DynamicIdRouting({ params }: { params: Promise<{ slug: string }>}) {
//     const {slug} =await params
//     let lang = ["python","java","javascript","cpp","cs"]
//     if(lang.includes(slug)){
//         return (
//             <div className="text-black text-4xl font-bold">My Post: {slug}</div>
//         )
//     }
//     else{
//         return(
//             <div className="text-black text-4xl font-bold">Post Not Found</div>
//         )
//     }
// }

"use client"; // Required for interactivity

import { useState } from 'react';
import NavBtn from '../../components/NavBtn';

 type NavlistType = {
        iconsrc: string;
        navName: string;
        linked: string;
    }

    const NavList: NavlistType[] = [
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
            navName: "Dog API",
            linked: "/dashboard/dog"
        },
        {
            iconsrc: "/analytics.png",
            navName: "Dynamic Routing",
            linked: "/dashboard/routing"
        },
        {
            iconsrc: "/list-check.svg",
            navName: "USE STATE",
            linked: "/dashboard/client"
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



export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
   

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

   
    return (
        <>

        
            {/* Button to trigger the function */}
            <button
                onClick={toggleSidebar}
                className="fixed left-2 top-3 z-50 p-2 md:left-4 md:top-3.5 md:text-2xl text-black rounded lg:invisible text-xl font-bold"
            >
                {isOpen ? "" : "☰"}
            </button>

            {/* The Sidebar UI */}
            <div className={`fixed z-100 top-0 left-0 h-full bg-white text-black transition-transform duration-300 w-64 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-black flex items-center justify-center">
                            <span className="text-white font-bold text-xl">T</span>
                        </div>
                        <span className="text-2xl font-bold text-black">Tenx</span>
                        <button
                            className="ml-auto lg:hidden p-2 hover:bg-gray-100 rounded"
                            onClick={toggleSidebar}
                        >
                            <span className="text-xl">✕</span>
                        </button>
                    </div>
                </div>

            {/* Navigation */}
            <nav className="flex flex-1 p-4 overflow-y-auto">
                    <div className="space-y-1 w-full">
                        {NavList.map((nav, i) => (
                            <NavBtn key={i} {...nav} />))}
                    </div>
                </nav>

            {/* Upgrade Card */}
            <div className="p-4 mt-26 mb-18">
                    <div className="bg-linear-to-tr from-orange-300 via-orange-100 to-slate-100 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm xl:text-base">Upgrade to Pro</h3>
                        <p className="text-xs xl:text-sm text-gray-600 mb-4">Unlock advanced features and unlimited contacts</p>
                        <button className="w-full mt-6 bg-white text-gray-900 py-2 px-4 rounded-lg font-medium text-sm hover:cursor-pointer hover:bg-gray-50">
                            Upgrade Now
                        </button>
                    </div>
                </div>

            {/* Theme Toggle */}
            <div className=" flex justify-center px-4 pt-3 border-t border-gray-200">
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
        </>
    );
}

