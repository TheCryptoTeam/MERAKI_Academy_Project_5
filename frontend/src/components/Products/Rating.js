import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";

const Rating = () => {
  const { id } = useParams();
  const [ratings, setRatings] = useState("");
  const[rating,setRating]=useState("")
//   const [avarage]

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const ratingChanged =  (newRating) => {
    console.log(newRating);
    setRating(newRating)
   
   
  };


  const createRating =()=>{

      const headers = {
        Authorization: `Bearer ${state.token}`,
      };
      axios
        .post(`http://localhost:5000/products/rate/${id}`, { rating }, { headers })
        .then((res) => {
          if (res.data.success) {
            getRatings(id);
            console.log("in Create",rating);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const getRatings = async (id) => {
    await axios
      .get(`http://localhost:5000/products/rate/${id}`)
      .then((res) => {
        if (res.data.success) {
          setRatings(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRatings(id);
    createRating()
  }, [rating]);
  console.log(ratings);
  return (
    <>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <>{ratings.length}</>
    </>
  );
};

export default Rating;
