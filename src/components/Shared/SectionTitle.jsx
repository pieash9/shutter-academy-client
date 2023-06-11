/* eslint-disable react/prop-types */

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-10 ">
      <h3 className="mb-2 text-3xl font-medium  ">{heading}</h3>
      <p className="">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
