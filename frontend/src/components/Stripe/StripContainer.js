import React, { useState } from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

const StripePayment = () => {
  const stripe = loadStripe(
    "pk_test_51KQqbdCywILMWPHuZO10mguPNtgJzVrCD0pxcT9JEx4QbUf99Fz3hSur084HvAlojVVCHhVRyd4PFdCVgD2a07zE00iyGO8pHw"
  );
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};
function CheckoutForm() {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
  const {error,paymentMethod} = await stripe.createPaymentMethod({
    type: "card",
    
    card: elements.getElement(CardElement)})
    if(!error){
      try{
        await axios
        .post("http://localhost:5000/payment",{
          payment_method: paymentMethod.id,
        })
        
        setPaymentLoading(false);
        alert("Payment Successful")
        console.log("paymentMethod",paymentMethod);

      }
      catch(error){
        console.log("paymentMerrorcatch",error);
      }
    }else{
      console.log("paymentMerror",error.message)
    }

   
    // const paymentResult = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       name: "crypto",
    //     },
    //   },
    // });


// const paymentResult = await stripe.createPaymentMethod({card: elements.getElement(CardElement)}).then((res) => { console.log(res)});

    
    
  //   if (paymentResult.error) {
  //     alert(paymentResult.error.message);
  //   } else {
  //     if (paymentResult.paymentIntent.status === "succeeded") {
  //       alert("Success!");
  //     }
  //   }
  };
  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit={payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
              }}
            />
            <button className="pay-button" disabled={isPaymentLoading}>
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default StripePayment;
