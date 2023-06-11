import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "axios";

import ClassCard from "../../../components/Card/ClassCard";
import { motion } from "framer-motion";

const PopularClasses = () => {
  const { data: popularClasses = [], isLoading } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axios.get(
        "https://shutter-academy-server.vercel.app/allClasses"
      );
      return res.data;
    },
  });

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

  return (
    <div className="px-3">
      <SectionTitle
        heading={"Popular Classes"}
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
        {popularClasses.length > 0 &&
          popularClasses.map((item) => (
            <motion.div key={item._id} variants={cardVariants}>
              <ClassCard item={item} isLoading={isLoading} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default PopularClasses;
