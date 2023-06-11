/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
const image_hosting_token = import.meta.env.VITE_IMGBB_KEY;

const ClassUpdateModal = ({ classData, refetch }) => {
  //   console.log(classData);

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
    window.classUpdateModal.close();
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
            .patch(`/updateClass/${classData._id}`, {
              ...data,
              classImage: imgURL || classData.classImage,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.modifiedCount > 0) {
                refetch();
                reset();
                toast.success("Class added successfully");
              }
            });
        }
      });
  };
  return (
    <dialog id="classUpdateModal" className="modal">
      <div className="modal-box max-w-5xl md:w-2/3">
        <div className="md:px-10 md:py-7">
          <div className="mb-5 text-center text-gray-800 font-medium">
            <h3 className="text-2xl">Update class</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                  defaultValue={classData?.className}
                  required
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
                  required
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
                  defaultValue={classData?.availableSeats}
                  required
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
                  defaultValue={classData?.price}
                  required
                />
                {errors.price && (
                  <span className="text-warning mt-1">Price is required</span>
                )}
              </div>
            </div>
            <div className="mx-auto text-center ">
              <button
                type="submit"
                className="button-primary !py-2 mt-5  w-1/2"
              >
                Update class
              </button>
            </div>
          </form>
        </div>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => window.classUpdateModal.close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ClassUpdateModal;
