import styles from "./notFound.module.scss";
import { SyntheticEvent, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import logo from "../../assets/images/notFound.png";

export const NotFound = () => {
  const { navigate } = useContext(AppContext);
  const onNavigate = () => {
    navigate("/");
  };

  const onErrorImage = ({ currentTarget }: SyntheticEvent<HTMLImageElement, Event>): void => {
    currentTarget.onerror = null;
    currentTarget.src = "https://t4.ftcdn.net/jpg/01/98/86/63/360_F_198866399_vQambmqMEK9975X1Yg7686t4nFpSaubL.jpg";
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="404" className={styles.img} onError={onErrorImage} />
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