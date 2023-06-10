import SectionTitle from "../../../components/Shared/SectionTitle";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: allClassesData = [] } = useQuery({
    queryKey: ["allClassesData"],
    queryFn: async () => {
      const res = await axiosSecure("/classes");
      return res?.data;
    },
  });
  console.log(allClassesData);
  return (
    <div>
      <SectionTitle heading={"Manage Classes"} />
      <>
        <div className="overflow-x-auto my-10 max-w-4xl">
          <table className="table table-sm">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Name</th>
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
                      className="tooltip mt-5"
                      data-tip={classData?.instructorEmail}
                    >
                      {classData?.instructorEmail.slice(0, 10)}...
                    </td>
                    <td>{classData?.availableSeats}</td>
                    <td>${classData?.price}</td>
                    <td>
                      <td className="text-center">
                        <small
                          className={`text-center font-medium py-1 px-2 text-gray-600 rounded-md ${
                            classData?.status === "approved"
                              ? " bg-green-400  "
                              : classData?.status === "pending"
                              ? "bg-yellow-400 "
                              : classData?.status === "denied"
                              ? "bg-red-500"
                              : "bg-transparent"
                          }`}
                        >
                          {classData?.status}
                        </small>
                      </td>
                    </td>
                    <td>
                      <div className="join join-vertical gap-2">
                        <button className="$btn join-item btn btn-success btn-xs">
                          Approve
                        </button>
                        <button className="$btn join-item btn btn-error btn-xs">Deny</button>
                        <button className="$btn join-item btn btn-warning btn-xs ">
                          Send FeedBack
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
