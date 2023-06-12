import { toast } from "react-hot-toast";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FeedbackModal from "../../../components/Modal/FeedbackModal";
import { useState } from "react";
import { Helmet } from "react-helmet";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [modalData, setModalData] = useState([]);

  const {
    data: allClassesData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allClassesData"],
    queryFn: async () => {
      const res = await axiosSecure("/classes");
      return res?.data;
    },
  });
  // to handle class status approve,denied
  const handleClassStatus = async (id, status) => {
    const res = await axiosSecure.patch(`/updateClassStatus/${id}`, { status });
    if (res.data?.modifiedCount) {
      refetch();
      if (status == "approved") {
        toast.success(`Class ${status}`);
      } else {
        toast.error(`Class ${status}`);
      }
    }
  };
  //feedback modal
  const handleFeedbackModal = (classData) => {
    window.isOpenFeedbackModal.showModal();
    setModalData(classData);
  };
  return (
    <div>
      <Helmet>
        <title>Shutter Academy | Manage Classes</title>
      </Helmet>
      <SectionTitle heading={"Manage Classes"} />
      <>
        <div className="overflow-x-auto my-10 ">
          <table className="table table-sm">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Instructor name</th>
                <th> Instructor email</th>
                <th>Available seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allClassesData &&
                allClassesData.length > 0 &&
                allClassesData.map((classData, i) => (
                  <tr key={classData._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={classData?.classImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {classData?.className}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{classData?.instructorName}</td>
                    <td
                      className="tooltip mt-8"
                      data-tip={classData?.instructorEmail}
                    >
                      <p>{classData?.instructorEmail.slice(0, 10)}...</p>
                    </td>
                    <td>{classData?.availableSeats}</td>
                    <td>${classData?.price}</td>
                    <td>
                      <div className="text-center flex justify-center">
                        <small
                          className={`text-center font-medium py-1 px-2 text-gray-800 rounded-md ${
                            classData?.status === "approved"
                              ? " bg-green-400  text-white"
                              : classData?.status === "pending"
                              ? "bg-yellow-400 text-white"
                              : classData?.status === "denied"
                              ? "bg-red-500 text-white"
                              : "bg-transparent"
                          }`}
                        >
                          {classData?.status}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div className="join join-vertical gap-1 ">
                        <button
                          disabled={
                            classData?.status === "approved" ||
                            classData?.status === "denied" ||
                            isLoading
                          }
                          onClick={() =>
                            handleClassStatus(classData?._id, "approved")
                          }
                          className="  btn btn-success btn-xs"
                        >
                          Approve
                        </button>
                        <button
                          disabled={
                            classData?.status === "approved" ||
                            classData?.status === "denied" ||
                            isLoading
                          }
                          onClick={() =>
                            handleClassStatus(classData?._id, "denied")
                          }
                          className="  btn btn-error btn-xs "
                        >
                          Deny
                        </button>
                        <button
                          disabled={classData?.feedback}
                          onClick={() => handleFeedbackModal(classData)}
                          className="  btn btn-warning btn-xs "
                        >
                          <span>
                            {classData?.feedback
                              ? "Already feedback"
                              : "Send FeedBack"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
      <FeedbackModal modalData={modalData} refetch={refetch} />
    </div>
  );
};

export default ManageClasses;
