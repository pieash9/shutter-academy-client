import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import GoogleLogin from "../Shared/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
const image_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const Registration = () => {
  const [show, setShow] = useState(true);
  const [confShow, setconfShow] = useState(true);
  const [passErr, setPassErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const from = location.state?.from?.pathName || "/";
  const { createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    if (data.password !== data.confPassword) {
      setPassErr("Password and Confirm Password did not match!");
      setLoading(false);
      return;
    }
    setPassErr("");
    console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;

          const userData = {
            name: data.name,
            email: data.email,
            role: "student",
            image: imgURL,
            createdAt: new Date().toLocaleDateString(),
          };
          createUser(data.email, data.password)
            .then((result) => {
              console.log(result.user);
              updateUserProfile(data.name, userData.image).then(() => {
                //add user to db
                axiosSecure
                  .put(`/users/:${data.email}`, {
                    ...userData,
                  })
                  .then((res) => {
                    console.log(res.data);

                    if (res.data) {
                      toast.success("Registration Successful");
                      setLoading(false);
                      navigate(from, { replace: true });
                    }
                  });
              });
            })
            .catch(() => {
              toast.error("Something went wrong! please try again!");
              setLoading(false);
            });
        }
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200 py-20">
      <Helmet>
        <title>Shutter Academy | Register</title>
      </Helmet>
      <div className=" w-full">
        <div className="card  max-w-lg mx-auto  shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <GoogleLogin title={"Register with"} />
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Name<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input-primary"
              />
              {errors.email && (
                <span className="text-warning mt-1">Name is required</span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Email<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Your Email"
                className="input-primary"
              />
              {errors.email && (
                <span className="text-warning mt-1">Email is required</span>
              )}
            </div>

            {/*  password */}
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Password<span className="text-[#D8864B]">*</span>
                  </span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  })}
                  type={show ? "password" : "text"}
                  placeholder="Your Password"
                  className="input-primary"
                />
                <small className="text-gray-800">
                  Password should be at least 6 characters long, include minimum one special character, capital letter & number.
                </small>

                <div className="absolute mt-12 right-12 cursor-pointer">
                  {show ? (
                    <FaEyeSlash
                      onClick={() => setShow(!show)}
                      className="w-5 h-5 text-gray-800"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShow(!show)}
                      className="w-5 h-5 text-gray-800"
                    />
                  )}
                </div>

                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password must be more than 6 characters
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase, one number and one special
                    character.
                  </p>
                )}
              </div>
            </div>

            {/* confirm password */}
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Confirm Password<span className="text-[#D8864B]">*</span>
                  </span>
                </label>
                <input
                  {...register("confPassword", { required: true })}
                  type={confShow ? "password" : "text"}
                  placeholder="Confirm Password"
                  className="input-primary"
                />
                <div className="absolute mt-12 right-12 cursor-pointer">
                  {confShow ? (
                    <FaEyeSlash
                      onClick={() => setconfShow(!confShow)}
                      className="w-5 h-5 text-gray-800"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setconfShow(!confShow)}
                      className="w-5 h-5 text-gray-800"
                    />
                  )}
                </div>

                {passErr && (
                  <span className="text-warning mt-1">{passErr}</span>
                )}
              </div>
            </div>

            {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Image <span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                placeholder="Image"
                className="input-primary"
                accept="image/*"
                required
              />
              {errors.image && (
                <span className="text-warning mt-1">Image is required</span>
              )}
            </div>

            <div className="label">
              <input
                className="checkbox checkbox-warning checkbox-sm mr-2"
                type="checkbox"
                required
              />

              <p>
                Accept{" "}
                <span className="text-[#D8864B] cursor-pointer">Terms</span> and{" "}
                <span className="text-[#D8864B]  cursor-pointer">
                  Conditions
                </span>
              </p>
            </div>

            <div className="form-control mt-4">
              <button className="button-primary flex justify-center">
                {loading ? <FaSpinner className="animate-spin " /> : "Register"}
              </button>
            </div>
            <p className="mt-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#D8864B] link-hover cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
