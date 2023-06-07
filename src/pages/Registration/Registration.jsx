import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import GoogleLogin from "../Shared/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const Registration = () => {
  const [show, setShow] = useState(true);
  const [confShow, setconfShow] = useState(true);
  const [passErr, setPassErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathName || "/";
  const { loading, setLoading, createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.confPassword) {
      setPassErr("Password and Confirm Password did not match!");
      return;
    }
    setPassErr("");
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(data.name, data.imageURL).then(() => {
          toast.success("Registration Successful");
          navigate(from, { replace: true });
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen bg-base-200 py-20">
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
                <small className="text-gray-500">
                  Password should be at least 6 characters long, include minimum
                  one special character and one capital letter.
                </small>

                <div className="absolute mt-12 right-12 cursor-pointer">
                  {show ? (
                    <FaEyeSlash
                      onClick={() => setShow(!show)}
                      className="w-5 h-5 text-gray-500"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setShow(!show)}
                      className="w-5 h-5 text-gray-500"
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
                      className="w-5 h-5 text-gray-500"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setconfShow(!confShow)}
                      className="w-5 h-5 text-gray-500"
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
                  Image URL<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("imageURL", { required: true })}
                type="url"
                placeholder="Image URL"
                className="input-primary"
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
              <button className="button-primary">Register</button>
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