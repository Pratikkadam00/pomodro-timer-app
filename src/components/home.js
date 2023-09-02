import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-600">
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-8">
                    Welcome to Our App
                </h1>
                <div className="space-y-4">
                    <Link
                        to="/login"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg transition duration-300 mb-4"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg transition duration-300"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
