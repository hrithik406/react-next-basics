export default function HeaderButton(props: { iconSrc: string, className?: string }) {
    return (
        <button className={`${props.className} p-2 px-2.5 border rounded-3xl bg-white w-10 h-10 border-gray-200 hover:bg-gray-100 hover:cursor-pointer`}>
            <span className="text-gray-600"><img src={props.iconSrc} alt="" /></span>
        </button>
    )
}