import { toast } from "react-hot-toast";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FeedbackModal from "../../../components/Modal/FeedbackModal";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
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



  return (
    <div>
      <SectionTitle heading={"Manage Classes"} />
      <>
        <button className="btn" onClick={() => window.my_modal_3.showModal()}>
          open modal
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <button
              onClick={() => window.my_modal_3.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>

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
                          className={`text-center font-medium py-1 px-2 text-gray-600 rounded-md ${
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
                          onClick={() => window.my_modal_3.showModal()}
                          className="  btn btn-warning btn-xs "
                        >
                          <span>Send FeedBack</span>
                          <FeedbackModal id="my_modal_3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default ManageClasses;
