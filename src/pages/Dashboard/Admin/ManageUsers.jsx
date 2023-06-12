import SectionTitle from "../../../components/Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import EmptyState from "../../Shared/EmptyState";
import Loader from "../../../components/Shared/Loader";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure("/allUsers");
      return res?.data;
    },
  });
  if (isLoading) {
    return <Loader />;
  }

  // set user role
  const handleUserRole = async (id, role) => {
    const res = await axiosSecure.patch(`/allUsers/${id}`, { role });
    if (res?.data.modifiedCount > 0) {
      toast.success(`Role set to ${role}`);
      refetch();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Shutter Academy | Manage Users</title>
      </Helmet>
      <SectionTitle heading={"Manage Users"} />
      <div>
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-300">
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>User Since</th>
                <th>Role</th>
                <th>Edit role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.length > 0 &&
                allUsers.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">{user?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p >{user?.email}</p>
                    </td>

                    <td>
                      <p className="capitalize">
                        {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td>
                      <div className="text-center flex justify-center">
                        <small
                          className={`text-center capitalize badge  badge-outline font-medium  ${
                            user?.role === "admin"
                              ? " badge-primary"
                              : user?.role === "instructor"
                              ? "badge-accent"
                              : user?.role === "student"
                              ? "badge-secondary"
                              : "bg-transparent"
                          }`}
                        >
                          {user?.role}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div className="join join-vertical gap-1 ">
                        <button
                          disabled={user?.role === "admin"}
                          onClick={() => handleUserRole(user?._id, "admin")}
                          className="  btn btn-primary btn-xs"
                        >
                          Make Admin
                        </button>
                        <button
                          disabled={user?.role === "instructor"}
                          onClick={() =>
                            handleUserRole(user?._id, "instructor")
                          }
                          className="  btn btn-info btn-xs "
                        >
                          Make Instructor
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {allUsers && allUsers.length < 1 && (
            <EmptyState
              heading={"No data"}
              subHeading={"There is no user data"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
