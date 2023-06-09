import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const role = "student";
  const { user } = useAuth();
  const navLinkClassName = ({ isActive }) =>
    isActive
      ? "text-[#D8864B] font-medium text-base"
      : "hover:text-[#D8864B] text-base";
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content m-10">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side bg-base-200">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          <div className="flex items-center mt-5 gap-3 md:mx-8">
            <img
              className="w-14 border-2 border-[#D8864B] rounded-full"
              src={user?.photoURL}
              alt=""
            />
            <h3 className="text-2xl">{user?.displayName}</h3>
          </div>

          <div className="divider mx-5"></div>
          <ul className="menu p-4 w-80 h-full  text-base-content">
            {/* student  */}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="student/selected-class"
                  >
                    My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="student/enrolled-class"
                  >
                    My Enrolled Classes
                  </NavLink>
                </li>
              </>
            )}

            {/* instructor  */}
            {role === "instructor" && (
              <>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="instructor/add-class"
                  >
                    Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="instructor/my-classes"
                  >
                    My Classes
                  </NavLink>
                </li>
              </>
            )}
            {/* admin  */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="admin/manage-classes"
                  >
                    Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="admin/manage-users"
                  >
                    Manage Users
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>

            <li>
              <NavLink
                to={"/"}
                className={navLinkClassName}
                style={{ backgroundColor: "transparent" }}
              >
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
