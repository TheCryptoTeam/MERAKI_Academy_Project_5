import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { MdPerson } from "react-icons/md";

const Rating = () => {
  const userId = localStorage.getItem("myUserId");
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [avarage, setAvarage] = useState(0);

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const avarageCalc = () => {
    let result = 0;
    for (let i = 0; i < ratings.length; i++) {
      const element = ratings[i];
      result += parseInt(element.rating);
    }
    if (result) {
      let num = result / ratings.length;
      setAvarage(num);
    }
  };

  const ratingChanged = (newRating) => {
    createRating(newRating);
  };

  const createRating = async (newRating) => {
    let isVoted = true;
    if (ratings.length) {
      for (let i = 0; i < ratings.length; i++) {
        const element = ratings[i];

        if (element.user_id === parseInt(userId)) {
          return (isVoted = false);
        }
      }
    }
    if (isVoted) {
      const headers = {
        Authorization: `Bearer ${state.token}`,
      };

      await axios
        .post(`/products/rate/${id}`, { rating: newRating }, { headers })
        .then((res) => {
          if (res.data.success) {
            getRatings(id);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getRatings = async () => {
    await axios
      .get(`/products/rate/${id}`)
      .then((res) => {
        if (res.data.success) {
          setRatings(res.data.results);
        } else {
          setRatings([]);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getRatings();
  }, []);

  useEffect(() => {
    avarageCalc();
  }, [ratings]);

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
      <span id="votes">{ratings.length} </span>{" "}
      <MdPerson color={"#344055"} size={25} />
      <div className="avarage">
        <span>{avarage.toFixed(1)}</span>
        <i className="fa fa-star" aria-hidden="true"></i>
      </div>
    </>
  );
};

export default Rating;
