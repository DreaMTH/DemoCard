import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, logout } from "../store/auth.js";
const Header = () => {
  const dispatch = useDispatch();
  const authPassed = useSelector(isAuth);
  const logoutEvent = () => {
    if (window.confirm("Do u want to exit?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <>
      <div className={styles.headerBody}>
        <Link to="/">
          <button className={styles.buttonLink}>Home</button>
        </Link>
        {authPassed ? (
          <>
            <Link to="/users">
              <button className={styles.buttonLink}>Users</button>
            </Link>
            <Link to="/">
              <button className={styles.buttonLink} onClick={logoutEvent}>
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/registration">
              <button className={styles.buttonLink}>Registration</button>
            </Link>
            <Link to="/login">
              <button className={styles.buttonLink}>Login</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
