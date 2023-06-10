import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Shared/Loader";
import SectionTitle from "../../../components/Shared/SectionTitle";
import EmptyState from "../../Shared/EmptyState";

const EnrolledClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses"],
    queryFn: async () => {
      const res = await axiosSecure(`/payment/${user?.email}`);
      return res?.data;
    },
  });
  console.log(enrolledClasses);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SectionTitle heading={"My enrolled classes"} />
      <>
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-300">
                <th>#</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {enrolledClasses &&
                enrolledClasses.length > 0 &&
                enrolledClasses.map((item, i) => (
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
                    <td>
                      <button className="btn btn-sm btn-info capitalize ">
                        Continue to class
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {enrolledClasses && enrolledClasses.length < 1 && (
            <EmptyState
              heading={"No data"}
              subHeading={"You did not enroll to any class"}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default EnrolledClasses;
