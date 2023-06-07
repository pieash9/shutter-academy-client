import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-358px)]">
        {" "}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
