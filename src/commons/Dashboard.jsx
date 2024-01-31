import React from "react";
import { Link, useParams } from "react-router-dom";

const Dashboard = ({ children }) => {
  const { dashboardId } = useParams();

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-gray-800">
        <div className="h-16 flex items-center justify-center text-white text-lg font-semibold">
          Dashboard
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-2">
            <NavLink to="/" activeClassName="bg-gray-700" exact>
              Dashboard
            </NavLink>
            <NavLink to="/okr" activeClassName="bg-gray-700">
              Okr
            </NavLink>
            <NavLink to="/dashboard/analytics" activeClassName="bg-gray-700">
              Note
            </NavLink>
            <NavLink to="/dashboard/settings" activeClassName="bg-gray-700">
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
      <div className="flex-1 bg-gray-600 p-4">{children}</div>
    </div>
  );
};

const NavLink = ({ to, activeClassName, exact, children }) => {
  const match = window.location.pathname == to;

  return (
    <Link
      to={to}
      className={`block py-2 px-4 text-white hover:bg-gray-600 ${
        match ? activeClassName : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default Dashboard;
