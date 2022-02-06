import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Type = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token };
  });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getByType();
  }, []);

  const { type } = useParams();

  const getByType = () => {
    axios

      .get(`http://localhost:5000/products/type/${type}`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((err) => {
        throw err;
      });
  };

  //============================
  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    let quantity = 1;
    await axios
      .post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {
        setMessage(res.data.massage);
      });
  };
  //============================
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
  //============================

  return (
    <>
      <div>
        
      <div className="type-home">
          <img
            onClick={() => {
              navigate(`/brand/laptop`);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDe24g-hF3HSJNKpLBufd852zSsZOGi296Z4HrUEGREfL0S5UuadfU19i5mml_br8txUA&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => {
              navigate(`/type/mobile`);
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTog9_y0FmuFP6r-agy3zpFoSm0isRwn97XtAZSUf_ZxchAT2uhqRqiDsG0qiq28Ft7co&usqp=CAU"
            alt=""
          />
          <img
            onClick={() => {
              navigate(`/type/TV`);
            }}
            src="https://digitalbachat.in/wp-content/uploads/2021/10/Upcoming-Smart-TV-1024x585.png"
            alt=""
          />
          

          
          

          
        </div>
       

        {products.map((product, index) => {
          return (
            <div key={index} className="products">
              <div className="product">
                <img
                  onClick={() => navigate(`/products/${product.id}`)}
                  src={product.image}
                  alt=""
                />
                <p>name:{product.name}</p>
                <p>price:{product.price}</p>
                <button
                  className="add"
                  onClick={() => {
                    addToCart(product.id);
                  }}
                >
                  add to cart
                </button>
                <button
                  className="add"
                  onClick={() => {
                    addToWishList(product.id);
                  }}
                >
                  add to wishList
                </button>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Type;


// {/* <div>
          
// {/* <select className="selectType" onChange={(e) => {
// navigate(`/brand/${e.target.value}`)

// }

// }>
// <option value="All" >All</option>
// <option value="dell">dell</option>
// <option value="samsung" >samsung</option>
// <option value="hp" >hp</option>


// </select> */}
// </div> */}