import styles from "./homePage.module.css";
import mainLogo from "./logo.png";
const HomePage = () => {
  document.title = "Home";
  return (
    <>
      <div className={styles.homeBody}>
        <h1 className={styles.mainTitle}>welcome</h1>
        <img className={styles.logo} src={mainLogo} alt="this is logo" />
        <p className={styles.mainText}>hi there dear!</p>
      </div>
    </>
  );
};

export default HomePage;
