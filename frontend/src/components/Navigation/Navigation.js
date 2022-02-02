import { Link } from "react-router-dom";
import { logout } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
const Navigation = () => {
  const dispatch = useDispatch();

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
          <Link
            className="auth-button"
            onClick={() => {
              dispatch(logout());
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
