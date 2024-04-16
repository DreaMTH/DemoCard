import styles from "./loginPage.module.css";
import mainLogo from "./logo.png";
const HomePage = () => {
  return (
    <>
      <div className={styles.homeBody}>
        <h1 className={styles.mainTitle}>welcome to the login page</h1>
        <img className={styles.logo} src={mainLogo} alt="this is logo" />
        <p className={styles.mainText}>hi there dear!</p>
      </div>
    </>
  );
};

export default HomePage;
