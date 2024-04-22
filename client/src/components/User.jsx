import styles from "./User.module.css";
import logo from "../pages/homePage/logo.png";
const User = (props) => {
  let itemsList;
  if(!props.shortForm)
    itemsList = props.interests.map(interest => (
      <li>{interest}</li>));
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
              <ul>{itemsList}</ul>
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
