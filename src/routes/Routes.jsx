import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../layout/Dashboard";
import UserProfile from "../Pages/UserProfile/UserProfile";
import UserHome from "../Pages/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <h2>This is blogs page ..... content comming soon...</h2>,
      },
      {
        path: "/about",
        element: <h2>This is about page ..... content comming soon...</h2>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <h2>Dashboard layout</h2>,
      },
      {
        path: "user-home",
        element: <UserHome></UserHome>,
      },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);

export default router;
