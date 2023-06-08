import SectionTitle from "../../../components/Shared/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  axiosSecure(`/instructorClasses/${user?.email}`).then((res) =>
    console.log(res.data)
  );

  return <div>
    <SectionTitle heading={"My classes"}/>
  </div>;
};

export default MyClasses;
