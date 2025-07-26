import React from "react";
import { Link, useLocation } from "react-router-dom";
import navConfig from "./navConfig";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full flex justify-center bg-transparent">
      <div className="mt-4 mb-4 w-screen max-w-screen-lg rounded-2xl bg-orange-600 text-white shadow-xl flex items-center justify-between px-8 py-4">
        <div className="font-bold text-2xl">Easy Bazar</div>
        <div className="flex gap-8">
          {navConfig.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-all pb-1 ${
                location.pathname === item.path
                  ? "font-bold border-b-2 border-white text-white"
                  : "text-orange-100 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;