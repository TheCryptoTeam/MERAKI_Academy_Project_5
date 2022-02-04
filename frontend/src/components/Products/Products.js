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

const Products = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [productId, setProductId] = useState(false);

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
  console.log(id);
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

  const handleUpdateClick = (product) => {
    setUpdateBox(!updateBox);
    setProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    if (updateBox) updateProduct(product.id);
  };

  const updateProduct = async (id) => {
    const body = {
      name,
      type,
      image,
      brand,
      price,
      description,
    };

    try {
      await axios.put(`http://localhost:5000/products/${id}`, body);
      getproductById();
      dispatch(updateproductById(body));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        {state.products.map((product, index) => {
          return (
            <div key={index} className="products">
              <div className="product">
                
                <p>image:{product.image}</p>
                <p>name:{product.name}</p>
                <p>type:{product.type}</p>
                <p>brand:{product.brand}</p>
                <p>price:{product.price}</p>
                <p>description:{product.description}</p>
                {updateBox && productId === product.id && (
                  <form>
                    <br />
                    
                    
                    <input
                      type="text"
                      defaultValue={product.image}
                      placeholder=" image here"
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      defaultValue={product.name}
                      placeholder=" Name here"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      defaultValue={product.type}
                      placeholder="Type here"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      defaultValue={product.brand}
                      placeholder=" Brand here"
                      onChange={(e) => setBrand(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      defaultValue={product.price}
                      placeholder=" Price here"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="product description here"
                      defaultValue={product.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </form>
                )}
                <button
                  className="delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  delete
                </button>
                <button
                  className="update"
                  onClick={() => handleUpdateClick(product)}
                >
                  Update
                </button>
                <button className="add">add to cart</button>
                <button className="add">add to wishList</button>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
