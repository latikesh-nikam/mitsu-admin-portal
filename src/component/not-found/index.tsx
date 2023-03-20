import styles from "./notFound.module.scss";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import logo from "../../assets/images/notFound.png";

export const NotFound = () => {
  const { navigate } = useContext(AppContext);
  const onNavigate = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="404" className={styles.img} />
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