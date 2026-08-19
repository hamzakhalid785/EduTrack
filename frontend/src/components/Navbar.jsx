import { Link, useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );

    navigate("/login");

  };


  return (

    <nav className="bg-blue-600 text-white px-6 py-4 shadow">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          EduTrack
        </Link>


        <div className="flex items-center gap-5">

          <Link
            to="/dashboard"
            className="hover:text-blue-200 transition"
          >
            Dashboard
          </Link>


          <Link
            to="/students"
            className="hover:text-blue-200 transition"
          >
            Students
          </Link>
          
          <button
  onClick={() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }}
  className="text-white hover:text-blue-200 transition"
>
  Logout
</button>

        </div>

      </div>

    </nav>
  );
}


export default Navbar;