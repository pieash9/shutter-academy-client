/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";
import axios from "axios";

const ClassCard = ({ item, isLoading }) => {
  const { user } = useAuth();
  const {
    classImage,
    className,
    instructorName,
    availableSeats,
    price,
    totalEnrolled,
  } = item;
  const [axiosSecure] = useAxiosSecure();
  //get user role
  const { data: userRole = [], isLoading: loading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axios.get(
        `https://shutter-academy-server.vercel.app/getUserRole/${user?.email}`
      );
      return res?.data?.role || "";
    },
  });
  if (isLoading || loading) {
    return <Loader />;
  }

  // only student can select class
  const handleSelect = (item) => {
    const {
      _id,
      classImage,
      className,
      instructorName,
      availableSeats,
      price,
    } = item;
    axiosSecure
      .post("/selectedClasses", {
        classId: _id,
        classImage,
        className,
        instructorName,
        availableSeats,
        price,
        studentInfo: {
          name: user?.displayName,
          email: user?.email,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Class added. Visit dashboard for more info.");
        }
      });
  };
  return (
    <>
      <div
        className={`card  ${
          availableSeats == 0 ? "bg-red-500" : "bg-base-300"
        }  shadow-xl `}
      >
        {availableSeats == 0 && (
          <div className="badge badge-warning absolute -right-2 -top-2">
            No seat Available
          </div>
        )}
        <div className="card-body dark:text-white ">
          <img
            src={classImage}
            alt={className}
            className="w-full h-52 object-cover rounded"
          />
          <h2 className="card-title">{className}</h2>
          <p className="">Instructor: {instructorName}</p>
          <p className="">Available Seats: {availableSeats}</p>
          <p className="">Enrolled Student: {totalEnrolled}</p>
          <p className="">Price: ${price}</p>
          <button
            onClick={() => handleSelect(item)}
            disabled={
              availableSeats === 0 ||
              userRole === "admin" ||
              userRole === "instructor"
            }
            className={`button-primary mt-4 `}
          >
            Select
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
