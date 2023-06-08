import axios from "axios";
import SectionTitle from "../../components/Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../components/Card/ClassCard";
import Loader from "../../components/Shared/Loader";
const Classes = () => {
  const { data: allClass = [], isLoading: loading } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const data = await axios(`http://localhost:5000/approvedClasses`);
      return data?.data;
    },
  });
  if (loading) {
    return <Loader />;
  }
  console.log(allClass);

//   Todo: disable button for instructor and admin if the user is not logged in, then tell the user to log in before selecting the course. 
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
