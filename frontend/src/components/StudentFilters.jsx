function StudentFilters({
  department,
  setDepartment,
  course,
  setCourse,
  ordering,
  setOrdering,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Department
        </label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          <option value="Computer Science">
            Computer Science
          </option>
          <option value="Software Engineering">
            Software Engineering
          </option>
          <option value="Information Technology">
            Information Technology
          </option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Data Science">
            Data Science
          </option>
        </select>
      </div>

      {/* Course */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Course
        </label>

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Courses</option>
          <option value="BS Computer Science">
            BS Computer Science
          </option>
          <option value="BS Software Engineering">
            BS Software Engineering
          </option>
          <option value="BS Information Technology">
            BS Information Technology
          </option>
          <option value="BS Artificial Intelligence">
            BS Artificial Intelligence
          </option>
          <option value="BS Data Science">
            BS Data Science
          </option>
        </select>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Sort By
        </label>

        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="-id">
            Newest First
          </option>

          <option value="id">
            Oldest First
          </option>

          <option value="name">
            Name A-Z
          </option>

          <option value="-name">
            Name Z-A
          </option>

          <option value="age">
            Age Low-High
          </option>

          <option value="-age">
            Age High-Low
          </option>
        </select>
      </div>

    </div>
  );
}

export default StudentFilters;