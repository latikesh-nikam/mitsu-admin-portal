import styles from "./notFound.module.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const NotFound = () => {
  const { navigate } = useContext(AppContext);
  const onNavigate = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <img src="https://t4.ftcdn.net/jpg/01/98/86/63/360_F_198866399_vQambmqMEK9975X1Yg7686t4nFpSaubL.jpg" alt="404"></img>
      <div className={styles["mainbox"]}>
        <div className={styles["err"]}>4</div>
        <div className={styles["err1"]}>0</div>
        <div className={styles["err2"]}>4</div>
      </div>
      <div className={styles["msg"]}>
        <p className={styles.link_text}>Let's go
          <span onClick={() => onNavigate()} className={styles.link}> Login </span>
          and try again...
        </p>
      </div>
    </div>
  );
};

export default NotFound