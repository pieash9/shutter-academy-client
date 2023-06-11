/* eslint-disable react/prop-types */

const ManageClassCard = ({ classData }) => {
  const {
    classImage,
    className,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    status,
  } = classData || {};
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img src={classImage} alt="Class" className="w-full" />
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2">{className}</h3>
          <p className="text-gray-800 mb-2">
            <span className="font-bold">Instructor:</span>
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-bold">Email:</span>
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-bold">Available Seats:</span>
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-bold">Price:</span>
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-bold">Status:</span> {status}
          </p>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <button className="btn btn-primary mr-2">Approve</button>
          <button className="btn btn-danger mr-2">Deny</button>
          <button className="btn btn-secondary">Send Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default ManageClassCard;
