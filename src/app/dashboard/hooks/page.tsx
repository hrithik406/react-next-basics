"use client"
import { useState, useMemo } from "react"
import { initialItems } from "../components/Initialitems"

export default function UseOfHooks() {
    const [Count, setCount] = useState(0)
    const [items] = useState(initialItems)

    const selectedItem = useMemo(
        () => items.find((item) => item.isSelected)
        , [items]
    )

    const handleClick = () => {
        setCount(Count + 1)
    }
    return (
        <>
            <div className='flex flex-col items-left justify-center p-4'>
                <h1 className='text-black text-xl'>Count: {Count}</h1>
                <h1 className='text-black text-xl'>Selected Item : {selectedItem?.id}</h1>
                <button className='text-xl p-1 border-2 w-30 rounded-2xl bg-blue-500' onClick={() => setCount(Count + 1)}>Increment</button>
            </div>
        </>
    )
}