import { useState } from "react";
import styles from "./loginPage.module.css";
const LoginPage = () => {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const handleLoginEvent = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={styles.homeBody}>
        <form className={styles.formRoot} onSubmit={handleLoginEvent}>
          <label>Email:</label>
          <input
            type="email"
            required
            className={styles.inputField}
            value={emailValue}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            required
            className={styles.inputField}
            value={passwordValue}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
