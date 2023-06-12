import Loader from "../../../components/Shared/Loader";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "../../Shared/EmptyState";
import { FaEdit } from "react-icons/fa";
import ClassUpdateModal from "../../../components/Modal/ClassUpdateModal";
import { useState } from "react";
import { Helmet } from "react-helmet";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [classData, setClassData] = useState(null);

  const {
    data: myClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myClasses"],
    queryFn: async () => {
      const res = await axiosSecure(`/instructorClasses/${user?.email}`);
      return res?.data;
    },
  });
  console.log(myClasses);

  const handleUpdate = (item) => {
    setClassData(item);
    window.classUpdateModal.showModal();
  };

  return (
    <div>
      <Helmet>
        <title>Shutter Academy | My classes</title>
      </Helmet>
      {isLoading && <Loader />}
      <SectionTitle heading={"My classes"} />
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-300">
              <th>#</th>
              <th>Class Name</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Enrolled Student</th>
              <th>Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {myClasses &&
              myClasses.length > 0 &&
              myClasses.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
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
                    <p className="capitalize">{item?.availableSeats}</p>
                  </td>
                  <td>${item?.price}</td>
                  <td className="text-center">
                    <small
                      className={`text-center font-medium py-1 px-2 text-gray-800 rounded-md ${
                        item?.status === "approved"
                          ? " bg-green-400  "
                          : item?.status === "pending"
                          ? "bg-yellow-400 "
                          : item?.status === "denied"
                          ? "bg-red-500"
                          : "bg-transparent"
                      }`}
                    >
                      {item?.status}
                    </small>
                  </td>
                  <td className="flex justify-center">{item?.totalEnrolled}</td>
                  <td>{item?.feedback || ""}</td>
                  <td className="flex justify-center ">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="btn btn-ghost btn-sm"
                    >
                      <FaEdit className="text-cyan-600" size={22} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ClassUpdateModal classData={classData} refetch={refetch} />
        {myClasses && myClasses.length < 1 && (
          <EmptyState
            heading={"No data"}
            subHeading={"You did not add any class"}
          />
        )}
      </div>
    </div>
  );
};

export default MyClasses;
