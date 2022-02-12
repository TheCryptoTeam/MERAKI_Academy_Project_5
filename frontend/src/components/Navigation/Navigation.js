import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { BsSearch } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart,BsCart3 } from "react-icons/bs";
import { useState } from "react";
import  {MdLogout}  from "react-icons/md";

const Navigation = ({ setProductName }) => {
  const [navbar, setNabar] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = localStorage.getItem("myRole");
  console.log(role);

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  //====================================
  const changeNavbar = () => {
    if (window.scrollY >= 100) {
      setNabar(true);
    } else {
      setNabar(false);
    }
  };
  window.addEventListener("scroll", changeNavbar);
  //====================================
  return (
    <>
      {state.isLoggedIn ? (
        <>
          {role === "1" ? (
            <>
              <div className={navbar ? "navigation" : "navigation"}>
               
                <div className="logoCrypto">
                  

                  <Link to="/home">Home</Link>

                 
                </div>
                <div className="search-continar">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search"
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                  <Link to="/search">
                    <BsSearch />
                  </Link>
                </div>
                <div className="icons">
                  <Link to="/carts">
                    <BsCart3 size={25} />
                  </Link>
                  <Link to="/wishLists">
                    <BsHeart size={25} />
                  </Link>
                  <Link
               
                    className="auth-button"
                    onClick={() => {
                      dispatch(logout());
                      localStorage.clear();
                      history("/login");
                    }}
                    to="/login"
                  >
                   <MdLogout size={25}/>
                  </Link>
                </div>
                
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div className={navbar ? "navigation" : "navigation"}>
            <div>
              <div className="NavNoToken">
                <div >
              <Link to="/">Home</Link>
              <Link className="auth-button" to="/login">
                Login
              </Link>
              <Link className="auth-button" to="/register">
                Register
              </Link>
              </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Navigation;
