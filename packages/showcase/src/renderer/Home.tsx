import { Outlet } from "react-router-dom";
import root from "react-shadow";

import { Sidebar } from "./components/Sidebar.js";

export const Home = () => {
  return (
    <root.div>
      <link rel="stylesheet" href="/static/windi.css" />
      <div className="flex h-screen w-screen flex-row divide-x">
        <div className="w-80 flex-none bg-gray-50">
          <Sidebar />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </root.div>
  );
};
