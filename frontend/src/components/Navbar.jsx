import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between">

      <h1 className="text-white text-2xl font-bold">
        EduTrack
      </h1>

      <div>

        <Link to="/dashboard" className="text-white mr-5">
          Dashboard
        </Link>

        <Link to="/students" className="text-white mr-5">
          Students
        </Link>

        <Link to="/" className="text-white">
          Logout
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;