import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import GoogleLogin from "../Shared/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn } = useAuth();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathName || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
        toast.success("Login success");
      })
      .catch(() => {
        toast.error("Incorrect password");
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>Shutter Academy | Login</title>
      </Helmet>
      <div className=" w-full">
        <div className="card  max-w-lg mx-auto  shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <GoogleLogin title={"Login with"} />
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

            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Password<span className="text-[#D8864B]">*</span>
                  </span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type={show ? "password" : "text"}
                  placeholder="Your Password"
                  className="input-primary"
                />
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

                {errors.password && (
                  <span className="text-warning mt-1">
                    Password is required
                  </span>
                )}
              </div>
            </div>
            <div className="label">
              <input
                className="checkbox checkbox-warning checkbox-sm mr-2"
                type="checkbox"
              />
              <p>
                <small>Remember password</small>
              </p>
            </div>

            <div className="form-control mt-4">
              <button className="button-primary">Login</button>
            </div>
            <p className="mt-3">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-[#D8864B] link-hover cursor-pointer"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
