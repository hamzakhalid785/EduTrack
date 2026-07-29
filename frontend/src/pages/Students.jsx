import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import api from "../services/api";

function Students() {

  const[search, setSearch] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await
      api.get("students/");
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase()) ||
  student.email.toLowerCase().includes(search.toLowerCase())
);


  const deleteStudent = async(id)=>{
    
    await api.delete(`students/${id}/`);

    fetchStudents();

  }

  return (

    <>
    <Navbar />
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">Students</h1>

        <Link
          to="/add-student"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Student
        </Link>

      </div>

      <input type="text" placeholder="Search by Name or Email..."
        className="border p-3 rounded w-full mb-5"
        value={search}
        onChange={(e) => setSearch(e.target.value)} />

      <table className="w-full bg-white shadow rounded">

        <thead>

          <tr className="bg-gray-200">

            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredStudents.map((student) => (

            <tr key={student.id}>

              <td className="p-3">{student.name}</td>

              <td>{student.email}</td>

              <td>

                <Link
                  to={`/edit-student/${student.id}`}
                  className="text-blue-600 mr-3"
                >
                  Edit
                </Link>

                <button 
                onClick={() => 
                    deleteStudent(student.id)}
                className="text-red-600">
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
    </>
  );
}

export default Students;