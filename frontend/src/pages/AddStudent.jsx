import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function AddStudent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.post("students/", {
      name,
      email,
    });

    navigate("/students");
} catch (error) {
    console.log(error.response.data)
}
  };

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-5">
          Add Student
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Student Name"
            className="border p-3 w-full mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Student Email"
            className="border p-3 w-full mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save Student
          </button>

        </form>

      </div>
    </>
  );
}

export default AddStudent;