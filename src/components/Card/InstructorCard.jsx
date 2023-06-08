/* eslint-disable react/prop-types */
const InstructorCard = ({ instructor }) => {
  return (
    <div className="max-w-sm rounded bg-base-200 overflow-hidden shadow-xl flex flex-col justify-center items-center pt-5">
      <img className="h-48 rounded" src={instructor.image} alt="Instructor" />
      <div className="px-6 py-4">
        <p className="font-semibold text-gray-700 text-xl mb-2">{instructor.name}</p>
        <p className="text-gray-700 text-base">{instructor.email}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
