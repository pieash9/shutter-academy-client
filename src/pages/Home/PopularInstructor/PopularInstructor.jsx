import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import { motion } from "framer-motion";
import Loader from "../../../components/Shared/Loader";
import SectionTitle from "../../../components/Shared/SectionTitle";
import InstructorCard from "../../../components/Card/InstructorCard";

const PopularInstructor = () => {
  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios.get(
        "https://shutter-academy-server.vercel.app/instructors"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  //  framer motion
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  console.log(instructors);
  return (
    <div className="mx-3">
      <SectionTitle
        heading={"Popular Instructors "}
        subHeading={
          "Photography is the only language that can be understood anywhere in the world."
        }
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
      >
        {instructors.length > 0 &&
          instructors.map((instructor) => (
            <motion.div variants={cardVariants} key={instructor._id}>
              <InstructorCard instructor={instructor} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default PopularInstructor;
