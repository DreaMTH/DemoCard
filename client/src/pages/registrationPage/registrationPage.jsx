import { useState } from "react";
import styles from "./registrationPage.module.css";

const RegistrationPage = () => {
  const [defaultInput, setDefaultInput] = useState("youremail@domain.com");
  const onEmailClick = (e) => {
    if (e.target.value === "youremail@domain.com") {
      setDefaultInput("");
    }
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
          onClick={(e) => onEmailClick(e)}
        />

        <input type="password" />
        <div>
          <input type="checkbox" name="save" />
          <label for="save"> save?</label>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
