import axios from "axios";
import SectionTitle from "../../components/Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../components/Card/ClassCard";
const Classes = () => {
  const { data: allClass = [] } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const data = await axios(`http://localhost:5000/classes`);
      return data?.data;
    },
  });
  console.log(allClass)
  return (
    <div className="mt-5">
      <SectionTitle
        heading={"All Classes"}
        subHeading={"Enhance Your Skills with Our Photography Classes"}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {allClass.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
