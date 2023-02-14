import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar.jsx";

export function Home() {
  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row divide-x">
      <div className="lg:w-80 flex-none bg-gray-50">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
