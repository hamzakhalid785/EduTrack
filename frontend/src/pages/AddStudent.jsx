import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import api from "../services/api";


function AddStudent() {
  const navigate = useNavigate();


  const handleSubmit = async (formData) => {
    try {

      await api.post(
        "students/",
        formData
      );

      navigate("/students");

    } catch (error) {

      console.log(error);

      if (
        error.response?.data?.email
      ) {
        alert(
          "A student with this email already exists."
        );
      } else {
        alert(
          "Unable to add student."
        );
      }
    }
  };


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6 md:p-8">

        <div className="max-w-3xl mx-auto">

          <Link
            to="/students"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Students
          </Link>


          <div className="mt-5 mb-6">

            <h1 className="text-3xl font-bold text-gray-800">
              Add Student
            </h1>

            <p className="text-gray-500 mt-1">
              Register a new student in EduTrack.
            </p>

          </div>


          <StudentForm
            onSubmit={handleSubmit}
            buttonText="Add Student"
          />

        </div>

      </main>
    </>
  );
}


export default AddStudent;