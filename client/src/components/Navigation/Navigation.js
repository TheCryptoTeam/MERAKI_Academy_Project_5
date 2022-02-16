import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { BsSearch } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart, BsCart3 } from "react-icons/bs";
import { useState } from "react";
import { MdLogout } from "react-icons/md";

const Navigation = ({ setProductName }) => {
  const [navbar, setNabar] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = localStorage.getItem("myRole");

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      carts: state.cartsReducer.carts
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


                  <Link to="/home"><img id="design-logo" src="https://res.cloudinary.com/cryptoteam/image/upload/v1644916542/s6s5uvrbwcb3nbisvoiw.svg
" alt="home"/></Link>


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
                  <Link className="searchIcon" to="/search">
                    <BsSearch />
                  </Link>
                </div>
                <div className="icons">
                  {state.carts.length?(<div >
                <span class="background"></span>
           
            <span class="number">{state.carts.length}</span>
                  <Link className="BsCart3" to="/carts">
                   
                    <BsCart3 size={25} />
                  
                  </Link>
                  
                  </div>):(<Link className="BsCart3" to="/carts">
                   
                   <BsCart3 size={25} />
                 
                 </Link>)}
                
                  <Link to="/wishLists">
                    <BsHeart id="nav-heart" size={25} />
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
                    <MdLogout size={25} />
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
