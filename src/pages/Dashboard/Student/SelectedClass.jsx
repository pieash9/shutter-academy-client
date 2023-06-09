import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Shared/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const SelectedClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  //get all selected class
  const {
    data: selectedClass = [],
    refetch,
    isLoading: classLoading,
  } = useQuery({
    queryKey: ["selectedClass"],
    queryFn: async () => {
      const res = await axiosSecure(`/selectedClasses/${user?.email}`);
      return res?.data;
    },
  });
  //delete a class form selected class
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/selectedClasses/${id}`);
    if (res?.data?.deletedCount > 0) {
      refetch();
      toast.success("Class removed");
    }
  };

  if (classLoading) {
    return <Loader />;
  }
  return (
    <div>
      <SectionTitle heading={"My selected class"} />

      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-300">
              <th>#</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Price</th>
              <th>Pay</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass &&
              selectedClass.length > 0 &&
              selectedClass.map((item, i) => (
                <tr key={item._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.classImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{item?.className}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="capitalize">{item?.instructorName}</p>
                  </td>
                  <td>${item?.price}</td>
                  <th>
                    <button className="btn btn-info btn-sm">Pay</button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClass;
