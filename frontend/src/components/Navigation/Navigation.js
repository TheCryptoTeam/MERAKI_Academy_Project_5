import { Link,useNavigate } from "react-router-dom";
import { logout } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css"

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
          <Link to="/home">Home</Link>
          <Link to="/newProduct">New Product</Link>
          <Link to="/carts">Cart</Link>
          <Link to="/wishLists">wishLists</Link>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
          <Link to="/search">
          Search
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
            logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link className="auth-button" to="/login">
            Login
          </Link>
          <Link className="auth-button" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};
export default Navigation;
