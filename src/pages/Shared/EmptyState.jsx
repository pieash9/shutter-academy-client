/* eslint-disable react/prop-types */
const EmptyState = ({ heading, subHeading }) => {
  return (
    <div className=" flex justify-center flex-col items-center mt-5">
      <h3 className="font-semibold text-gray-800 text-2xl">{heading}</h3>
      <p className="text-gray-800">{subHeading}</p>
    </div>
  );
};

export default EmptyState;
