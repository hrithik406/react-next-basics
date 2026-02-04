"use client" 

export default function Btn(){

    function loging(){
        return console.log("kuch bhi")
        const a = 5+5
        console.log(a)
    }
    return (
        <div>
            <button onClick={kuch} className="text-black bg-blue-400">click</button>
            
        </div>
    )
}


function kuch(){
    if (true) return console.log(false)
    return console.log(true)
}
// if (error) return <ErrorComponent/>
// const json = await response.json()

// return <SuccessComponent/>