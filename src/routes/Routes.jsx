import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import Classes from "../pages/Classes/Classes";
import Instructors from "../pages/Instructors/Instructors";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // student
      {
        path: "student/selected-class",
        element: <SelectedClass />,
      },
      {
        path: "student/enrolled-class",
        element: <EnrolledClasses />,
      },
      //payment
      {
        path: "student/selected-class/payment/:id",
        element: (
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        ),
      },

      //instructor
      {
        path: "instructor/add-class",
        element: <AddClass />,
      },
      {
        path: "instructor/my-classes",
        element: <MyClasses />,
      },

      //admin
    ],
  },
]);

export default router;
