import React from "react";
import { useState } from "react";
import axios from "axios";

const UploadFile = ({ setImage }) => {
  const [file, setFile] = useState();
  const [filelink, setFilelink] = useState("Choose File");
  const imageUpload = (imageFile) => {
    const formData = new FormData();

    formData.append("file", imageFile);

    formData.append("upload_preset", "zy79gcay");
    axios
      .post(`https://api.cloudinary.com/v1_1/cryptoteam/image/upload`, formData)
      .then((res) => {
        setFilelink(res.data.secure_url);
        setImage(res.data.secure_url);
      })

      // .then(url => callback(url))
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="upload">
      <input
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        type="file"
      ></input>

      <button
        onClick={() => {
          imageUpload(file);
        }}
      >
        Upload
      </button>

      <br />

      <img className="upload" src={filelink} alt="" />
    </div>
  );
};

export default UploadFile;
