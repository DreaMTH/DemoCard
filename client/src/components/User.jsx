import styles from "./User.module.css";

const User = (props) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.mainInfo}>
          <img src={props.pfp} alt="pfp" />
          <div>
            <h3 className={styles.name}>{props.name ?? "null"}</h3>
          </div>
        </div>
        <div className={styles.addInfo}>
          <p>{props.email ?? "null"}</p>
        </div>
      </div>
    </>
  );
};

export default User;
