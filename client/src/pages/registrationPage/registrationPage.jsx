import { useForm } from "react-hook-form";
import axios from "../../axios.js";
import styles from "./registrationPage.module.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const RegistrationPage = () => {
  document.title = "Registration";
  const [regSuccesss, setStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "FirstName LastName",
      email: "youremail@domen.com",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      return alert("Passwords are different!");
    }
    axios
      .post("/auth/registration/", values)
      .then((response) => {
        console.log(response.data);
        alert("Success!");
        setStatus(true);
      })
      .catch((err) => alert(err.response.data.message));
  };
  if (regSuccesss) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className={styles.root}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Full name:</label>
          <input
            id="name"
            type="text"
            placeholder={errors.name?.message}
            {...register("name", { required: "Field cannot be empty." })}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder={errors.email?.message}
            {...register("email", { required: "Field cannot be empty." })}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder={errors.password?.message}
            {...register("password", { required: "Field cannot be empty." })}
          />
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Field cannot be empty.",
            })}
          />
          <input type="submit" value="Sign up!" />
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
