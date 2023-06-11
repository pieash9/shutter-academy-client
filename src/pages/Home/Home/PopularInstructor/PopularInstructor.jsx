import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import Loader from "../../../../components/Shared/Loader";
import SectionTitle from "../../../../components/Shared/SectionTitle";
import InstructorCard from "../../../../components/Card/InstructorCard";

const PopularInstructor = () => {
  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/instructors");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  console.log(instructors);
  return (
    <div>
      <SectionTitle
        heading={"Popular Instructors "}
        subHeading={
          "Photography is the only language that can be understood anywhere in the world."
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {instructors.length > 0 &&
          instructors.map((instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
