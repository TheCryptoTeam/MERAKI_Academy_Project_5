import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setproducts,
  addproduct,
  updateproductById,
  deleteProductById,
} from "../../reducer/products";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./Products.css";
import Comment from "./Comment";
import Rating from "./Rating";
import Swal from "sweetalert2";
import { BsHeart } from "react-icons/bs";
import{addcart} from"../../reducer/cart/carts";




const Products = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [elementId, setElementId] = useState([]);

  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  // const [id,setId]=useState("")
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      products: state.productsReducer.products,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //getproductById

  const { id } = useParams();

  const getproductById = async () => {
    await axios
      .get(`http://localhost:5000/products/id/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        dispatch(setproducts(res.data.products));
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getproductById();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      dispatch(deleteProductById(id));
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const addToWishList = async (id) => {
    console.log(state.token);
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios
      .post(`http://localhost:5000/wishList/${id}`, {}, { headers })
      .then((res) => {
        setMessage(res.data.massage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    console.log(headers);
    let quantity = 1;
    await axios
      .post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {
        dispatch(addcart(res.data.result)) ;
      });
  };


  /////////////////////////////////////////////////////////////////////////////////////
  const handleUpdateClick = (product) => {
    setUpdateBox(!updateBox);
    setProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setBrand(product.brand);
    setType(product.type);
    setPrice(product.price);
    setElementId([...elementId,product.id])

    if (updateBox) updateProduct(product.id);
  };

  const updateProduct = async (id) => {
    const body = {
      name,
      type,
      brand,
      description,
      price,
    };

    try {
      await axios.put(`http://localhost:5000/products/${id}`, body);
      dispatch(updateproductById(body));
      getproductById();
    } catch (error) {
      throw error;
    }
  };
  const handlecolor = (element) => {
    setElementId([...elementId, element.id]);
  };
  return (
  
    
      <div >
        <div className="gridProduct" >
          <div >
        {state.products.map((product, index) => {
          return (
            <div>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<div id="container">	
	
	<div class="product-details">
 <span className="BsHeartProduct"> {elementId.includes(product.id)  ? <BsHeart    width={30} onClick={() => {
                                
                  
                                handleUpdateClick(product)
                              }}
                                style={{ color: 'red' }}
                              /> : <BsHeart size={30} id={product.id} onClick={() => {
                                handleUpdateClick(product)
                              }}
                              style={{ color: 'black' }}
                              />}
                              </span>
	<h1>{product.name}</h1><br/>
	<span class="hint-star star">
  <Rating /> 
	</span>
		
			<p class="information">{product.description}</p>

		
		
<div class="control">
	

<span
                                  className="add "
                                  onClick={() => {
                                    addToWishList(product.id);
                                  }}
                                >
                                  {elementId.includes(product.id) ? (
                                    <BsHeart
                                      className="add"
                                      onClick={() => {
                                        Swal.fire({
                                          icon: "success",
                                          title: "Your work has been saved",
                                          showConfirmButton: false,
                                          timer: 1500,
                                        });

                                        handlecolor(product);
                                      }}
                                      style={{ color: "red" }}
                                    />
                                  ) : (
                                    <BsHeart
                                      className="t1"
                                      id={product.id}
                                      onClick={() => {
                                        handlecolor(product);
                                        addToWishList(product.id);
                                      }}
                                    />
                                  )}
                                </span>



	<button class="btn">
	 <span class="price">{"$"+product.price}</span>
   <span class="shopping-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
   <span class="buy"
    onClick={() => {
      Swal.fire({

        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      addToCart(product.id);
    }}>add to cart</span>
 </button>
	
</div>
			
</div>
	
<div class="product-image">
	
	<img src={product.image} alt=""/>
	

<div class="info">
	<h2> Detailes</h2>
	<ul>
		<li><strong>Brand : </strong>{product.brand} </li>
		<li><strong>Type : </strong>{product.type}</li>
		<li><strong>Price: </strong>{product.price}</li>
		
	</ul>
</div>
</div>

</div>



            </div>
            // <div key={index} className="productContainer">
            //   <div className="left-image">
            //     <img className="image" src={product.image} alt="image" />
            //   </div>
            //   <div className="productPage">
            //     <h1>{product.name}</h1>
            //     <h3>{product.brand}</h3>

            //     <h3>{product.type}</h3>
            //     <p>{product.description}</p>
            //     <h2 className="productPrice">{"$" + product.price}</h2>
            //     {updateBox && productId === product.id && (
            //       <form>
            //         <br />
            //         <input
            //           type="text"
            //           defaultValue={product.name}
            //           placeholder="Name here"
            //           onChange={(e) => setName(e.target.value)}
            //         />
            //         <input
            //           type="text"
            //           defaultValue={product.brand}
            //           placeholder="brand here"
            //           onChange={(e) => setBrand(e.target.value)}
            //         />
            //         <input
            //           type="text"
            //           defaultValue={product.type}
            //           placeholder="type here"
            //           onChange={(e) => setType(e.target.value)}
            //         />
            //         <br />

            //         <textarea
            //           placeholder="description here"
            //           defaultValue={product.description}
            //           onChange={(e) => setDescription(e.target.value)}
            //         ></textarea>
            //         <input
            //           type="number"
            //           defaultValue={product.price}
            //           placeholder="Price here"
            //           onChange={(e) => setPrice(e.target.value)}
            //         />
            //       </form>
            //     )}
            //     <div className="product-buttons">
            //       <button className="add">add to cart</button>
            //       <button className="add">add to wishList</button>
            //       <button
            //         className="update"
            //         onClick={() => handleUpdateClick(product)}
            //       >
            //         Update
            //       </button>
            //       <button
            //         className="Delete"
            //         onClick={() => deleteProduct(product.id)}
            //       >
            //         Delete
            //       </button>
            //     </div>
            //   </div>
            //   <br />

            // </div>
          );
        })}</div>
       <div className="paddBIgDiv"> <Comment id={id}/></div>
      
        </div>
      </div>
   
  );
};

export default Products;
