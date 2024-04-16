import styles from "./usersPage.module.css";
import User from "../../components/User.jsx";
import { useEffect } from "react";

import axios from "../../axios.js";
const UserPage = () => {
  useEffect(() => {
    //axios.get("/users");
  }, []);
  const rndList = Array.from({ length: 10 }, () => ({
    id: "_" + new Date().getMilliseconds + Math.random(0, 10),
  }));
  const listItems = rndList.map((person) => (
    <li key={person.id}>
      <User pfp={person.pfp} name={person.name} email={person.email} />
    </li>
  ));
  return (
    <>
      <title>Zalupe</title>
      <div className={styles.root}>
        <ul className={styles.userList}>{listItems}</ul>
      </div>
    </>
  );
};

export default UserPage;
