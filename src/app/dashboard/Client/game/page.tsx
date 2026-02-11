"use client"
import React, { useState, useRef, useEffect } from "react"

export default function ClickGame() {
    const [Score, SetScore] = useState(0)
    const [TimeLeft, SetTimeLeft] = useState(10)
    const [GameActive, SetGameActive] = useState(false)
    const [GameFinish, SetGameFinish] = useState(false)
    const intervalRef: any = useRef<number | null>(null)
    useEffect(() => {
        if (GameActive && TimeLeft > 0) {
            intervalRef.current = setInterval(() => {
                SetTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        SetGameActive(false)
                        SetGameFinish(true)
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current)
                        }
                        return 0
                    }
                    return prevTime - 1
                })
            }, 100);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [GameActive, TimeLeft])

    const handleClick = () => {
        if (GameActive) {
            SetScore((prevScore) => prevScore + 1)
        }
    }

    const StartGame = () => {
        SetScore(0)
        SetTimeLeft(10)
        SetGameActive(true)
        SetGameFinish(false)
    }

    const ResetGame = () => {
        SetScore(0)
        SetTimeLeft(10)
        SetGameActive(false)
        SetGameFinish(false)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }


    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white -mt-10 rounded-3xl shadow-2xl p-4 md:p-7 w-full max-w-md">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-800">
                    Click Speed Game
                </h1>
                <p className="text-center text-gray-600 mb-4">
                    How fast can you click in 10 seconds?
                </p>

                {!GameActive && !GameFinish && (
                    <div className="text-center">
                        <div className="bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mb-6">
                            <p className="text-lg text-gray-700 mb-4">
                                Click the button as many times as you can before time runs out!
                            </p>
                            <div className="text-6xl mb-2">⏱️</div>
                            <p className="text-2xl font-bold text-gray-800">10 Seconds</p>
                        </div>
                        <button
                            onClick={StartGame}
                            className="w-full py-4 px-8 bg-green-500 hover:bg-green-600 cursor-pointer text-white text-xl font-bold rounded-xl shadow-lg active:scale-95 transition-all duration-200"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {GameActive && (
                    <div className="text-center">
                        <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Score</p>
                                    <p className="text-4xl font-bold text-blue-600">{Score}</p>
                                </div>
                                <div className="w-px h-16 bg-gray-300"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Time Left</p>
                                    <p className={`text-4xl font-bold ${TimeLeft <= 3 ? 'text-red-600' : 'text-orange-600'}`}>
                                        {TimeLeft}s
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleClick}
                            className="w-full py-10 px-8 bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold rounded-2xl shadow-xl active:scale-95 transition-all duration-100 cursor-pointer select-none"
                        >
                            CLICK ME!
                        </button>

                        <button
                            onClick={ResetGame}
                            className="w-full mt-4 py-3 px-6 bg-gray-300 hover:bg-gray-400 text-gray-700 cursor-pointer font-semibold rounded-xl transition-all duration-200"
                        >
                            Reset
                        </button>
                    </div>
                )}

                {GameFinish && (
                    <div className="text-center">
                        <div className="bg-yellow-100 rounded-2xl p-6 mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Time's Up!
                            </h2>
                            <p className="text-lg text-gray-600 mb-2">Final Score</p>
                            <p className="text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mb-4">
                                {Score}
                            </p>
                            <p className="text-gray-600 text-lg">
                                {Score == 0 && "Kabhi computer nhi chalaya kya"}
                                {Score >= 1 && "Aye Bunty! tera saboon slow hai kya"}
                                {Score >= 30 && Score < 50 && "Bahot tez ho rhe ho Bete"}
                                {Score >= 50 && Score < 70 && "Impressive speed! You're a pro"}
                                {Score >= 70 && "INCREDIBLE! You're a clicking legend"}
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
        </div>
    );
}