import { FaHome } from "react-icons/fa";
import { FaBlog, FaUser, FaUsers } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Dashboard = () => {
  let [open, setOpen] = useState(false);
  // ToDo: get isAdmin value from the database
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500"
      className="flex max-w-full mx-auto"
    >
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-indigo-200 hidden md:block">
        <ul className="menu px-4 mt-10 space-y-4">
          <>
            <li>
              <NavLink to="/dashboard/user-home">
                <button className="w-full flex items-center">
                  <FaHome className="mr-2"></FaHome>User Home
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/user-profile">
                <button className="w-full flex items-center">
                  <FaUser className="mr-2"></FaUser>User Profile
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-donation-request">
                <button className="w-full flex items-center">
                  <BiSolidDonateBlood className="mr-2"></BiSolidDonateBlood>My
                  Donation Request
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-donation-request">
                <button className="w-full flex items-center">
                  <IoIosCreate className="mr-2"></IoIosCreate>Create Donation
                  Request
                </button>
              </NavLink>
            </li>
          </>

          <span>
            <hr className="my-10"></hr>
          </span>
          <li>
            <NavLink to="/">
              <button className="w-full flex items-center">
                <FaHome className="mr-2"></FaHome>Back To Home
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* mobile responsive */}
      <div
        onClick={() => setOpen(!open)}
        className="z-[1000] text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
      >
        {open ? (
          <AiOutlineClose></AiOutlineClose>
        ) : (
          <AiOutlineMenu></AiOutlineMenu>
        )}
      </div>
      <div
        className={`z-[10] md:hidden absolute bg-indigo-200 left-0 w-full px-8 pb-4 transition-all duration-500 ease-in ${
          open ? "top-0 opacity-100" : "left-[-490px]"
        } opacity-0`}
      >
        <ul className="md:flex md:items-center gap-5">
          {" "}
          <li className="md:ml-8 text-xl md:my-0 mt-7 mb-3">
            <NavLink to="/dashboard/user-home">
              <button className="w-64 md:w-full flex items-center">
                <FaHome className="mr-2"></FaHome>User Home
              </button>
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 mb-3">
            <NavLink to="/dashboard/user-profile">
              <button className="w-64 md:w-full flex items-center">
                <FaUser className="mr-2"></FaUser>User Profile
              </button>
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 mb-3">
            <NavLink to="/dashboard/my-donation-request">
              <button className="w-64 md:w-full flex items-center">
                <BiSolidDonateBlood className="mr-2"></BiSolidDonateBlood>My
                Donation Request
              </button>
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 mb-3">
            <NavLink to="/dashboard/create-donation-request">
              <button className="w-64 md:w-full flex items-center">
                <IoIosCreate className="mr-2"></IoIosCreate>Create Donation
                Request
              </button>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1 py-10 md:p-10  overflow-x-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
