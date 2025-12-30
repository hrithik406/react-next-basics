import { ReactNode } from "react";

export default function ContactBtn(contact: { iconSrc: string, children: ReactNode }) {
    return (
        <div className="flex items-center space-x-2 text-gray-600 truncate">
            <span className="shrink-0 w-4"><img src={contact.iconSrc} alt="" /></span>
            <span className="truncate">{contact.children}</span>
        </div>
    )
}