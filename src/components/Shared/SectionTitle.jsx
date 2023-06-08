/* eslint-disable react/prop-types */

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center">
      <h3 className="mb-2 text-4xl font-medium text-gray-700">{heading}</h3>
      <p className="text-gray-600">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
