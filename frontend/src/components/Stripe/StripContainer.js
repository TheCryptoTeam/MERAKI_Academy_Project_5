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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

  //==============================
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
     
    };
  });
  //============================
  const navigate = useNavigate();
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",

      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        await axios.post("http://localhost:5000/payment", {
          payment_method: paymentMethod.id,
        });

        setPaymentLoading(false);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1700,
        });
        await deleteMyCart()
        navigate("/home");
        
      } catch (error) {
        console.log("paymentMerrorcatch", error);
      }
    } else {
      setPaymentLoading(false);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
//Delete all myCarts after payment
  //================================
  const deleteMyCart = async () => {

    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    
    await axios.delete(`http://localhost:5000/carts`,{headers})
    
  };
  //===============================
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
