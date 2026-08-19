import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";
import api from "../services/api";


function EditStudent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const loadStudent = async () => {

      try {

        const response =
          await api.get(
            `students/${id}/`
          );

        setStudent(response.data);

      } catch (error) {

        console.log(error);

        alert(
          "Unable to load student."
        );

      } finally {

        setLoading(false);

      }

    };


    loadStudent();

  }, [id]);


  const handleSubmit = async (
    formData
  ) => {

    try {

      await api.put(
        `students/${id}/`,
        formData
      );

      navigate("/students");

    } catch (error) {

      console.log(error);

      alert(
        "Unable to update student."
      );

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
              Edit Student
            </h1>

            <p className="text-gray-500 mt-1">
              Update student information.
            </p>

          </div>


          {loading ? (

            <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-500">
              Loading student...
            </div>

          ) : student ? (

            <StudentForm
              initialData={student}
              onSubmit={handleSubmit}
              buttonText="Update Student"
            />

          ) : (

            <div className="bg-white rounded-2xl p-12 text-center">
              Student not found.
            </div>

          )}

        </div>

      </main>
    </>
  );
}


export default EditStudent;