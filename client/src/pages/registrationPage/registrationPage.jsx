import { useState } from "react";
import styles from "./registrationPage.module.css";

const RegistrationPage = () => {
  const [defaultInput, setDefaultInput] = useState("youremail@domain.com");
  const onEmailClick = () => {
    setDefaultInput("");
  };
  const onEmailType = (e) => {
    setDefaultInput(e.target.value);
  };
  return (
    <>
      <div className={styles.root}>
        <input
          type="text"
          value={defaultInput}
          onChange={(e) => onEmailType(e)}
          onClick={onEmailClick}
        />
        <input type="password" />
      </div>
    </>
  );
};

export default RegistrationPage;
