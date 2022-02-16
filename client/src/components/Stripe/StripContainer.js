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
      total: state.cartsReducer.total,
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
        await axios.post("/payment", {
          payment_method: paymentMethod.id,
        });

        setPaymentLoading(false);
        Swal.fire({
          icon: "success",
          title: "Thank you for your payment",
          showConfirmButton: false,
          timer: 1700,
        });
        await deleteMyCart();
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

    await axios.delete(`/carts`, { headers });
  };
  //===============================
  return (
    <div className="bodyCard">
      <div class="align-center">
        <div class="card">
          <header>
            <h3 class="card-title">Payment Details</h3>
            <img
              id="visa"
              width="128"
              alt="Visa Inc. logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/128px-Visa_Inc._logo.svg.png"
              class="logo"
            />
          </header>

          <form action="" class="form" onSubmit={payMoney}>
            <div class="card-number">
              <label for="number">Card Number</label>
              <CardElement
                id="cardE"
                options={{
                  style: {
                    base: {
                      color: "#FFAB40",
                    },
                  },
                }}
              />
            </div>

            <div class="card-name">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                size="40"
                required
                placeholder="Your Name"
              />
              <label for="name" className="lastName">
                Last Name
              </label>
              <input
                id="name"
                type="text"
                size="40"
                required
                placeholder="Your Name"
              />
            </div>

            <div class="input-row">
              <div class="card-cvc">
                <label for="cvc">Total</label>
                <span id="cvc">{"$" + state.total}</span>
              </div>

              <button class="buy-button" disabled={isPaymentLoading}>
                {" "}
                {isPaymentLoading ? "Loading..." : "Complete Purchase"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default StripePayment;
