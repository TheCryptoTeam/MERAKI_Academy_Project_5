import { Link,useNavigate } from "react-router-dom";
import { logout } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css"
import { BsSearch } from 'react-icons/bs';
import { BsBasket } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';




const Navigation = ({setProductName}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <div className="navigation">
      {state.isLoggedIn ? (
        <>
           <div className="test2">
          <Link to="/carts"><BsBasket/></Link>
          <Link to="/wishLists"><BsHeart/></Link>
          </div>
        <div className="test">
          <Link to="/home">Home</Link>
          <Link to="/newProduct">New Product</Link>
          <Link
            className="auth-button"
            onClick={() => {
              dispatch(logout());
              localStorage.clear();
                history("/login");
            }}
            to="/login"
          >
            logout
          </Link>
          </div>
        <div>
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
        
        
        </>
      ) : (
        <>
        <div>
          <Link to="/">Home</Link>
          <Link className="auth-button" to="/login">
            Login
          </Link>
          <Link className="auth-button" to="/register">
            Register
          </Link>
          </div>
        </>
      )}
    </div>
  );
};
export default Navigation;
