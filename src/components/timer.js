import React, { useState, useEffect } from "react";

function TimerApp() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        if (isBreak) {
                            setIsBreak(false);
                            setMinutes(25);
                        } else {
                            setIsBreak(true);
                            setMinutes(5);
                        }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, isBreak]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className="text-center mt-8">
            <h1 className="text-3xl font-semibold mb-4">
                {isBreak ? "Break Time" : "Work Time"}
            </h1>
            <div className="text-4xl font-bold">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
            </div>
            <div className="mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={toggleTimer}
                >
                    {isActive ? "Pause" : "Start"}
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
                    onClick={resetTimer}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default TimerApp;
