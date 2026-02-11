// // "use client"; // 1. The Magic Word to make buttons work

// // import { useState } from "react";

// // export default function LikeButton() {
// //   // 2. The Memory [Current Value, Function to Change It]
// //   const [likes, setLikes] = useState(0);

// //   // 3. The Action
// //   function addLike() {
// //     setLikes(likes + 1);
// //   }

// //   return (
// //     // 4. The Trigger
// //     <button onClick={addLike} className="text-black hover:cursor-pointer">
// //       👍 Likes: {likes}
// //     </button>
// //   );
// // }

// "use client"

// import { createConnection } from "net"
// import { useState, useRef, useEffect } from "react"

// export default function Timer() {
//     const [timer, setTimer] = useState(0)
//     const intervalRef: any = useRef(0)
//     const divRef = useRef<HTMLDivElement>(null)

//     console.log("hello guyzzz")

//     const startTimer = () => {
//         intervalRef.current = setInterval(() => {
//             setTimer((prevTimer) => prevTimer + 1)
//         }, 1000)

//         if (!startTimer) return
//         startTimer.current.

//     }

//     const stopTimer = () => {
//         clearInterval(intervalRef.current)
//     }

//     // const invisible = () => {
//     //     if (!startTimer.current) return
//     //     startTimer.current.style.display = "none"
//     // }

//     const divChange = () => {
//         if (!divRef.current) return
//         divRef.current.style.backgroundColor = "yellow"
//     }

//     function ChatRoom({ timer }: { timer: number }) {
//         useEffect(() => {
//             console.log(timer)
//         }, [timer])
//         return (
//             <></>
//         )
//     }

//     return (
//         <>
//             <div ref={divRef} onClick={divChange} className="text-xl text-black">Timer: {timer}</div>
//             <button onClick={startTimer} className="text-xl text-black border-2">Start Timer</button>
//             <button onClick={stopTimer} className="text-xl text-black border-2">Stop Timer</button>
//             <ChatRoom timer={timer} />
//         </>
//     )
// }

"use client"

import React, { useState, useRef, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef:any = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    // return () => {
    //   if (intervalRef.current) {
    //     clearInterval(intervalRef.current);
    //   }
    // };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-106">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Timer</h1>
        
        <div className="bg-gray-100 rounded-2xl w-80 py-6 mb-8">
          <div className="text-6xl font-mono font-bold text-center mx-auto text-gray-800">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleStartPause}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-200 hover:cursor-pointer ${
              isRunning
                ? 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                : 'bg-green-500 hover:bg-green-600 active:scale-95'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={handleReset}
            className="flex-1 py-4 px-6 rounded-xl font-semibold text-white text-lg bg-red-500 hover:bg-red-600 active:scale-95 hover:cursor-pointer transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}