import { useEffect, useState } from "react";


function StudentForm({
  initialData,
  onSubmit,
  buttonText = "Save Student",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    course: "",
    department: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        age: initialData.age || "",
        course: initialData.course || "",
        department: initialData.department || "",
      });
    }
  }, [initialData]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim()
    ) {
      setError(
        "Name and email are required."
      );

      return;
    }

    await onSubmit({
      ...formData,
      age: formData.age
        ? Number(formData.age)
        : null,
    });
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
    >

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}


      <div className="grid md:grid-cols-2 gap-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@example.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03XX-XXXXXXX"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Age
          </label>

          <input
            type="number"
            name="age"
            min="1"
            max="100"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Department */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Department
            </option>

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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course
          </label>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Course
            </option>

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

      </div>


      <button
        type="submit"
        className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition"
      >
        {buttonText}
      </button>

    </form>
  );
}


export default StudentForm;