import styles from "./usersPage.module.css";
import { useEffect } from "react";
import axios from "../../axios.js";
const UserPage = () => {
  useEffect(() => {
    axios.get("/users");
  }, []);
  return (
    <>
      <div className={styles.root}>
        <p>there are a user page.</p>
      </div>
    </>
  );
};

export default UserPage;
