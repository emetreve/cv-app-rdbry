import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExperiencePage.module.css";
import Experience from "../../components/Experience/Experience";
import back from "../../images/back.png";
import line from "../../images/line.png";
import Cv from "../../components/cv/Cv";

function ExperiencePage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [childReady, setChildReady] = useState(false);
  const [readyOthers, setReadyOthers] = useState(true);

  const [updateCv, setUpdateCv] = useState(false);

  if (!localStorage.getItem("expCount")) {
    localStorage.setItem("expCount", 1);
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <img
              src={back}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className={styles.goBack}
              alt="go back"
            />
            <p className={styles.title}>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</p>
            <p className={styles.pageCount}>2/3</p>
            <img src={line} className={styles.divider} alt="divider" />
            <div className={styles.experienceComponentWrapper}>
              {Array.from(
                { length: Number(localStorage.getItem("expCount")) || count },
                (_, i) => {
                  if (i === 0) {
                    return (
                      <Experience
                        ready={setChildReady}
                        key={i}
                        value={i}
                        id={i + 1}
                        updateCvSetter={setUpdateCv}
                        updateCv={updateCv}
                      />
                    );
                  } else {
                    return (
                      <Experience
                        readyOthers={setReadyOthers}
                        key={i}
                        value={i}
                        id={i + 1}
                        updateCvSetter={setUpdateCv}
                        updateCv={updateCv}
                      />
                    );
                  }
                }
              )}
            </div>

            <button
              className={styles.addButton}
              onClick={() => {
                const current = Number(localStorage.getItem("expCount"));
                localStorage.setItem("expCount", current + 1);
                setCount((prev) => prev + 1);
              }}
            >
              მეტი გამოცდილების დამატება
            </button>

            <button
              onClick={() => {
                navigate("/personal");
                window.scrollTo(0, 0);
              }}
              className={styles.backBtn}
            >
              ᲣᲙᲐᲜ
            </button>
            <button
              disabled={!childReady || !readyOthers}
              onClick={() => {
                navigate("/education");
                window.scrollTo(0, 0);
              }}
              className={styles.nextBtn}
            >
              ᲨᲔᲛᲓᲔᲒᲘ
            </button>
          </div>
          <div className={styles.rightColumn}>
            <Cv hidePersonal={false} update={updateCv} hideEducation={true} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExperiencePage;
