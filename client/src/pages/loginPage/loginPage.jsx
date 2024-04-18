import { useForm } from "react-hook-form";
import styles from "./loginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authintificationFetch, isAuth } from "../../store/auth.js";
import { Navigate } from "react-router-dom";
const LoginPage = () => {
  const authPassed = useSelector(isAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@meme.com",
      password: "qweQWE123",
    },
    mode: "onBlur",
  });
  const onSumbit = async (values) => {
    const data = await dispatch(authintificationFetch(values));
    if (!data.payload) {
      return alert("Unable to authorizate.");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Unable to authorizate.");
    }
  };
  if (authPassed) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.homeBody}>
        <form className={styles.formRoot} onSubmit={handleSubmit(onSumbit)}>
          <div className={styles.inputSection}>
            <label className={styles.inputLabel}>Email:</label>
            <input
              type="email"
              required
              placeholder={errors.email?.message}
              className={styles.inputField}
              {...register("email", { required: "Field cannot be empty." })}
            />
          </div>
          <br />
          <div className={styles.inputSection}>
            <label className={styles.inputLabel}>Password:</label>
            <input
              type="password"
              required
              placeholder={errors.password?.message}
              className={styles.inputField}
              {...register("password", { required: "Field cannot be empty" })}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
