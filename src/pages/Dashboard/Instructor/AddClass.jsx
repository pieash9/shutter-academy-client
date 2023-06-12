import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
const image_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const AddClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const onSubmit = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("image", data.classImage[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          axiosSecure
            .post(`/classes`, {
              ...data,
              status: "pending",
              totalEnrolled: 0,

              classImage: imgURL,
            })
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                toast.success("Class added successfully");
              }
            });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Shutter Academy | Add a class</title>
      </Helmet>
      <SectionTitle heading={"Add a Class"} subHeading={""} />

      <div className="mt-10">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* class name & image */}
          <div className="flex gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Class name<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("className", { required: true })}
                type="text"
                placeholder="Class Name"
                className="input-primary"
              />
              {errors.className && (
                <span className="text-warning mt-1">Name is required</span>
              )}
            </div>

            {/* Class Image */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Class Image<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("classImage", { required: true })}
                type="file"
                placeholder="Image"
                className="input-primary"
                accept="image/*"
              />
              {errors.className && (
                <span className="text-warning mt-1">Image is required</span>
              )}
            </div>
          </div>

          {/* Instructor  name & Instructor  email */}
          <div className="flex gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Instructor name<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("instructorName", { required: true })}
                type="text"
                value={user?.displayName}
                className="input-primary"
                readOnly
              />
            </div>

            {/* Instructor email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Instructor Email<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("instructorEmail", { required: true })}
                type="email"
                value={user?.email}
                className="input-primary"
                readOnly
              />
            </div>
          </div>

          {/* Available seats and Price */}
          <div className="flex gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Available seats<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("availableSeats", { required: true })}
                type="number"
                placeholder="Available seats"
                className="input-primary"
              />
              {errors.availableSeats && (
                <span className="text-warning mt-1">
                  Available seats name is required
                </span>
              )}
            </div>

            {/* price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Price<span className="text-[#D8864B]">*</span>
                </span>
              </label>
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="Price"
                className="input-primary"
              />
              {errors.price && (
                <span className="text-warning mt-1">
                  Price image is required
                </span>
              )}
            </div>
          </div>
          <div className="mx-auto text-center ">
            <button type="submit" className="button-primary !py-2 mt-5  w-1/2">
              Add class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
