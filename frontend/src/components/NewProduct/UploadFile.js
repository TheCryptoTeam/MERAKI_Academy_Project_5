import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const UploadFile = ({ setImage }) => {
  const [file, setFile] = useState();
  const [filelink, setFilelink] = useState(null);
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
      .catch((err) => {
        console.log(err.response);
      });
  };


  return (
    <div className="uploadContinar">
      <div className="up" >
        <input
          onChange={(event) => {
            setFile(event.target.files[0]);
            imageUpload(file);

          }}
          type="file"
        ></input>


        <button className="btnUpload"
          onClick={() => {
            imageUpload(file);
          }}
        >
          Upload
        </button>
      </div>



      {filelink ? (<img className="upload" src={filelink} alt="" />) : (<></>)}

    </div>
  );
};

export default UploadFile;
