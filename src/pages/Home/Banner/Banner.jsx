import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/Banner/banner1.jpg";
import banner2 from "../../../assets/Banner/banner2.jpg";
import banner3 from "../../../assets/Banner/banner3.jpg";
import banner4 from "../../../assets/Banner/banner4.jpg";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div className="relative flex justify-center items-center ">
          <img src={banner1} />
          <div className="absolute md:px-20">
            <p className=" text-white text-6xl uppercase">
              The Academy Of PhotoGraphy
            </p>
            <button className="text-black bg-white text-2xl px-10 py-4 rounded-full hover:bg-opacity-70 mt-7">
              Get Started
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <img src={banner2} />
          <div className="absolute md:px-20">
            <p className=" text-white text-6xl uppercase">
              Through the lens, we see the world differently
            </p>
            <button className="text-black bg-white text-2xl px-10 py-4 rounded-full hover:bg-opacity-70 mt-7">
              Get Started
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <img src={banner3} />
          <div className="absolute md:px-20">
            <p className=" text-white text-6xl uppercase">
              Unlock your creativity, frame by frame
            </p>
            <button className="text-black bg-white text-2xl px-10 py-4 rounded-full hover:bg-opacity-70 mt-7">
              Get Started
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <img src={banner4} />
          <div className="absolute md:px-20">
            <p className=" text-white text-6xl uppercase">
              Discover the art of storytelling through photography
            </p>
            <button className="text-black bg-white text-2xl px-10 py-4 rounded-full hover:bg-opacity-70 mt-7">
              Get Started
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
