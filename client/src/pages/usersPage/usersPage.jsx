import styles from "./usersPage.module.css";
import User from "../../components/User.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./usersSlice.js";
import { Link } from "react-router-dom";

const UserPage = () => {
  document.title = "Users";
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  let list;
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (!users) {
    list = Array.from({ length: 10 }, () => ({
      _id: "_" + new Date().getMilliseconds + Math.random(0, 10),
    }));
  } else {
    list = users;
  }
  const listItems = list.map((person) => (
    <li key={person._id}>
      <Link to={`/users/${person._id}`} style={{ textDecoration: 0 }}>
        <User
          shortForm={true}
          _id={person._id}
          pfp={person.pfp}
          name={person.name}
          email={person.email}
        />
      </Link>
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
