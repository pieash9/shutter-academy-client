/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const FeedbackModal = ({ modalData, refetch }) => {
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    window.isOpenFeedbackModal.close();

    const res = await axiosSecure.put(`/classFeedback/${modalData._id}`, {
      ...data,
    });
    if (res?.data.modifiedCount > 0) {
      reset();
      refetch();
      toast.success("Your feedback is provided");
    }
  };

  console.log(modalData);
  return (
    <dialog id="isOpenFeedbackModal" className="modal ">
      <div className="modal-box ">
        <button
          onClick={() => window.isOpenFeedbackModal.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-2xl font-medium text-gray-800 text-center mb-5">
          Feedback
        </h3>
        <form className="flex flex-col mx-5" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className="input-primary h-28"
            {...register("feedback", { required: true })}
          />

          {errors.feedback && (
            <span className="text-warning mt-2">
              Feedback field is required
            </span>
          )}

          <button type="submit" className="button-primary w-1/2 mx-auto mt-5">
            Send Feedback
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default FeedbackModal;
