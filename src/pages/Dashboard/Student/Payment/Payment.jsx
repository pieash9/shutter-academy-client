import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import SectionTitle from "../../../../components/Shared/SectionTitle";
import "./Payment.css";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const Payment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);

  //get all selected class
  const { data: classData = [] } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => {
      const res = await axiosSecure(`/selectedAClasses/${id}`);
      return res?.data;
    },
  });
  console.log(classData);
  useEffect(() => {
    if (classData.price) {
      axiosSecure
        .post("/create-payment-intent", {
          price: classData.price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [classData, axiosSecure]);

  const handleSubmit = async (event) => {
    setBtnLoading(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setBtnLoading(false);
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setBtnLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setBtnLoading(false);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      setBtnLoading(false);
      setCardError(confirmError.message);
    } else {
      setCardError("");
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const {
          classId,
          _id,
          classImage,
          studentInfo,
          instructorName,
          className,
        } = classData;
        const paymentInfo = {
          classId,
          classImage,
          selectedClassId: _id,
          studentInfo,
          instructorName,
          className,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        axiosSecure.post("/payment", { ...paymentInfo }).then((res) => {
          console.log(res?.data);
          if (res?.data.insertedId) {
            axiosSecure.delete(`/selectedClasses/${_id}`).then((res) => {
              if (res?.data?.deletedCount > 0) {
                axiosSecure
                  .patch(`/classes/${classData?.classId}`)
                  .then((res) => {
                    console.log(res?.data);
                    if (res?.data.modifiedCount > 0) {
                      toast.success("Payment Success");
                      setBtnLoading(false);
                      navigate("/dashboard/student/selected-class");
                    }
                  });
              }
            });
          }
        });
      }
    }
  };

  return (
    <>
      <SectionTitle heading={"Payment Now"} />
      <form
        onSubmit={handleSubmit}
        className="md:w-2/3 mx-auto my-10 bg-base-300 p-10 rounded"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {cardError && <p className="text-red-500 my-2">{cardError}</p>}
        <button
          type="submit"
          className={`button-primary !py-1 !px-5 ${
            btnLoading ? "cursor-not-allowed " : ""
          }`}
          disabled={!stripe || btnLoading}
        >
          {!btnLoading ? (
            "Pay"
          ) : (
            <p className="animate-spin py-[2px] !px-[6px]">
              <FaSpinner size={20} />
            </p>
          )}
        </button>
      </form>
    </>
  );
};
export default Payment;
