import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { BsSearch } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

const Navigation = ({ setProductName }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = localStorage.getItem("myRole");
  console.log(role);

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  return (
    <>
      {state.isLoggedIn ? (
        
        <>
          {role === "1" ? (
            <>
            <div className="navigation">
              <div className="test2">
                <Link to="/carts">
                  <BsCartPlus size={25} />
                </Link>
                <Link to="/wishLists">
                  <BsHeart size={25} />
                </Link>
              </div>
              <div className="test">
                <Link to="/home">Home</Link>

                <Link
                  className="auth-button"
                  onClick={() => {
                    dispatch(logout());
                    localStorage.clear();
                    history("/login");
                  }}
                  to="/login"
                >
                  Logout
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
              </div>
            </>
          ) : (
            <>
            
            </>
          )}
        </>
       
      ) : (
        <>
        <div className="navigation">
          <div>
            <Link to="/">Home</Link>
            <Link className="auth-button" to="/login">
              Login
            </Link>
            <Link className="auth-button" to="/register">
              Register
            </Link>
          </div>
          </div>
        </>
      )}
    </>
  );
};
export default Navigation;
