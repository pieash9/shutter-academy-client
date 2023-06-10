/* eslint-disable react/prop-types */
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const ClassCard = ({ item }) => {
  const { user } = useAuth();
  const { classImage, className, instructorName, availableSeats, price } = item;
  const [axiosSecure] = useAxiosSecure();

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
        className={`card ${
          availableSeats == 0 ? "bg-red-500" : "bg-base-300"
        }  shadow-xl `}
      >
        {availableSeats == 0 && (
          <div className="badge badge-warning absolute -right-2 -top-2">
            No seat Available
          </div>
        )}
        <div className="card-body">
          <img
            src={classImage}
            alt={className}
            className="w-full h-52 object-cover rounded"
          />
          <h2 className="card-title">{className}</h2>
          <p className="">Instructor: {instructorName}</p>
          <p className="">Available Seats: {availableSeats}</p>
          <p className="">Price: ${price}</p>
          <button
            onClick={() => handleSelect(item)}
            disabled={availableSeats === 0}
            className={`button-primary mt-4 ${
              availableSeats == 0 ? "cursor-not-allowed " : ""
            }`}
          >
            Select
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
