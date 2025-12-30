import { ReactNode } from "react";

export default function LeadsBtn({ children, className }: { className?: string, children: ReactNode }) {
    return (
        <button className={`${className} px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm hover:cursor-pointer`}>
            {children}
        </button>
    )
}

function somwthing({ name, age }: { name: string, age: null }) {
    console.log(name)
    return null
}
