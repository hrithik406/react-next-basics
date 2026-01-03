export default function  Calc(){
    return(
        <div className="flex h-screen relative justify-center items-center">
        <div className="h-120 w-100 border-transparent rounded-4xl bg-slate-900">
            <div className="flex justify-center text-black m-5">
                <input className="h-13 w-90 mt-3 border-2 rounded-2xl px-2 bg-teal-600 text-3xl" type="number" dir="rtl" placeholder='0'/>
            </div>
            <div className="px-5">
            <div className="grid h-90 w-93 -m-2  grid-cols-4 gap-2 grid-rows-5 p-2">
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">AC</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">( )</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">%</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">/</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">7</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">8</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">9</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">*</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">4</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">5</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">6</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">-</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">1</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">2</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">3</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">+</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">0</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl">.</div>
            <div className="flex justify-center items-center bg-green-900 text-black font-bold text-3xl border rounded-2xl col-span-2">=</div>
            </div>
            

        </div>
        </div>
        </div>
    )

}