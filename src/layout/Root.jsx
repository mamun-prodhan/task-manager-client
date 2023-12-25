import MenuBar from "../Pages/Shared/MenuBar/MenuBar";
import Footerr from "../Pages/Shared/Footerr/Footerr";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <MenuBar></MenuBar>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
      <Footerr></Footerr>
    </div>
  );
};

export default Root;
