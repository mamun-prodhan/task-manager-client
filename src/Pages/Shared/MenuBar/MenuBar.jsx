import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MenuBar = () => {
  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("Logout successfully");
        Swal.fire({
          title: "Successfull",
          text: "Logout successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let navLinks = (
    <>
      <li className="md:ml-4 text-xl md:my-0 my-7">
        <NavLink
          to="/"
          className="text-gray-800  px-4 py-2 rounded-md hover:bg-red-300 duration-500"
        >
          Home
        </NavLink>
      </li>
      {/* <li className="md:ml-2 text-xl md:my-0 mb-7">
        <NavLink
          to="/blog"
          className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 duration-500"
        >
          Blogs
        </NavLink>
      </li>
      <li className="md:ml-2 text-xl md:my-0 mb-7">
        <NavLink
          to="/about"
          className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 duration-500"
        >
          About
        </NavLink>
      </li> */}

      {user?.email && (
        <>
          <li className="md:ml-2 text-xl md:my-0 mb-7">
            <NavLink
              to="/dashboard/user-home"
              className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 duration-500"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="md:ml-2 text-xl md:my-0 mb-7">
            <button
              onClick={handleSignOut}
              className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 duration-500"
            >
              Logout
            </button>
          </li>
        </>
      )}

      {!user?.email && (
        <>
          <li className="md:ml-2 text-xl md:my-0 mb-7">
            <NavLink
              to="/login"
              className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 duration-500"
            >
              Login
            </NavLink>
          </li>
          <li className="md:ml-2 text-xl md:my-0 mb-7">
            <NavLink
              to="/register"
              className="text-gray-800 px-4 py-2 rounded-md hover:bg-red-300 duration-500"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <span className="text-xl font-bold text-indigo-500">
              Task Manager
            </span>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
