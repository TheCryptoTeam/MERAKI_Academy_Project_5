import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import axios from "axios";

const Comment = ({ id }) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const { token, isLoggedIn } = state;

  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const createNewComment = async () => {
    const body = {
      comment,
    };
    const headers = {
        Authorization: `Bearer ${state.token}`,
    };
    await axios
      .post(`http://localhost:5000/productes/${id}/comments`, body,{headers})
      .then((res) => {
        if (res.data.success) {
          setStatus(true);
          console.log(res.data);
          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setStatus(false);
        console.log(err.response.data);
        setMessage(err.response.data.massege);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <textarea
                      placeholder="comment here"
                      
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
          <button onClick={createNewComment}>New commnet</button>
        </div>
      ) : (
        <h2>No Comments</h2>
      )}
    </>
  );
};

export default Comment;
