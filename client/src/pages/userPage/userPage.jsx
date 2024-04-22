import { useSelector, useDispatch } from "react-redux";
import styles from "./userPage.module.css";
import { isAuth } from "../../store/auth.js";
import axios from "../../axios.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../../components/User";
import { useForm } from "react-hook-form";
const UserPage = () => {
  let interestList;
  const [editMode, setMode] = useState(false);
  const authPassed = useSelector(isAuth);
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm({
    defaultValues: { description: "", interests: "" },
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    setLoading(true);
    if (!values) return;
    if (!values.interests || !values.interests.trim())
      return axios
        .post("/users/updateDescription", { description: values.description })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    if (!values.description || !values.description.trim())
      return axios
        .post("/users/updateInterests", { interests: values.interests })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    axios
      .post("/users/updateInterests", { interests: values.interests })
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
    axios
      .post("/users/updateDescription", { description: values.description })
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
    setLoading(false);
  };
  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);
  if (!isLoading) {
    document.title = data.name;
    interestList = data.interests.map((interest) => <li>{interest}</li>);
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
          <User
            id="1"
            name="loading..."
            email="loading..."
            interests={Array(5).fill("...")}
          />
        ) : (
          <>
            <User
              id={data._id}
              name={data.name}
              email={data.email}
              description={data.description ?? "No description yet."}
              interests={
                data.interests.length > 0
                  ? data.interests
                  : Array(5).fill("...")
              }
              shortForm={false}
              editMode={editMode}
            />
            {userData._id === data._id ? (
              <>
                <button
                  className={styles.editButton}
                  onClick={() => setMode(!editMode)}
                >
                  Edit profile
                </button>
              </>
            ) : (
              <></>
            )}
            {editMode ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.inputSection}>
                    <label>Description</label>
                    <textarea
                      className={styles.inputField}
                      {...register("description")}
                    />
                  </div>
                  <br />
                  <div className={styles.inputSection}>
                    <label>Interests</label>
                    <textarea
                      className={styles.inputField}
                      {...register("interests")}
                    />
                  </div>
                  <button className={styles.submitButton} type="submit">
                    Apply
                  </button>
                </form>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserPage;
