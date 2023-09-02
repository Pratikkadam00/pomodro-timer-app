import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from "./inputcontrol";
import { auth } from "../firebase";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);

                navigate("/timer");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>

                <InputControl
                    label="Email"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="Enter email address"
                />
                <InputControl
                    label="Password"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                    }
                    placeholder="Enter Password"
                    type="password"
                />

                <div className="mt-4">
                    <b className="text-red-500">{errorMsg}</b>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        disabled={submitButtonDisabled}
                        onClick={handleSubmission}
                    >
                        Login
                    </button>
                    <p className="mt-2 text-center">
                        Don't have an account?{" "}
                        <span>
                            <Link to="/signup" className="text-blue-500">
                                Sign up
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
