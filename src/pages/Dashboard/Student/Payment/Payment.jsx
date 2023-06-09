import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import SectionTitle from "../../../../components/Shared/SectionTitle";
import "./Payment.css";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useAxiosSecure } from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { id } = useParams();

  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();

  //get all selected class
  const { data: classData = [] } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => {
      const res = await axiosSecure(`/selectedAClasses/${id}`);
      return res?.data;
    },
  });
console.log(classData)
  useEffect(() => {
    if (classData.price) {
      axiosSecure.post("/create-payment-intent", {
        price: classData.price,
      }).then(res=>{
        setClientSecret(res.data.clientSecret);
      })
    }
  }, [classData, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
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
      setCardError(confirmError.message);
    } else {
      setCardError("");
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          ...classData,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
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
          className="button-primary !py-1 !px-5"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </>
  );
};
export default Payment;
