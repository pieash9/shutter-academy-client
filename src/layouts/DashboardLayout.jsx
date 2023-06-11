import { FaFolderPlus, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BiSelectMultiple } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdClass, MdPayments } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Shared/Loader";
import axios from "axios";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();

  const { role } = useRole();

  //get user role
  const { data: userRole = [], isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axios.get(
        `https://shutter-academy-server.vercel.app/getUserRole/${user?.email}`
      );
      return res?.data?.role || "";
    },
  });
  if (isLoading) {
    return <Loader />;
  }

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
          <h3 className="font-medium pt-10 md:mx-8 mb-3 text-gray-600 text-2xl capitalize">
            {role} Portal
          </h3>
          <div className="flex items-center mt-5 gap-3 md:mx-8">
            <img
              className="w-14 border-2 border-[#D8864B] rounded-full"
              src={user?.photoURL || "https://i.ibb.co/fSHmDMK/image.png"}
              alt=""
            />
            <h3 className="text-2xl">{user?.displayName}</h3>
          </div>

          <div className="divider mx-5"></div>
          <ul className="menu p-4 w-80 h-full text-base-content">
            {/* student */}
            {userRole === "student" && (
              <>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="student/selected-class"
                  >
                    <BiSelectMultiple />
                    My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="student/enrolled-class"
                  >
                    <SiGoogleclassroom size={20} />
                    My Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="student/payment-history"
                  >
                    <MdPayments size={20} />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}

            {/* instructor */}
            {userRole === "instructor" && (
              <>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="instructor/add-class"
                  >
                    <FaFolderPlus size={20} />
                    Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="instructor/my-classes"
                  >
                    <SiGoogleclassroom size={20} />
                    My Classes
                  </NavLink>
                </li>
              </>
            )}
            {/* admin */}
            {userRole === "admin" && (
              <>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="admin/manage-classes"
                  >
                    <MdClass size={20} />
                    Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={navLinkClassName}
                    style={{ backgroundColor: "transparent" }}
                    to="admin/manage-users"
                  >
                    <FaUsers size={20} />
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
                <FaHome size={20} /> Home
              </NavLink>
            </li>
          </ul>
        </div>
        <label htmlFor="my-drawer-2" className="drawer-button-mobile">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </div>
  );
};

export default DashboardLayout;
