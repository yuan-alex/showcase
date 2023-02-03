import { Outlet } from "react-router-dom";
import root from "react-shadow";

import { Sidebar } from "./components/Sidebar.js";

export const Home = () => {
  return (
    <root.div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
        integrity="sha256-tq2XQC7duQPnpdenPuR6Z5IE773aRSGjkcutnfUJuTI="
        crossOrigin="anonymous"
      />
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
