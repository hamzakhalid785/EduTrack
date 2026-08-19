import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";


function StudentDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchStudent = async () => {

      try {

        const response =
          await api.get(
            `students/${id}/`
          );

        setStudent(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


    fetchStudent();

  }, [id]);


  const handleDelete = async () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmed) return;


    try {

      await api.delete(
        `students/${id}/`
      );

      navigate("/students");

    } catch (error) {

      console.log(error);

      alert(
        "Unable to delete student."
      );

    }

  };


  if (loading) {

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          Loading student...
        </div>
      </>
    );

  }


  if (!student) {

    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

          <div className="text-center">

            <h1 className="text-2xl font-bold">
              Student Not Found
            </h1>

            <Link
              to="/students"
              className="text-blue-600 inline-block mt-4"
            >
              ← Back to Students
            </Link>

          </div>

        </div>
      </>
    );

  }


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6 md:p-8">

        <div className="max-w-5xl mx-auto">

          <Link
            to="/students"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Students
          </Link>


          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">

            {/* Header */}
            <div className="bg-blue-600 p-8 text-white">

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">

                  {student.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>


                <div>

                  <h1 className="text-3xl font-bold">
                    {student.name}
                  </h1>

                  <p className="text-blue-100 mt-1">
                    Student ID #{student.id}
                  </p>

                </div>

              </div>

            </div>


            {/* Details */}
            <div className="p-8">

              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Student Information
              </h2>


              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                <Info
                  label="Full Name"
                  value={student.name}
                />

                <Info
                  label="Email"
                  value={student.email}
                />

                <Info
                  label="Phone"
                  value={student.phone || "Not provided"}
                />

                <Info
                  label="Age"
                  value={student.age || "Not provided"}
                />

                <Info
                  label="Department"
                  value={
                    student.department ||
                    "Not provided"
                  }
                />

                <Info
                  label="Course"
                  value={
                    student.course ||
                    "Not provided"
                  }
                />

                <Info
                  label="Enrollment Date"
                  value={
                    student.enrollment_date ||
                    "Not available"
                  }
                />

                <div className="bg-gray-50 rounded-xl p-5">

                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span className="inline-flex mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Active
                  </span>

                </div>

              </div>


              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t">

                <Link
                  to={`/edit-student/${student.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Edit Student
                </Link>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold"
                >
                  Delete Student
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}


function Info({
  label,
  value,
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-5">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-1 break-words">
        {value}
      </p>

    </div>
  );
}


export default StudentDetails;