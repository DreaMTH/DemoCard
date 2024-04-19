import styles from "./User.module.css";
import logo from "../pages/homePage/logo.png";
const User = (props) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.mainInfo}>
          <img src={props.pfp ?? logo} alt="pfp" />
          <div>
            <h3 className={styles.name}>{props.name ?? "null"}</h3>
          </div>
        </div>
        <div className={styles.addInfo}>
          <p>{props.email ?? "null"}</p>
        </div>
        {!props.shortForm ? (
          <>
            <div className="">
              <p>{props.description}</p>
              <h3>{props.interests}</h3>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default User;
