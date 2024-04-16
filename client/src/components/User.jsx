import styles from "./User.module.css";

const User = (props) => {
  const { pfp, name, email } = props;
  return (
    <>
      <div className={styles.root}>
        <div className={styles.mainInfo}>
          <img src={pfp} alt="pfp" />
          <div>
            <h3 className={styles.name}>{name ?? "null"}</h3>
          </div>
        </div>
        <div className={styles.addInfo}>
          <p>{email ?? "null"}</p>
        </div>
      </div>
    </>
  );
};

export default User;
