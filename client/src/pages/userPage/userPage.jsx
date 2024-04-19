import { useSelector, useDispatch } from "react-redux";
import styles from "./userPage.module.css";
import { isAuth } from "../../store/auth.js";
import axios from "../../axios.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../../components/User";
const UserPage = () => {
  const authPassed = useSelector(isAuth);
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  if (!isLoading) {
    document.title = data.name;
  }
  if (!authPassed) {
    return (
      <>
        <h1 className={styles.errorMessage}>No access!</h1>
      </>
    );
  }
  return (
    <>
      <div className={styles.rootUser}>
        {isLoading ? (
          <User id="1" name="loading..." email="loading..." />
        ) : (
          <User
            id={data._id}
            name={data.name}
            email={data.email}
            description={data.description ?? ""}
            interests={data.interests ?? ""}
            shortForm={false}
          />
        )}
      </div>
    </>
  );
};

export default UserPage;
