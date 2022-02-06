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
  //===============================================================

  useEffect(() => {
    getComments();
  }, []);

  //===============================================================
  const { token, isLoggedIn } = state;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
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
      .post(`http://localhost:5000/productes/${id}/comments`, body, { headers })
      .then((res) => {
        if (res.data.success) {
          setStatus(true);

          setMessage(res.data.massege);
          getComments();
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessage(err.response.data.massege);
      });
  };

  const getComments = async () => {
    await axios
      .get(`http://localhost:5000/productes/${id}/comments`)
      .then((res) => {
        if (res.data.success) {
          setStatus(true);
          setComments(res.data.comments);

          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessage(err.response.data.massege);
      });
  };

  const deleteComment = async (id) => {
    await axios
      .delete(`http://localhost:5000/productes/${id}/comments`)
      .then((res) => {
        if (res.data.success) {
          setStatus(true);

          getComments();
          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessage(err.response.data.massege);
      });
  };
  return (
    <>
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <h3>{comment.commenter}</h3>
            <p>{comment.comment}</p>
            <button onClick={() => deleteComment(comment.id)}>
              Delete comment
            </button>
          </div>
        );
      })}
      {isLoggedIn ? (
        <div>
          <textarea
            placeholder="comment here"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button onClick={createNewComment}>New commnet</button>
        </div>
      ) : (
        <h2>register to add a comment</h2>
      )}
    </>
  );
};

export default Comment;
