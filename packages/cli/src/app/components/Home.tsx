import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar.jsx";

export function Home() {
  return (
    <div className="flex h-screen w-screen flex-col divide-x lg:flex-row">
      <div className="flex-none bg-gray-50 lg:w-80">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
