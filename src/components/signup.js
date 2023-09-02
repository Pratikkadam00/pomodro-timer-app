import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import InputControl from "./inputcontrol";

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name,
                });
                navigate("/");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">Signup</h1>

                <InputControl
                    label="Name"
                    placeholder="Enter your name"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, name: event.target.value }))
                    }
                />
                <InputControl
                    label="Email"
                    placeholder="Enter email address"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                />
                <InputControl
                    label="Password"
                    placeholder="Enter password"
                    onChange={(event) =>
                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                    }
                    type="password"
                />

                <div className="mt-4">
                    <b className="text-red-500">{errorMsg}</b>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        onClick={handleSubmission}
                        disabled={submitButtonDisabled}
                    >
                        Signup
                    </button>
                    <p className="mt-2 text-center">
                        Already have an account?{" "}
                        <span>
                            <Link to="/login" className="text-blue-500">
                                Login
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
