import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navLinkClassName = ({ isActive }) =>
    isActive
      ? "text-[#D8864B] font-semibold text-base"
      : "hover:text-[#D8864B] text-base";

  const navItems = (
    <>
      <li>
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          to="/instructors"
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          to="/classes"
        >
          Classes
        </NavLink>
      </li>
      {/* className={user ? "" : "hidden"} */}
      <li>
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar justify-between bg-base-100 sticky top-0 z-50 !py-3 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content font-medium mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <img className="w-64" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{navItems}</ul>
      </div>
      <div className=" ">
        {/* avatar */}

        {!user ? (
          <Link to="/login">
            <button className="button-primary">Login</button>
          </Link>
        ) : (
          <>
            <div
              className="avatar mr-2 tooltip tooltip-bottom"
              //   data-tip={user?.displayName || "Anonymous"}
            >
              <div className="w-11 rounded-full border-2 border-blue-500">
                <img
                  src={`${
                    user?.photoURL
                      ? user?.photoURL
                      : "https://i.ibb.co/fSHmDMK/image.png"
                  }`}
                />
              </div>
            </div>
            <button
              onClick={logOut}
              className="button-primary bg-gray-500 hover:bg-gray-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
