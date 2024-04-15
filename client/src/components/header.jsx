import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className={styles.headerBody}>
        <Link to="/login">
          <button className={styles.buttonLink}>Login</button>
        </Link>
        <Link to="/">
          <button className={styles.buttonLink}>Home</button>
        </Link>
        <Link to="/registration">
          <button className={styles.buttonLink}>Registration</button>
        </Link>
        <Link to="/users">
          <button className={styles.buttonLink}>Users</button>
        </Link>
      </div>
    </>
  );
};

export default Header;
