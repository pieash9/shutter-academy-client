import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Shared/Loader";
import SectionTitle from "../../../components/Shared/SectionTitle";
import EmptyState from "../../Shared/EmptyState";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses"],
    queryFn: async () => {
      const res = await axiosSecure(`/payment/${user?.email}`);
      return res?.data || [];
    },
  });
  console.log(paymentHistory);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SectionTitle heading={"Payment History"} />
      <div>
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-300">
                <th>#</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>Transaction Id</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory &&
                paymentHistory.length > 0 &&
                paymentHistory.map((item, i) => (
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
                      <p className="capitalize">{item?.transactionId}</p>
                    </td>
                    <td>
                      <p className="capitalize">
                        {`${new Date(item?.date).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "numeric",
                        })} ${new Date(item?.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })} `}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {paymentHistory && paymentHistory.length < 1 && (
            <EmptyState
              heading={"No data"}
              subHeading={"You did not make any payment"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
