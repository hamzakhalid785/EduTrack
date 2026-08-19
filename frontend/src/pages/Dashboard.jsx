import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";

import api from "../services/api";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("students/", {
        params: {
          search: search,
        },
      });
      setStudents(response.data.results || []);
      setTotalStudents(response.data.count || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

          <div>
            <h1 className="text-2xl sm:text-3x1 font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back! Here's an overview of your student management system.
            </p>
          </div>

          <Link
            to="/add-student"
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition shadow"
          >
            + Add Student
          </Link>

        </div>


        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total Students */}
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-600">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  Total Students
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {totalStudents}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                🎓
              </div>

            </div>

          </div>


          {/* Available */}
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-600">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  Students Available
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {students.length}
                </h2>
              </div>

              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>

            </div>

          </div>


          {/* System Status */}
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-600">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  System Status
                </p>

                <h2 className="text-xl font-bold text-green-600 mt-2">
                  {loading ? "Loading..." : "Online"}
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                ⚡
              </div>

            </div>

          </div>

        </div>


        {/* Students */}
        <div className="bg-white rounded-xl shadow">

          {/* Header */}
          <div className="p-6 border-b">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Students
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage and view your students
                </p>
              </div>

              <button
                onClick={fetchStudents}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                ↻ Refresh
              </button>

            </div>

            {/* Search Component */}
            <div className="mt-5">
              <SearchBar
                value={search}
                onChange={setSearch}
              />
            </div>

          </div>


          {/* Loading */}
          {loading ? (

            <div className="p-10 text-center text-gray-500">
              <div className="text-3xl mb-3">⏳</div>
              Loading students...
            </div>

          ) : (

            <StudentTable
              students={filteredStudents}
            />

          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;