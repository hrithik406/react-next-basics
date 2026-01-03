import Link from "next/link"

export default function NavBtn(navBtn: { iconsrc: string, navName: string, className?: string, linked: string }) {
    return (
        <Link rel="stylesheet" href={navBtn.linked}>
            <button className={`${navBtn.className} w-full flex items-center space-x-3 px-4 py-2 text-sm xl:text-base text-gray-600 hover:bg-gray-100 rounded-lg hover:font-medium hover:text-black hover:px-6 transition-all duration-300 hover:cursor-pointer focus:bg-gray-200 focus:text-black focus:font-medium focus:shadow-[5px_2px_10px_rgba(0,0,0,0.1)`}>
                <span className="w-4 h-4 text-black"><img src={navBtn.iconsrc} alt="" /></span>
                <span className="px-2 ">{navBtn.navName}</span>
            </button>
        </Link>
    )
}