
import React from "react"



////////////////////////////////////////////////////////////////////////////////////////////////////
//component Home


const Home=()=>{

    



/////////////////////////////////////////////////////////////////////////////////////////////////////
//  getAllProducts  


  const getAllProducts = async () => {
      const res = await axios.get("http://localhost:5000/products", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }).
      then((result)=>{
          console.log(result);
      })
      .catch((err)=>{
          console.log(err);
      })
   
  };





    return(
        <div>


        </div>
    )
}




export default Home;