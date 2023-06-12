import axios from "axios";
import SectionTitle from "../../components/Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Shared/Loader";
import InstructorCard from "../../components/Card/InstructorCard";
import { Helmet } from "react-helmet";

const Instructors = () => {
  const { data: instructors = [], isLoading: loading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const data = await axios(
        `https://shutter-academy-server.vercel.app/instructors`
      );
      return data?.data;
    },
  });
  if (loading) {
    return <Loader />;
  }
  console.log(instructors);
  return (
    <div className="mt-5 px-3">
      <Helmet>
        <title>Shutter Academy | Instructor</title>
      </Helmet>
      <SectionTitle
        heading={"Meet our instructors"}
        subHeading={
          "Passionate and Experienced Instructors to Guide Your Photography Journey"
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 mt-10 mb-20 gap-6">
        {instructors?.map((instructor) => (
          <InstructorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
