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
  // const [rating, setRating] = useState("");
  const [avarage, setAvarage] = useState(0);
  // const [isVoted ,setIsVoted ]=useState(false)

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const avarageCalc = () => {
    console.log("in average calculator");

    let result = 0;
    for (let i = 0; i < ratings.length; i++) {
      const element = ratings[i];
      console.log(element);
      result += parseInt(element.rating);
    }
    if (result) {
      let num = result / ratings.length;
      setAvarage(num);
      console.log("avarage ", avarage);
    }
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    // setRating(newRating);
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
      console.log("hi");
      const headers = {
        Authorization: `Bearer ${state.token}`,
      };

      await axios
        .post(`/products/rate/${id}`, { rating: newRating }, { headers })
        .then((res) => {
          if (res.data.success) {
            getRatings(id);
            console.log("in Create", newRating);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getRatings = async () => {
    console.log("in get ratings");
    await axios
      .get(`/products/rate/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setRatings(res.data.results);
        } else {
          setRatings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("in use effect component");
    getRatings();
  }, []);

  useEffect(() => {
    avarageCalc();
  }, [ratings]);

  // useEffect(() => {
  //   createRating();
  // }, [rating]);
  //   console.log(ratings);

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
        <i class="fa fa-star" aria-hidden="true"></i>
      </div>
    </>
  );
};

export default Rating;
