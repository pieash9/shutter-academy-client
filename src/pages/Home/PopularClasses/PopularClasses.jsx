import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "axios";
import Loader from "../../../components/Shared/Loader";
import ClassCard from "../../../components/Card/ClassCard";

const PopularClasses = () => {
  const { data: popularClasses = [], isLoading } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/allClasses");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  console.log(popularClasses);
  return (
    <div>
      <SectionTitle
        heading={"Popular Classes"}
        subHeading={
          "Photography is the only language that can be understood anywhere in the world."
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {popularClasses.length > 0 &&
          popularClasses.map((item) => (
            <ClassCard key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default PopularClasses;
