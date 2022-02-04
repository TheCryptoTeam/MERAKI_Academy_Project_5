import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Type = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return { token: state.loginReducer.token };

  })
  const [message, setMessage] = useState("")
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getByType();
  }, []);

  const { type } = useParams()

  const getByType = () => {
    axios

      .get(`http://localhost:5000/products/type/${type}`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((err) => {
        throw err
      });
  };

  //============================
  const addToCart = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    let quantity = 1;
    await axios.post(`http://localhost:5000/carts/${id}`, { quantity }, { headers })
      .then((res) => {
        setMessage(res.data.massage)
      })
  }
  //============================


  return (<>
    <div>


      <div>
        <select className="selectType" onChange={(e) => {
          navigate(`/brand/${e.target.value}`)

        }

        }>
          <option value="All" >All</option>
          <option value="dell">dell</option>
          <option value="samsung" >samsung</option>
          <option value="hp" >hp</option>


        </select>
      </div>



      {
        products.map((product, index) => {
          return <div key={index} className="products">
            <div className="product">
              <p>name:{product.name}</p>
              <p>price:{product.price}</p>
              <button className="add" onClick={() => { addToCart(product.id) }}>add to cart</button>
              <button className="add">add to wishList</button>
            </div><br />
          </div>

        })
      }</div>
  </>);
};
export default Type;
