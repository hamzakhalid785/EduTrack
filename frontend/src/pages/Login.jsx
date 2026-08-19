import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await api.post("token/", {
        username,
        password,
      });


      localStorage.setItem(
        "accessToken",
        response.data.access
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refresh
      );


      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      setError(
        "Invalid username or password."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back
          </h1>

          <p className="text-gray-500 text-center mt-2 mb-8">
            Login to your EduTrack account
          </p>


          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="border border-gray-300 p-3 rounded-lg w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />


            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Login;