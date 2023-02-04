import { useNavigate } from "react-router-dom";
import Experience from "../../components/Experience/Experience";
import styles from "./ExperiencePage.module.css";
import back from "../../images/back.png";
import line from "../../images/line.png";
import Cv from "../../components/cv/Cv";

function ExperiencePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <img
              src={back}
              onClick={() => navigate("/personal")}
              className={styles.goBack}
              alt="go back"
            />
            <p className={styles.title}>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</p>
            <p className={styles.pageCount}>2/3</p>
            <img src={line} className={styles.divider} alt="divider" />
            <div className={styles.experienceComponentWrapper}>
              <Experience />
              <Experience />
              <Experience />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <Cv hidePersonal={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExperiencePage;
