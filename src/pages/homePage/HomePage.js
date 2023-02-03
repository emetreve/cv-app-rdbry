import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

import logo from "../../images/homeLogo.png";
import line from "../../images/line.png";
import background from "../../images/homeBackground.png";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        <img
          src={background}
          className={styles.background}
          alt="background pattern"
        />
        <img src={logo} className={styles.logo} alt="redberry logo" />
        <img src={line} className={styles.line} alt="divider" />
        <button onClick={() => navigate("/personal")} className={styles.button}>
          რეზიუმეს დამატება
        </button>
      </div>
    </>
  );
}

export default HomePage;
