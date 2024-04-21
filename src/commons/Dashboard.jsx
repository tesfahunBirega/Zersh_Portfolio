import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { sidebarRoutes } from "../constants";
import avatarlogo from "/log1.svg";

const Dashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-64 bg-gray-800">
        <Link
          to={"/"}
          className="h-16 flex items-center justify-start ml-4 text-white text-lg font-semibold"
        >
          <img src={avatarlogo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Nahom &nbsp;
            <span className="sm:block hidden"> | Debele</span>
          </p>
        </Link>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-2">
            {sidebarRoutes.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                activeClassName="bg-gray-700"
                exact
              >
                {item.icon} {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-1 min-h-screen overflow-y-auto bg-gray-600 p-4">
        {children}
      </div>
    </div>
  );
};

const NavLink = ({ to, activeClassName, exact, children }) => {

  const match = useLocation().pathname.split("dashboard/")[1] == to;

  return (
    <Link
      to={`/dashboard/${to}`}
      className={`py-2 px-4 text-white hover:bg-gray-600  flex justify-start items-center gap-2 ${
        match ? activeClassName : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default Dashboard;

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { sidebarRoutes } from "../constants";
// import avatarlogo from "/log1.svg";
// import { RiMenuUnfoldLine } from 'react-icons/ri'; // Import the icon

// const Dashboard = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="relative flex flex-col sm:flex-row min-h-screen">
//       {/* Sidebar */}
//       <div className={`bg-gray-800 sm:w-64 ${isSidebarOpen ? 'w-3/4' : 'hidden sm:block'} ${isSidebarOpen ? 'absolute top-0 left-0 h-full z-10' : 'static'}`}>
//         <Link to={"/"} className="flex items-center justify-start p-4 text-white text-lg font-semibold">
//           <img src={avatarlogo} alt="logo" className="w-9 h-9 object-contain" />
//           <p className="text-white text-xl font-bold ml-2">Nahom</p>
//         </Link>
//         <nav className="flex flex-col px-4 py-2 space-y-2">
//           {sidebarRoutes.map((item, index) => (
//             <NavLink key={index} to={item.to} exact>
//               {item.icon} {item.name}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//       {/* Main Content */}
//       <div className="md:bloc flex-1 bg-gray-600 p-4">
//         <button onClick={toggleSidebar} className="sm:hidden text-white absolute top-4 right-4">
//           <RiMenuUnfoldLine size={24} />
//         </button>
//         <div className="grid overflow-x-scroll h-screen ">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// const NavLink = ({ to, exact, children }) => {
//   const location = useLocation();
//   const isActive = location.pathname.includes(to);
//   const activeClassName = isActive ? "bg-gray-700" : "";

//   return (
//     <Link to={`/dashboard/${to}`} className={`py-2 px-4 text-white hover:bg-gray-600 flex items-center gap-2 ${activeClassName}`}>
//       {children}
//     </Link>
//   );
// };

// export default Dashboard;
