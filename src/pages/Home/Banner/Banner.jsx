import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/Banner/banner1.jpg";
import banner2 from "../../../assets/Banner/banner2.jpg";
import banner3 from "../../../assets/Banner/banner3.jpg";
import banner4 from "../../../assets/Banner/banner4.jpg";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div>
      <Carousel>
        <div className="relative flex justify-center items-center h-[450px] md:h-screen">
          <img src={banner1} className="w-full h-full object-cover" />
          <div className="absolute md:px-20 px-5">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <p className="text-white text-4xl md:text-6xl uppercase">
                The Academy Of PhotoGraphy
              </p>
              <button className="text-black bg-white text-xl md:text-2xl px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-opacity-70 mt-5 md:mt-7">
                Get Started
              </button>
            </motion.div>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[450px] md:h-screen">
          <img src={banner2} className="w-full h-full object-cover" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute md:px-20 px-5"
          >
            <p className="text-white text-4xl md:text-6xl uppercase">
              Through the lens, we see the world differently
            </p>
            <button className="text-black bg-white text-xl md:text-2xl px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-opacity-70 mt-5 md:mt-7">
              Get Started
            </button>
          </motion.div>
        </div>

        <div className="relative flex justify-center items-center h-[450px] md:h-screen">
          <img src={banner3} className="w-full h-full object-cover" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute md:px-20 px-5"
          >
            <p className="text-white text-4xl md:text-6xl uppercase">
              Unlock your creativity, frame by frame
            </p>
            <button className="text-black bg-white text-xl md:text-2xl px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-opacity-70 mt-5 md:mt-7">
              Get Started
            </button>
          </motion.div>
        </div>

        <div className="relative flex justify-center items-center h-[450px] md:h-screen">
          <img src={banner4} className="w-full h-full object-cover" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute md:px-20 px-5"
          >
            <p className="text-white text-4xl md:text-6xl uppercase">
              Discover the art of storytelling through photography
            </p>
            <button className="text-black bg-white text-xl md:text-2xl px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-opacity-70 mt-5 md:mt-7">
              Get Started
            </button>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
