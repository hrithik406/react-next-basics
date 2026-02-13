"use client"
import { useState, useEffect, useRef } from "react"

export default function PetFeeder() {
    const [Hunger, SetHunger] = useState(100)
    const [Happy, SetHappy] = useState(100)
    const [GameActive, SetGameActive] = useState(false)
    const [GameFinish, SetGameFinish] = useState(false)
    const intervalRef: any = useRef<number | null>(null)

    useEffect(() => {
        if (GameActive) {
            intervalRef.current = setInterval(() => {
                SetHunger((prevHunger) => {
                    if (prevHunger <= 1) {
                        SetGameActive(false)
                        SetGameFinish(true)
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current)
                        }
                        return 0
                    }
                    if(prevHunger >= 101){
                        SetGameActive(false)
                        SetGameFinish(true)
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current)
                        }
                        return 101 
                    }
                    return prevHunger - 1
                })
                SetHappy((prevHappy) => {
                    if (prevHappy <= 1) {
                        SetGameActive(false)
                        SetGameFinish(true)
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current)
                        }
                        return 0
                    }
                    return prevHappy - 1
                })
            }, 1000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [GameActive, Hunger])

    const feedClick = () => {
        if (GameActive) {
            SetHunger((prevHunger) => prevHunger + 10)
            SetHappy((prevHappy) => prevHappy + 5)
        }
    }

    const happyClick = () => {
        if (GameActive) {
            SetHappy((prevHappy) => prevHappy + 10)
        }
    }

    const StartGame = () => {
        SetHunger(100)
        SetHappy(100)
        SetGameActive(true)
        SetGameFinish(false)
    }

    const reset = () => {
        SetHunger(100)
        SetHappy(100)
        SetGameActive(false)
        SetGameFinish(false)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    return (
        <main className="flex items-center justify-center h-[70vh]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-130">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 text-gray-800">Pet Feeder</h1>
                <p className="text-center text-xl text-gray-600 mb-6 w-full">
                    Feed the pet and make the pet Happy
                </p>

                {!GameActive && !GameFinish && (
                    <div className="text-center">
                        <div className="bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mb-6">
                            <p className="text-xl text-gray-700 mb-4">
                                Click the buttons to feed and play with the pet!
                            </p>
                            <div className="text-6xl mb-4">🦁</div>
                            <p className="text-2xl font-bold text-gray-800">Don't let the Pet DIE!</p>
                        </div>
                        <button onClick={StartGame} className="w-full py-4 px-8 bg-green-500 hover:bg-green-600 cursor-pointer text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all duration-200">
                            Start Game
                        </button>
                    </div>
                )}

                {GameActive && Hunger <= 100 && (
                    <div className="text-center">
                        <div className="bg-gray-100 rounded-2xl w-full py-6 mb-6">
                            <div className="text-6xl font-mono font-bold text-center mx-auto text-gray-800">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex-1">
                                        <p className="text-lg text-gray-600 mb-2">Stomach</p>
                                        <p className={`text-4xl font-bold ${Hunger <= 10 ? 'text-red-600' : 'text-black'}`}>
                                            {Hunger}
                                        </p>
                                    </div>
                                    <div className="w-px h-16 bg-gray-300"></div>
                                    <div className="flex-1">
                                        <p className="text-lg text-gray-600 mb-2">Happiness</p>
                                        <p className={`text-4xl font-bold ${Happy <= 10 ? 'text-red-600' : 'text-black'}`}>{Happy}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-3 mb-4">
                            <button onClick={feedClick} className="w-full py-6 px-8 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded-2xl shadow-xl active:scale-95 transition-all duration-100 cursor-pointer select-none">
                                FEED ME!
                            </button>
                            <button onClick={happyClick} className="w-full py-6 px-8 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded-2xl shadow-xl active:scale-95 transition-all duration-100 cursor-pointer select-none">
                                PLAY WITH ME!
                            </button>
                        </div>
                        <button onClick={reset} className="w-full py-4 px-8 bg-green-500 hover:bg-green-600 cursor-pointer text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all duration-200">
                            Reset Game
                        </button>
                    </div>
                )}

                {GameFinish && (
                    <div className="text-center">
                        <div className="bg-yellow-100 rounded-2xl p-6 mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                ☠️ The Pet is DEAD !! ☠️
                            </h2>
                            <p className="text-gray-600 text-lg">
                                {Hunger == 0 && "Died of Hunger"}
                                {Hunger >= 100 && "Died after Stomach Burst"}
                                {Happy == 0 && "Died from Depression"}
                            </p>
                        </div>

                        <button
                            onClick={StartGame}
                            className="w-full py-4 px-8 bg-green-500 hover:bg-green-600 cursor-pointer text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all duration-200"
                        >
                            Play Again
                        </button>
                    </div>
                )}

            </div>
        </main>
    )
}