import { Link } from "react-router-dom";


function StudentTable({
  students,
  onDelete,
}) {
  if (!students.length) {
    return (
      <div className="p-14 text-center">

        <div className="text-5xl mb-4">
          🎓
        </div>

        <h3 className="text-xl font-bold text-gray-800">
          No students found
        </h3>

        <p className="text-gray-500 mt-2">
          Try changing your search or filters.
        </p>

      </div>
    );
  }


  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>
          <tr className="bg-gray-50 border-b">

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              #
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              Student
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              Department
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              Course
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              Actions
            </th>

          </tr>
        </thead>


        <tbody>

          {students.map((student, index) => (

            <tr
              key={student.id}
              className="border-b last:border-0 hover:bg-blue-50/40 transition"
            >

              <td className="px-6 py-4 text-gray-500">
                {index + 1}
              </td>


              <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {student.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <p className="font-semibold text-gray-800">
                      {student.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {student.email}
                    </p>

                  </div>

                </div>

              </td>


              <td className="px-6 py-4 text-gray-600">
                {student.department || "—"}
              </td>


              <td className="px-6 py-4 text-gray-600">
                {student.course || "—"}
              </td>


              <td className="px-6 py-4">

                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">

                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>

                  Active

                </span>

              </td>


              <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                  <Link
                    to={`/students/${student.id}`}
                    className="text-gray-600 hover:text-gray-900 font-semibold text-sm"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-student/${student.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => onDelete(student)}
                    className="text-red-500 hover:text-red-700 font-semibold text-sm"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


export default StudentTable;