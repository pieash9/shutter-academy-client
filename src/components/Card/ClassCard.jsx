/* eslint-disable react/prop-types */

const ClassCard = ({ item }) => {
  const { classImage, className, instructorName, availableSeats, price } = item;
  return (
    <>
      <div
        className={`card ${
          availableSeats == 0 ? "bg-red-500" : "bg-base-200"
        }  shadow-xl `}
      >
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
