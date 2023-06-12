import Banner from "../Banner/Banner";
import Courses from "../Courses/Courses";
import PopularClasses from "../PopularClasses/PopularClasses";

import { Helmet } from "react-helmet";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
  return (
    <div className="space-y-28 mb-28">
      <Helmet>
        <title>Shutter Academy | Home</title>
      </Helmet>
      <Banner />
      <PopularClasses />
      <PopularInstructor />
      <Courses />
    </div>
  );
};

export default Home;
