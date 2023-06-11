import axios from "axios";
import SectionTitle from "../../components/Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../components/Card/ClassCard";
import Loader from "../../components/Shared/Loader";

const Classes = () => {
  const { data: allClass = [], isLoading: loading } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const data = await axios(
        `https://shutter-academy-server.vercel.app/approvedClasses`
      );
      return data?.data;
    },
  });
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-5 px-3">
      <SectionTitle
        heading={"All Classes"}
        subHeading={"Enhance Your Skills with Our Photography Classes"}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
        {allClass.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
