import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";
import StudentFilters from "../components/StudentFilters";
import DeleteModal from "../components/DeleteModal";

import api from "../services/api";


function Students() {
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("all");

  const [course, setCourse] = useState("all");

  const [ordering, setOrdering] = useState("-id");

  const [page, setPage] = useState(1);

  const [totalStudents, setTotalStudents] = useState(0);

  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [deleting, setDeleting] = useState(false);


  const fetchStudents = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page,
        search,
        department,
        course,
        ordering,
      });

      const response = await api.get(
        `students/?${params.toString()}`
      );

      setStudents(response.data.results);

      setTotalStudents(
        response.data.count
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchStudents();
  }, [
    page,
    search,
    department,
    course,
    ordering,
  ]);


  const totalPages = Math.ceil(
    totalStudents / 8
  );


  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      setDeleting(true);

      await api.delete(
        `students/${selectedStudent.id}/`
      );

      setSelectedStudent(null);

      if (
        students.length === 1 &&
        page > 1
      ) {
        setPage(page - 1);
      } else {
        fetchStudents();
      }

    } catch (error) {
      console.log(error);

      alert(
        "Unable to delete student."
      );
    } finally {
      setDeleting(false);
    }
  };


  const resetFilters = () => {
    setSearch("");
    setDepartment("all");
    setCourse("all");
    setOrdering("-id");
    setPage(1);
  };


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6 md:p-8">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Students
              </h1>

              <p className="text-gray-500 mt-1">
                Manage and monitor all registered students.
              </p>

            </div>


            <Link
              to="/add-student"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow transition"
            >
              + Add Student
            </Link>

          </div>


          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <div className="p-6 border-b">

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    All Students
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {totalStudents} student
                    {totalStudents !== 1
                      ? "s"
                      : ""}
                  </p>

                </div>


                <button
                  onClick={fetchStudents}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700"
                >
                  ↻ Refresh
                </button>

              </div>


              {/* Search */}
              <div className="mt-5">

                <SearchBar
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    setPage(1);
                  }}
                />

              </div>


              {/* Filters */}
              <div className="mt-5">

                <StudentFilters
                  department={department}
                  setDepartment={(value) => {
                    setDepartment(value);
                    setPage(1);
                  }}
                  course={course}
                  setCourse={(value) => {
                    setCourse(value);
                    setPage(1);
                  }}
                  ordering={ordering}
                  setOrdering={(value) => {
                    setOrdering(value);
                    setPage(1);
                  }}
                />

              </div>


              <button
                onClick={resetFilters}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Reset Filters
              </button>

            </div>


            {/* Table */}
            {loading ? (

              <div className="p-14 text-center text-gray-500">
                <div className="text-4xl mb-3">
                  ⏳
                </div>

                Loading students...
              </div>

            ) : (

              <StudentTable
                students={students}
                onDelete={setSelectedStudent}
              />

            )}


            {/* Pagination */}
            {!loading &&
              totalPages > 1 && (

                <div className="border-t px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">

                  <p className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </p>


                  <div className="flex items-center gap-2">

                    <button
                      disabled={page === 1}
                      onClick={() =>
                        setPage(page - 1)
                      }
                      className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
                    >
                      ← Previous
                    </button>


                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) =>
                        index + 1
                    ).map((number) => (

                      <button
                        key={number}
                        onClick={() =>
                          setPage(number)
                        }
                        className={`w-10 h-10 rounded-lg font-medium ${
                          page === number
                            ? "bg-blue-600 text-white"
                            : "border hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>

                    ))}


                    <button
                      disabled={
                        page === totalPages
                      }
                      onClick={() =>
                        setPage(page + 1)
                      }
                      className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50"
                    >
                      Next →
                    </button>

                  </div>

                </div>

              )}

          </div>

        </div>

      </main>


      {/* Delete Modal */}
      <DeleteModal
        open={Boolean(selectedStudent)}
        onClose={() =>
          setSelectedStudent(null)
        }
        onConfirm={handleDelete}
        deleting={deleting}
      />

    </>
  );
}


export default Students;