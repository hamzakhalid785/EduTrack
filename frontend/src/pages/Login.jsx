import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-x1 shadow-lg w-96">

                <h1 className="text-3x1 font-bold text-center text-blue-600">EduTrack</h1>

                <p className="text-center text-gray-500 mt-2">Student Management System</p>

                <form
                className="mt-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/dashboard");
                }}
                >
                    <input 
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={email}
                    onChange={(e) => 
                    setEmail(e.target.value)}
                    />

                    <input 
                    type="password"
                    placeholder="Enter Password"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={password}
                    onChange={(e) => 
                    setPassword(e.target.value)}
                    />

                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                        Login
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;