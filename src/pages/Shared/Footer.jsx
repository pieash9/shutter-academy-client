
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="">
            <img
              src={logo}
              alt="Logo"
              className="w-72 mr-2 bg-slate-300 rounded-md"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="text-white font-bold mb-2">Contact</h4>
            <p>Email: pieash@gmail.com</p>
            <p>Phone: +8801627001665</p>
            <p>Address: Savar, Dhaka</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="text-white font-bold mb-2">Subscribe</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-l-md bg-gray-800 text-gray-200 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-[#CD684A] focus:ring-transparent"
              />
              <button className="px-4 py-2 rounded-r-md focus:outline-none transform transition-all duration-300 bg-gradient-to-r from-[#CD684A] via-[#D8864B] to-[#E9B84C] hover:bg-gradient-to-r hover:from-[#E9B84C] hover:via-[#D8864B] hover:to-[#CD684A] ">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-8 border-gray-800" />
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Shutter Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
