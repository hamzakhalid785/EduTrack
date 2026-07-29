import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-6 mt-8">

          {/* Total Students Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Total Students
            </h2>

            <p className="text-4xl mt-3 text-blue-600">
              20
            </p>

            <Link
              to="/students"
              className="bg-blue-600 text-white px-5 py-2 rounded mt-5 inline-block"
            >
              Manage Students
            </Link>
          </div>

          {/* Active Users Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Active Users
            </h2>

            <p className="text-4xl mt-3 text-green-600">
              5
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;